import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware } from './middleware';

/**
 * Compression middleware for API responses
 */
export function compress(options: {
  threshold?: number;
  level?: number;
} = {}): Middleware {
  const { threshold = 1024 } = options; // 1KB default threshold

  return (req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding'] || '';
    
    if (!acceptEncoding.includes('gzip')) {
      next();
      return;
    }

    const originalJson = res.json;
    const originalSend = res.send;

    res.json = function (data: any) {
      const jsonString = JSON.stringify(data);
      
      if (jsonString.length > threshold) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      
      return originalJson.call(this, data);
    };

    res.send = function (data: any) {
      if (typeof data === 'string' && data.length > threshold) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      
      return originalSend.call(this, data);
    };

    next();
  };
}

/**
 * Response time tracking
 */
export function responseTime(): Middleware {
  return (req, res, next) => {
    const start = process.hrtime();

    const originalEnd = res.end;
    res.end = function (...args: any[]) {
      const diff = process.hrtime(start);
      const time = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
      res.setHeader('X-Response-Time', `${time.toFixed(2)}ms`);
      return originalEnd.apply(this, args as any);
    };

    next();
  };
}

/**
 * Pagination helper for API responses
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  maxLimit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function paginate<T>(
  data: T[],
  options: PaginationOptions = {}
): PaginatedResponse<T> {
  const {
    page = 1,
    limit = 10,
    maxLimit = 100,
  } = options;

  const actualLimit = Math.min(limit, maxLimit);
  const actualPage = Math.max(1, page);
  
  const startIndex = (actualPage - 1) * actualLimit;
  const endIndex = startIndex + actualLimit;
  
  const paginatedData = data.slice(startIndex, endIndex);
  const total = data.length;
  const totalPages = Math.ceil(total / actualLimit);

  return {
    data: paginatedData,
    pagination: {
      page: actualPage,
      limit: actualLimit,
      total,
      totalPages,
      hasNext: actualPage < totalPages,
      hasPrev: actualPage > 1,
    },
  };
}

/**
 * Parse pagination params from request
 */
export function getPaginationParams(req: NextApiRequest): PaginationOptions {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  return { page, limit };
}

/**
 * JSON response helper with consistent format
 */
export function jsonResponse<T = any>(
  res: NextApiResponse,
  options: {
    status?: number;
    data?: T;
    error?: string;
    message?: string;
    meta?: Record<string, any>;
  }
) {
  const { status = 200, data, error, message, meta } = options;

  const response: any = {};

  if (data !== undefined) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  if (error) {
    response.error = error;
  }

  if (meta) {
    response.meta = meta;
  }

  return res.status(status).json(response);
}

/**
 * API response formatter middleware
 */
export function formatResponse(): Middleware {
  return (req, res, next) => {
    const originalJson = res.json;

    res.json = function (data: any) {
      const formattedResponse = {
        success: res.statusCode >= 200 && res.statusCode < 300,
        statusCode: res.statusCode,
        data,
        timestamp: new Date().toISOString(),
      };

      return originalJson.call(this, formattedResponse);
    };

    next();
  };
}

/**
 * Request timeout middleware
 */
export function timeout(ms: number): Middleware {
  return async (req, res, next) => {
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${ms}ms`));
      }, ms);
    });

    try {
      await Promise.race([
        next(),
        timeoutPromise,
      ]);
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        res.status(408).json({
          error: 'Request timeout',
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  };
}

/**
 * Body size limiter
 */
export function bodyLimit(maxSize: number): Middleware {
  return (req, res, next) => {
    const contentLength = parseInt(req.headers['content-length'] || '0');
    
    if (contentLength > maxSize) {
      res.status(413).json({
        error: 'Payload too large',
        maxSize: `${maxSize} bytes`,
      });
      return;
    }

    next();
  };
}

/**
 * Method filter middleware
 */
export function allowMethods(methods: string[]): Middleware {
  const allowedMethods = methods.map(m => m.toUpperCase());

  return (req, res, next) => {
    if (!req.method || !allowedMethods.includes(req.method.toUpperCase())) {
      res.status(405).json({
        error: 'Method not allowed',
        allowed: allowedMethods,
      });
      return;
    }

    next();
  };
}
