import { NextApiRequest, NextApiResponse } from 'next';

export type NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void | Promise<void>
) => void | Promise<void>;

/**
 * Compose multiple middleware functions into a single handler
 */
export function composeMiddleware(...middlewares: Middleware[]): (handler: NextApiHandler) => NextApiHandler {
  return (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      let index = 0;

      const next = async (): Promise<void> => {
        if (index < middlewares.length) {
          const middleware = middlewares[index++];
          await middleware(req, res, next);
        } else {
          await handler(req, res);
        }
      };

      await next();
    };
  };
}

/**
 * CORS middleware for Next.js API routes
 */
export function cors(options: {
  origin?: string | string[];
  methods?: string[];
  credentials?: boolean;
  allowedHeaders?: string[];
} = {}): Middleware {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials = true,
    allowedHeaders = ['Content-Type', 'Authorization'],
  } = options;

  return (req, res, next) => {
    const requestOrigin = req.headers.origin || '*';
    
    if (Array.isArray(origin)) {
      if (origin.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      }
    } else if (origin === '*' || origin === requestOrigin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));
    
    if (credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
  };
}

/**
 * Rate limiting middleware
 */
export function rateLimit(options: {
  windowMs?: number;
  max?: number;
  message?: string;
} = {}): Middleware {
  const {
    windowMs = 60000, // 1 minute
    max = 60, // 60 requests per minute
    message = 'Too many requests, please try again later.',
  } = options;

  const requests = new Map<string, number[]>();

  return (req, res, next) => {
    const identifier = req.headers['x-forwarded-for'] as string || 
                      req.socket.remoteAddress || 
                      'unknown';
    
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this identifier
    let userRequests = requests.get(identifier) || [];
    
    // Filter out requests outside the time window
    userRequests = userRequests.filter(time => time > windowStart);
    
    if (userRequests.length >= max) {
      res.status(429).json({ error: message });
      return;
    }

    // Add current request
    userRequests.push(now);
    requests.set(identifier, userRequests);

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      for (const [key, times] of requests.entries()) {
        const filteredTimes = times.filter(time => time > windowStart);
        if (filteredTimes.length === 0) {
          requests.delete(key);
        } else {
          requests.set(key, filteredTimes);
        }
      }
    }

    next();
  };
}

/**
 * Request validation middleware
 */
export function validateRequest(schema: {
  body?: (data: any) => boolean;
  query?: (data: any) => boolean;
  headers?: (data: any) => boolean;
}): Middleware {
  return (req, res, next) => {
    try {
      if (schema.body && !schema.body(req.body)) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
      }

      if (schema.query && !schema.query(req.query)) {
        res.status(400).json({ error: 'Invalid query parameters' });
        return;
      }

      if (schema.headers && !schema.headers(req.headers)) {
        res.status(400).json({ error: 'Invalid headers' });
        return;
      }

      next();
    } catch (error) {
      res.status(400).json({ error: 'Validation error' });
    }
  };
}

/**
 * Request logging middleware
 */
export function logger(options: {
  verbose?: boolean;
  includeBody?: boolean;
} = {}): Middleware {
  const { verbose = false, includeBody = false } = options;

  return (req, res, next) => {
    const start = Date.now();
    
    const originalJson = res.json;
    const originalSend = res.send;
    const originalEnd = res.end;

    let responseBody: any;

    res.json = function (body: any) {
      responseBody = body;
      return originalJson.call(this, body);
    };

    res.send = function (body: any) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    res.end = function (...args: any[]) {
      const duration = Date.now() - start;
      
      const logData: any = {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
      };

      if (verbose) {
        logData.headers = req.headers;
        logData.query = req.query;
      }

      if (includeBody && req.body) {
        logData.requestBody = req.body;
      }

      console.log(`[API] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
      
      if (verbose) {
        console.log(JSON.stringify(logData, null, 2));
      }

      return originalEnd.apply(this, args as any);
    };

    next();
  };
}

/**
 * Error handling middleware
 */
export function errorHandler(): Middleware {
  return async (req, res, next) => {
    try {
      await next();
    } catch (error) {
      console.error('[API Error]', error);
      
      const isDev = process.env.NODE_ENV === 'development';
      
      res.status(500).json({
        error: 'Internal server error',
        ...(isDev && { 
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined 
        }),
      });
    }
  };
}
