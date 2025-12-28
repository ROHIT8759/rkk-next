import Router from "next/router";

type PrefetchOptions = {
  /** Enable or disable prefetch globally */
  enabled?: boolean;

  /** Delay before prefetch starts (ms) */
  delay?: number;

  /** Only prefetch when user is idle */
  idleOnly?: boolean;

  /** Custom condition (e.g. network check) */
  condition?: () => boolean;
};

/**
 * Intelligent route prefetching for Next.js
 * Prefetches routes when user intent is detected
 */
export function prefetchRoute(
  href: string,
  options: PrefetchOptions = {}
) {
  const {
    enabled = true,
    delay = 200,
    idleOnly = true,
    condition,
  } = options;

  if (!enabled) return;
  if (typeof window === "undefined") return;

  if (condition && !condition()) return;

  const startPrefetch = () => {
    try {
      Router.prefetch(href);
    } catch (err) {
      console.warn("[next-optimize-sdk] Prefetch failed:", err);
    }
  };

  if (idleOnly && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => {
      setTimeout(startPrefetch, delay);
    });
  } else {
    setTimeout(startPrefetch, delay);
  }
}

/**
 * Prefetch multiple routes safely
 */
export function prefetchRoutes(
  routes: string[],
  options?: PrefetchOptions
) {
  routes.forEach((route) => prefetchRoute(route, options));
}

/**
 * Network-aware prefetch condition
 * Prevents prefetch on slow connections
 */
export function isFastConnection(): boolean {
  if (typeof navigator === "undefined") return true;

  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!connection) return true;

  return !["slow-2g", "2g"].includes(connection.effectiveType);
}
