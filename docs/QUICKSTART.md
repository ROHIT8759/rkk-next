# Quick Start Guide

Get up and running with rkk-next in 5 minutes!

## Installation

```bash
npm install rkk-next
```

## Step 1: Set up your app (Pages Router)

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import { reportWebVitals } from "rkk-next";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export { reportWebVitals };
```

## Step 2: Add SEO to your first page

```tsx
// pages/index.tsx
import { MetaManager, SmartLink } from "rkk-next";

export default function Home() {
  return (
    <>
      <MetaManager
        title="Home"
        description="My awesome Next.js app"
        keywords="nextjs, seo, performance"
      />

      <main>
        <h1>Welcome!</h1>
        <SmartLink href="/about">About Us</SmartLink>
      </main>
    </>
  );
}
```

## Step 3: Configure caching (Optional but Recommended)

```javascript
// next.config.js
const {
  LONG_TERM_CACHE,
  applyCache,
} = require("rkk-next/performance/cacheHeaders");

module.exports = {
  async headers() {
    return [applyCache("/_next/static/:path*", LONG_TERM_CACHE)];
  },
};
```

## You're all set! 🎉

### Next Steps:

- ✅ Add [JSON-LD structured data](./DOCS.md#jsonld)
- ✅ Optimize images with [OptimizedImage](./DOCS.md#optimizedimage)
- ✅ Lazy load heavy components
- ✅ Track route changes for analytics

## Full Documentation

👉 [Read the complete documentation](./DOCS.md)

## Examples

- [Pages Router Examples](./examples/pages-router/)
- [App Router Examples](./examples/app-router/)

## Need Help?

- 📖 [Documentation](./DOCS.md)
- 🐛 [Report Issues](https://github.com/ROHIT8759/rkk-next/issues)
- 💬 Ask questions in [Discussions](https://github.com/ROHIT8759/rkk-next/discussions)
