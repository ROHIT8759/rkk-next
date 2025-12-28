import { NextApiRequest, NextApiResponse } from 'next';

export interface CacheOptions {
  /** Time to live in seconds */
  ttl?: number;
  /** Cache key generator function */
  keyGenerator?: (req: NextApiRequest) => string;
  /** Conditional caching based on request */
  shouldCache?: (req: NextApiRequest) => boolean;
}

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * In-memory cache store for API responses
 */
class MemoryCache {
  private cache = new Map<string, CacheEntry>();

  set<T = any>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000, // Convert to milliseconds
    });
  }

  get<T = any>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new MemoryCache();

// Periodic cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cache.cleanup(), 5 * 60 * 1000);
}

/**
 * Default cache key generator
 */
function defaultKeyGenerator(req: NextApiRequest): string {
  const method = req.method || 'GET';
  const url = req.url || '';
  const query = JSON.stringify(req.query || {});
  return `${method}:${url}:${query}`;
}

/**
 * Cache API response middleware
 */
export function cacheResponse(options: CacheOptions = {}) {
  const {
    ttl = 60, // Default 60 seconds
    keyGenerator = defaultKeyGenerator,
    shouldCache = (req) => req.method === 'GET',
  } = options;

  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void | Promise<void>
  ) => {
    // Skip caching if condition not met
    if (!shouldCache(req)) {
      await next();
      return;
    }

    const cacheKey = keyGenerator(req);

    // Check if cached response exists
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${ttl}`);
      res.status(200).json(cachedData);
      return;
    }

    // Intercept response to cache it
    const originalJson = res.json;
    const originalSend = res.send;

    let responseData: any;

    res.json = function (data: any) {
      responseData = data;
      return originalJson.call(this, data);
    };

    res.send = function (data: any) {
      responseData = data;
      return originalSend.call(this, data);
    };

    const originalEnd = res.end;
    res.end = function (...args: any[]) {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300 && responseData) {
        cache.set(cacheKey, responseData, ttl);
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `public, max-age=${ttl}`);
      }
      return originalEnd.apply(this, args as any);
    };

    await next();
  };
}

/**
 * Invalidate cache by pattern or specific key
 */
export function invalidateCache(pattern?: string | RegExp): void {
  if (!pattern) {
    cache.clear();
    return;
  }

  const regex = typeof pattern === 'string' 
    ? new RegExp(pattern) 
    : pattern;

  // This is a simplified implementation
  // In production, you'd want a more efficient pattern matching
  cache.clear(); // For now, clear all
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: cache.size(),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Memoize function results with TTL
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: {
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
  } = {}
): T {
  const {
    ttl = 60,
    keyGenerator = (...args) => JSON.stringify(args),
  } = options;

  const memoCache = new Map<string, CacheEntry>();

  return ((...args: Parameters<T>) => {
    const key = keyGenerator(...args);
    const cached = memoCache.get(key);

    if (cached) {
      const isExpired = Date.now() - cached.timestamp > cached.ttl;
      if (!isExpired) {
        return cached.data;
      }
      memoCache.delete(key);
    }

    const result = fn(...args);
    memoCache.set(key, {
      data: result,
      timestamp: Date.now(),
      ttl: ttl * 1000,
    });

    return result;
  }) as T;
}
