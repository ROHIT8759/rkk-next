import Router from "next/router";

export type RouteChangeEvent = {
  /** Current route URL */
  url: string;

  /** Previous route URL */
  previousUrl: string;

  /** Navigation duration in ms */
  duration: number;

  /** Timestamp when navigation finished */
  timestamp: number;
};

type RouteObserverCallback = (event: RouteChangeEvent) => void;

let previousUrl = "";
let startTime = 0;

/**
 * Observe Next.js route changes with performance metrics
 */
export function observeRoutes(callback: RouteObserverCallback) {
  if (typeof window === "undefined") return;

  const handleStart = (url: string) => {
    startTime = performance.now();
  };

  const handleComplete = (url: string) => {
    const duration = performance.now() - startTime;

    callback({
      url,
      previousUrl,
      duration,
      timestamp: Date.now(),
    });

    previousUrl = url;
  };

  Router.events.on("routeChangeStart", handleStart);
  Router.events.on("routeChangeComplete", handleComplete);

  return () => {
    Router.events.off("routeChangeStart", handleStart);
    Router.events.off("routeChangeComplete", handleComplete);
  };
}

/**
 * SEO helper – update document title on route change
 */
export function observeTitle(
  titleFormatter: (path: string) => string
) {
  if (typeof window === "undefined") return;

  observeRoutes(({ url }) => {
    document.title = titleFormatter(url);
  });
}

/**
 * Analytics helper – plug any analytics provider
 */
export function observeAnalytics(
  track: (data: RouteChangeEvent) => void
) {
  observeRoutes(track);
}
