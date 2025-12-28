/**
 * Global SEO defaults for next-optimize-sdk
 * These values can be overridden per page using MetaManager
 */

export type SeoDefaults = {
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  defaultImage: string;
  siteUrl: string;
  twitterHandle?: string;
  themeColor?: string;
};

/**
 * Default SEO configuration
 * Override this in your app if needed
 */
export const SEO_DEFAULTS: SeoDefaults = {
  siteName: "My Website",
  titleTemplate: "%s | My Website",
  defaultTitle: "My Website",
  defaultDescription:
    "A modern, fast, and SEO-optimized Next.js application.",
  defaultKeywords:
    "Next.js, SEO, Web Performance, React, Optimization",
  defaultImage: "/og-image.png",
  siteUrl: "https://example.com",
  twitterHandle: "",
  themeColor: "#000000",
};

/**
 * Helper to generate full title using template
 */
export function getSeoTitle(
  title?: string,
  template: string = SEO_DEFAULTS.titleTemplate
): string {
  if (!title) return SEO_DEFAULTS.defaultTitle;
  return template.replace("%s", title);
}

/**
 * Helper to generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SEO_DEFAULTS.siteUrl}${path}`;
}

/**
 * Merge custom SEO config with defaults
 */
export function mergeSeoDefaults(
  overrides: Partial<SeoDefaults> = {}
): SeoDefaults {
  return {
    ...SEO_DEFAULTS,
    ...overrides,
  };
}
