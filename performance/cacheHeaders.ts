/**
 * Cache header presets for Next.js
 * Centralized caching strategy for SEO & performance
 */

export type CacheHeader = {
  key: string;
  value: string;
};

/**
 * Long-term cache
 * Best for static assets (JS, CSS, fonts, images)
 */
export const LONG_TERM_CACHE: CacheHeader[] = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

/**
 * Short-term cache
 * Best for ISR pages or frequently updated content
 */
export const SHORT_TERM_CACHE: CacheHeader[] = [
  {
    key: "Cache-Control",
    value: "public, max-age=60, stale-while-revalidate=300",
  },
];

/**
 * No cache
 * Best for dashboards, auth, user-specific pages
 */
export const NO_CACHE: CacheHeader[] = [
  {
    key: "Cache-Control",
    value: "no-store, no-cache, must-revalidate, proxy-revalidate",
  },
  {
    key: "Pragma",
    value: "no-cache",
  },
  {
    key: "Expires",
    value: "0",
  },
];

/**
 * Edge / CDN optimized cache
 */
export const EDGE_CACHE: CacheHeader[] = [
  {
    key: "Cache-Control",
    value: "public, s-maxage=86400, stale-while-revalidate=604800",
  },
];

/**
 * Helper function to apply cache headers
 * directly inside next.config.js
 */
export function applyCache(
  source: string,
  headers: CacheHeader[]
) {
  return {
    source,
    headers,
  };
}
