import { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  cors,
  rateLimit,
  validateRequest,
  logger,
  errorHandler,
} from '../../src/backend/middleware';

// Mock NextApiRequest and NextApiResponse
const createMockRequest = (overrides: Partial<NextApiRequest> = {}): NextApiRequest => ({
  method: 'GET',
  url: '/api/test',
  headers: {},
  query: {},
  body: {},
  socket: { remoteAddress: '127.0.0.1' } as any,
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

describe('Backend Middleware', () => {
  describe('composeMiddleware', () => {
    it('should compose multiple middleware functions', async () => {
      const middleware1 = jest.fn((req, res, next) => next());
      const middleware2 = jest.fn((req, res, next) => next());
      const handler = jest.fn();

      const composed = composeMiddleware(middleware1, middleware2)(handler);
      const req = createMockRequest();
      const res = createMockResponse();

      await composed(req, res);

      expect(middleware1).toHaveBeenCalled();
      expect(middleware2).toHaveBeenCalled();
      expect(handler).toHaveBeenCalled();
    });

    it('should stop execution if middleware does not call next', async () => {
      const middleware1 = jest.fn((req, res, next) => {
        res.status(401).json({ error: 'Unauthorized' });
      });
      const middleware2 = jest.fn((req, res, next) => next());
      const handler = jest.fn();

      const composed = composeMiddleware(middleware1, middleware2)(handler);
      const req = createMockRequest();
      const res = createMockResponse();

      await composed(req, res);

      expect(middleware1).toHaveBeenCalled();
      expect(middleware2).not.toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('cors', () => {
    it('should set CORS headers', () => {
      const middleware = cors();
      const req = createMockRequest({ headers: { origin: 'https://example.com' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(next).toHaveBeenCalled();
    });

    it('should handle OPTIONS preflight request', () => {
      const middleware = cors();
      const req = createMockRequest({ method: 'OPTIONS' });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    it('should allow specific origins', () => {
      const middleware = cors({ origin: ['https://example.com', 'https://test.com'] });
      const req = createMockRequest({ headers: { origin: 'https://example.com' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'https://example.com');
    });
  });

  describe('rateLimit', () => {
    it('should allow requests within limit', () => {
      const middleware = rateLimit({ windowMs: 60000, max: 5 });
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalledWith(429);
    });

    it('should block requests exceeding limit', () => {
      const middleware = rateLimit({ windowMs: 1000, max: 2 });
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn();

      // First request - should pass
      middleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);

      // Second request - should pass
      middleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(2);

      // Third request - should be rate limited
      middleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(429);
    });
  });

  describe('validateRequest', () => {
    it('should validate request body', () => {
      const schema = {
        body: (data: any) => typeof data.name === 'string',
      };
      const middleware = validateRequest(schema);
      const req = createMockRequest({ body: { name: 'John' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalledWith(400);
    });

    it('should reject invalid request body', () => {
      const schema = {
        body: (data: any) => typeof data.name === 'string',
      };
      const middleware = validateRequest(schema);
      const req = createMockRequest({ body: { name: 123 } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('logger', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it('should log request details', () => {
      const middleware = logger();
      const req = createMockRequest({ method: 'GET', url: '/api/test' });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);
      res.end();

      expect(consoleLogSpy).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('errorHandler', () => {
    it('should catch and handle errors', async () => {
      const middleware = errorHandler();
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn().mockRejectedValue(new Error('Test error'));

      await middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });
});

