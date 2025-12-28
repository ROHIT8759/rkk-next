import { cache, cacheResponse, invalidateCache, memoize } from '../../src/backend/cache';
import { NextApiRequest, NextApiResponse } from 'next';

const createMockRequest = (overrides: Partial<NextApiRequest> = {}): NextApiRequest => ({
  method: 'GET',
  url: '/api/test',
  headers: {},
  query: {},
  body: {},
  ...overrides,
} as NextApiRequest);

const createMockResponse = (): NextApiResponse => {
  const res: any = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader: jest.fn((key: string, value: string) => {
      res.headers[key] = value;
    }),
    status: jest.fn((code: number) => {
      res.statusCode = code;
      return res;
    }),
    json: jest.fn((data: any) => res),
    send: jest.fn((data: any) => res),
    end: jest.fn(),
  };
  return res;
};

describe('Backend Cache', () => {
  beforeEach(() => {
    cache.clear();
  });

  describe('cache', () => {
    it('should store and retrieve data', () => {
      cache.set('test-key', { data: 'test' }, 60);
      const result = cache.get('test-key');
      
      expect(result).toEqual({ data: 'test' });
    });

    it('should return null for expired data', (done) => {
      cache.set('test-key', { data: 'test' }, 0.1); // 100ms TTL
      
      setTimeout(() => {
        const result = cache.get('test-key');
        expect(result).toBeNull();
        done();
      }, 150);
    });

    it('should check if key exists', () => {
      cache.set('test-key', { data: 'test' }, 60);
      
      expect(cache.has('test-key')).toBe(true);
      expect(cache.has('non-existent')).toBe(false);
    });

    it('should delete data', () => {
      cache.set('test-key', { data: 'test' }, 60);
      cache.delete('test-key');
      
      expect(cache.has('test-key')).toBe(false);
    });

    it('should clear all data', () => {
      cache.set('key1', 'value1', 60);
      cache.set('key2', 'value2', 60);
      
      cache.clear();
      
      expect(cache.size()).toBe(0);
    });
  });

  describe('cacheResponse', () => {
    it('should cache GET requests', async () => {
      const middleware = cacheResponse({ ttl: 60 });
      const req = createMockRequest({ method: 'GET', url: '/api/test' });
      const res = createMockResponse();
      const next = jest.fn();

      await middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
    });

    it('should return cached response on second request', async () => {
      const middleware = cacheResponse({ ttl: 60 });
      const req = createMockRequest({ method: 'GET', url: '/api/test' });
      const res1 = createMockResponse();
      const res2 = createMockResponse();
      const next = jest.fn();

      // First request - cache miss
      await middleware(req, res1, next);
      res1.json({ data: 'test' });
      res1.end();

      // Second request - cache hit
      await middleware(req, res2, next);

      expect(res2.setHeader).toHaveBeenCalledWith('X-Cache', 'HIT');
    });

    it('should skip caching for non-GET requests', async () => {
      const middleware = cacheResponse({ ttl: 60 });
      const req = createMockRequest({ method: 'POST' });
      const res = createMockResponse();
      const next = jest.fn();

      await middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      const expensiveFn = jest.fn((x: number) => x * 2);
      const memoized = memoize(expensiveFn, { ttl: 60 });

      const result1 = memoized(5);
      const result2 = memoized(5);

      expect(result1).toBe(10);
      expect(result2).toBe(10);
      expect(expensiveFn).toHaveBeenCalledTimes(1);
    });

    it('should call function again after TTL expires', (done) => {
      const expensiveFn = jest.fn((x: number) => x * 2);
      const memoized = memoize(expensiveFn, { ttl: 0.1 }); // 100ms

      memoized(5);
      
      setTimeout(() => {
        memoized(5);
        expect(expensiveFn).toHaveBeenCalledTimes(2);
        done();
      }, 150);
    });
  });

  describe('invalidateCache', () => {
    it('should clear all cache', () => {
      cache.set('key1', 'value1', 60);
      cache.set('key2', 'value2', 60);

      invalidateCache();

      expect(cache.size()).toBe(0);
    });
  });
});

