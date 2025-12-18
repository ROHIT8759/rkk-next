# rkk-next Documentation

Complete guide to using rkk-next in your Next.js projects.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [SEO Components](#seo-components)
4. [Routing](#routing)
5. [Performance](#performance)
6. [Analytics](#analytics)
7. [Configuration](#configuration)
8. [Best Practices](#best-practices)
9. [API Reference](#api-reference)

## Installation

```bash
npm install rkk-next
# or
yarn add rkk-next
```

## Quick Start

### Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import { reportWebVitals } from "rkk-next";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export { reportWebVitals };
```

```tsx
// pages/index.tsx
import { MetaManager, JsonLd, SmartLink } from "rkk-next";

export default function Home() {
  return (
    <>
      <MetaManager
        title="Home"
        description="My awesome Next.js app"
        keywords="nextjs, seo, performance"
      />

      <JsonLd
        type="WebSite"
        data={{ name: "My Site", url: "https://example.com" }}
      />

      <main>
        <h1>Welcome</h1>
        <SmartLink href="/about">About Us</SmartLink>
      </main>
    </>
  );
}
```

### App Router

```tsx
// app/layout.tsx
import { generateAppMetadata } from "rkk-next";

export const metadata = generateAppMetadata({
  title: "My App",
  description: "Built with rkk-next",
  image: "/og.png",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## SEO Components

### MetaManager

Centralized meta tag management for Pages Router.

```tsx
import { MetaManager } from "rkk-next";

<MetaManager
  title="Page Title"
  description="SEO-friendly description"
  keywords="keyword1, keyword2"
  canonicalUrl="https://example.com/page"
  image="/og-image.png"
  type="article"
  siteName="My Site"
  author="Your Name"
  twitterHandle="username"
  noIndex={false}
/>;
```

**Props:**

- `title` (string, required): Page title
- `description` (string, required): Meta description
- `keywords` (string, optional): SEO keywords
- `canonicalUrl` (string, optional): Canonical URL (auto-generated if omitted)
- `image` (string, optional): OpenGraph image
- `type` ("website" | "article", optional): OpenGraph type
- `siteName` (string, optional): Site name
- `author` (string, optional): Author name
- `twitterHandle` (string, optional): Twitter username
- `noIndex` (boolean, optional): Prevent indexing

### JsonLd

Add structured data (Schema.org) to your pages.

```tsx
import { JsonLd } from "rkk-next";

// Website Schema
<JsonLd
  type="WebSite"
  data={{
    name: "My Website",
    url: "https://example.com",
  }}
/>

// Article Schema
<JsonLd
  type="Article"
  data={{
    headline: "Article Title",
    image: "/article.jpg",
    datePublished: "2025-01-15",
    author: {
      "@type": "Person",
      name: "Author Name",
    },
  }}
/>

// Product Schema
<JsonLd
  type="Product"
  data={{
    name: "Product Name",
    image: "/product.jpg",
    description: "Product description",
    offers: {
      "@type": "Offer",
      price: "99.99",
      priceCurrency: "USD",
    },
  }}
/>
```

### generateAppMetadata (App Router)

```tsx
import { generateAppMetadata } from "rkk-next";

export const metadata = generateAppMetadata({
  title: "My Page",
  description: "Page description",
  image: "/og.png",
});
```

## Routing

### SmartLink

Enhanced `next/link` with intelligent prefetching.

```tsx
import { SmartLink } from "rkk-next";

<SmartLink href="/dashboard" prefetchOnHover={true} prefetchDelay={150}>
  Go to Dashboard
</SmartLink>;
```

**Features:**

- Hover-based prefetching
- Network-aware (skips on slow connections)
- SEO-safe with proper `<a>` tags
- Accessible

### Prefetching

Manual route prefetching.

```tsx
import { prefetchRoute, prefetchRoutes, isFastConnection } from "rkk-next";

// Prefetch single route
prefetchRoute("/dashboard", {
  delay: 200,
  condition: isFastConnection,
});

// Prefetch multiple routes
prefetchRoutes(["/about", "/contact"], {
  enabled: true,
  idleOnly: true,
});
```

### Route Observer

Track route changes and navigation performance.

```tsx
import { observeRoutes } from "rkk-next";
import { useEffect } from "react";

function MyApp() {
  useEffect(() => {
    const unsubscribe = observeRoutes((event) => {
      console.log("Navigated to:", event.url);
      console.log("Duration:", event.duration, "ms");

      // Send to analytics
      analytics.track("page_view", {
        url: event.url,
        duration: event.duration,
      });
    });

    return unsubscribe;
  }, []);
}
```

## Performance

### OptimizedImage

SEO-first wrapper around `next/image`.

```tsx
import { OptimizedImage } from "rkk-next";

<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority // For LCP images
  quality={80}
/>;
```

### Lazy Loading

Reduce bundle size with code splitting.

```tsx
import { lazyImport, DefaultLoader } from "rkk-next";

const HeavyComponent = lazyImport(() => import("./HeavyComponent"), {
  loading: DefaultLoader,
  ssr: false,
  delay: 100,
});

function Page() {
  return <HeavyComponent />;
}
```

### Cache Headers

Configure caching in `next.config.js`.

```javascript
const {
  LONG_TERM_CACHE,
  SHORT_TERM_CACHE,
  EDGE_CACHE,
  NO_CACHE,
  applyCache,
} = require("rkk-next/performance/cacheHeaders");

module.exports = {
  async headers() {
    return [
      applyCache("/_next/static/:path*", LONG_TERM_CACHE),
      applyCache("/images/:path*", LONG_TERM_CACHE),
      applyCache("/api/public/:path*", EDGE_CACHE),
      applyCache("/dashboard/:path*", NO_CACHE),
      applyCache("/blog/:path*", SHORT_TERM_CACHE),
    ];
  },
};
```

**Cache Presets:**

- `LONG_TERM_CACHE`: 1 year, immutable (static assets)
- `SHORT_TERM_CACHE`: 60s with stale-while-revalidate
- `EDGE_CACHE`: 1 day edge cache with 7 day SWR
- `NO_CACHE`: No caching (dynamic/private pages)

### Security Headers

```javascript
const { SECURITY_HEADERS } = require("rkk-next/performance/securityHeaders");

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};
```

## Analytics

### Web Vitals

Track Core Web Vitals automatically.

```tsx
// pages/_app.tsx
import { reportWebVitals } from "rkk-next";

export { reportWebVitals };
```

Customize reporting:

```tsx
import { NextWebVitalsMetric } from "next/app";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric.name, metric.value);

  // Send to your analytics service
  analytics.track("web_vital", {
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });
}
```

## Configuration

### SEO Defaults

Customize global SEO settings.

```tsx
import { mergeSeoDefaults } from "rkk-next";

const customSeo = mergeSeoDefaults({
  siteName: "My Custom Site",
  siteUrl: "https://mycustomsite.com",
  twitterHandle: "myhandle",
  themeColor: "#ff0000",
});
```

## Best Practices

### ✅ Do's

1. **Use MetaManager on every page** for consistent SEO
2. **Add alt text** to all images (required by OptimizedImage)
3. **Use SmartLink** for internal navigation
4. **Enable cache headers** for static assets
5. **Lazy load heavy components** (charts, videos, 3D graphics)
6. **Add JSON-LD** for rich results in search
7. **Set priority={true}** on LCP images
8. **Track Web Vitals** to monitor performance

### ❌ Don'ts

1. **Don't lazy load LCP elements** (above-the-fold content)
2. **Don't skip alt text** on images
3. **Don't use aggressive caching** on user-specific pages
4. **Don't prefetch everything** - be selective
5. **Don't forget canonical URLs** on paginated content

## API Reference

### Components

- `MetaManager`: SEO meta tag manager
- `JsonLd`: Structured data injector
- `SmartLink`: Enhanced navigation link
- `OptimizedImage`: SEO-safe image component

### Functions

- `lazyImport`: Dynamic component loading
- `prefetchRoute`: Manual route prefetching
- `prefetchRoutes`: Batch prefetching
- `observeRoutes`: Route change tracking
- `generateAppMetadata`: App Router metadata
- `reportWebVitals`: Web Vitals tracking
- `isFastConnection`: Network condition check

### Constants

- `LONG_TERM_CACHE`: Long-term cache headers
- `SHORT_TERM_CACHE`: Short-term cache headers
- `EDGE_CACHE`: CDN/edge cache headers
- `NO_CACHE`: No-cache headers
- `SECURITY_HEADERS`: Security headers

## Examples

See the `examples/` directory for complete examples:

- `examples/pages-router/`: Pages Router examples
- `examples/app-router/`: App Router examples

## Support

- 📖 [GitHub Repository](https://github.com/ROHIT8759/rkk-next)
- 🐛 [Report Issues](https://github.com/ROHIT8759/rkk-next/issues)
- 💬 [Discussions](https://github.com/ROHIT8759/rkk-next/discussions)

## License

MIT © Rohit Kumar Kundu
