import dynamic, { DynamicOptions, Loader } from "next/dynamic";
import React from "react";

export type LazyOptions<P = {}> = {
  /** Custom loading component */
  loading?: React.ComponentType;

  /** Enable / disable SSR */
  ssr?: boolean;

  /** Delay before showing loading component (ms) */
  delay?: number;
};

/**
 * Lazy-load a React component with Next.js dynamic import
 * Optimized for performance and bundle size reduction
 */
export function lazyImport<P = {}>(
  loader: Loader<P>,
  options: LazyOptions<P> = {}
) {
  const {
    loading: LoadingComponent,
    ssr = false,
    delay = 200,
  } = options;

  const dynamicOptions: DynamicOptions<P> = {
    ssr,
    loading: LoadingComponent
      ? () => <LoadingComponent />
      : () => null,
  };

  return dynamic(async () => {
    if (delay > 0) {
      await new Promise((res) => setTimeout(res, delay));
    }
    return loader();
  }, dynamicOptions);
}

/**
 * Simple fallback loading component
 */
export const DefaultLoader: React.FC = () => (
  <div
    style={{
      padding: "1rem",
      textAlign: "center",
      opacity: 0.7,
      fontSize: "0.9rem",
    }}
  >
    Loading…
  </div>
);
