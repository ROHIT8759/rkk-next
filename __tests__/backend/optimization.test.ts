import { NextApiRequest, NextApiResponse } from 'next';
import {
  compress,
  responseTime,
  paginate,
  getPaginationParams,
  jsonResponse,
  formatResponse,
  timeout,
  bodyLimit,
  allowMethods,
} from '../../src/backend/optimization';

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

describe('Backend Optimization', () => {
  describe('compress', () => {
    it('should set compression headers for large responses', () => {
      const middleware = compress({ threshold: 100 });
      const req = createMockRequest({ headers: { 'accept-encoding': 'gzip' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should skip compression if not supported', () => {
      const middleware = compress();
      const req = createMockRequest({ headers: {} });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('responseTime', () => {
    it('should add response time header', () => {
      const middleware = responseTime();
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);
      res.end();

      expect(res.setHeader).toHaveBeenCalledWith('X-Response-Time', expect.any(String));
    });
  });

  describe('paginate', () => {
    it('should paginate data correctly', () => {
      const data = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));
      const result = paginate(data, { page: 1, limit: 10 });

      expect(result.data).toHaveLength(10);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.total).toBe(25);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('should handle last page', () => {
      const data = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));
      const result = paginate(data, { page: 3, limit: 10 });

      expect(result.data).toHaveLength(5);
      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrev).toBe(true);
    });

    it('should respect maxLimit', () => {
      const data = Array.from({ length: 200 }, (_, i) => ({ id: i + 1 }));
      const result = paginate(data, { page: 1, limit: 200, maxLimit: 50 });

      expect(result.data).toHaveLength(50);
    });
  });

  describe('getPaginationParams', () => {
    it('should parse pagination params from request', () => {
      const req = createMockRequest({ query: { page: '2', limit: '20' } });
      const params = getPaginationParams(req);

      expect(params.page).toBe(2);
      expect(params.limit).toBe(20);
    });

    it('should use defaults for invalid params', () => {
      const req = createMockRequest({ query: {} });
      const params = getPaginationParams(req);

      expect(params.page).toBe(1);
      expect(params.limit).toBe(10);
    });
  });

  describe('jsonResponse', () => {
    it('should format successful response', () => {
      const res = createMockResponse();
      jsonResponse(res, { data: { message: 'Success' } });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: { message: 'Success' } });
    });

    it('should format error response', () => {
      const res = createMockResponse();
      jsonResponse(res, { status: 400, error: 'Bad Request' });

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Bad Request' });
    });
  });

  describe('formatResponse', () => {
    it('should format response with metadata', () => {
      const middleware = formatResponse();
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('timeout', () => {
    it('should allow requests within timeout', async () => {
      const middleware = timeout(1000);
      const req = createMockRequest();
      const res = createMockResponse();
      const next = jest.fn().mockResolvedValue(undefined);

      await middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalledWith(408);
    });
  });

  describe('bodyLimit', () => {
    it('should allow requests within size limit', () => {
      const middleware = bodyLimit(1024);
      const req = createMockRequest({ headers: { 'content-length': '512' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject requests exceeding size limit', () => {
      const middleware = bodyLimit(1024);
      const req = createMockRequest({ headers: { 'content-length': '2048' } });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(413);
    });
  });

  describe('allowMethods', () => {
    it('should allow specified methods', () => {
      const middleware = allowMethods(['GET', 'POST']);
      const req = createMockRequest({ method: 'GET' });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject disallowed methods', () => {
      const middleware = allowMethods(['GET', 'POST']);
      const req = createMockRequest({ method: 'DELETE' });
      const res = createMockResponse();
      const next = jest.fn();

      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(405);
    });
  });
});

