# 🚀 rkk-next

> **SEO, Performance & Routing SDK for Next.js**

[![npm version](https://img.shields.io/npm/v/rkk-next.svg)](https://www.npmjs.com/package/rkk-next)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

rkk-next is an opinionated Next.js SDK that helps you build **SEO-optimized**, **blazing fast**, and **scalable** applications with better routing, caching, and performance defaults.

✨ **Built for Next.js Pages Router & App Router**  
🎯 **Ideal for:** Startups, Landing Pages, Web3 Dashboards, SaaS, Hackathons

## ✨ Features

### 🔍 SEO Optimization
- ✅ Centralized meta management (OpenGraph, Twitter Cards)
- ✅ JSON-LD structured data (Schema.org)
- ✅ Canonical URL handling
- ✅ SEO-safe defaults & best practices

### ⚡ Routing Optimization
- ✅ Intelligent route prefetching (hover-based)
- ✅ Network-aware prefetching
- ✅ Route change observer with performance metrics
- ✅ Analytics-ready routing events

### 🚀 Performance Boost
- ✅ Lazy loading for heavy components
- ✅ Optimized image wrapper (SEO + performance)
- ✅ Cache & CDN header presets
- ✅ Edge-friendly caching strategies
- ✅ Security headers included

### 📊 Analytics
- ✅ Web Vitals tracking (LCP, FID, CLS, etc.)
- ✅ Route navigation analytics
- ✅ Performance monitoring

📦 Installation
npm install rkk-next


or

yarn add rkk-next

🧠 Basic Usage
1️⃣ SEO Meta Manager
import { MetaManager } from "rkk-next";

export default function Home() {
  return (
    <>
      <MetaManager
        title="Home | My App"
        description="SEO optimized Next.js app using rkk-next"
        keywords="Next.js, SEO, Performance"
        image="/og.png"
        siteName="My App"
      />

      <h1>Hello World</h1>
    </>
  );
}

2️⃣ JSON-LD (Schema.org)
import { JsonLd } from "rkk-next";

<JsonLd
  type="WebSite"
  data={{
    name: "My App",
    url: "https://myapp.com",
  }}
/>

🔗 Smart Routing
SmartLink (Enhanced next/link)
import { SmartLink } from "rkk-next";

<SmartLink href="/dashboard">
  Go to Dashboard
</SmartLink>


✔ Prefetch on hover
✔ Network-aware
✔ SEO-safe <a> tag

Route Observer
import { observeRoutes } from "rkk-next";

observeRoutes((event) => {
  console.log(event.url, event.duration);
});

🖼️ Image Optimization
import { OptimizedImage } from "rkk-next";

<OptimizedImage
  src="/hero.png"
  alt="Landing page hero image"
  width={1200}
  height={630}
  priority
/>


✔ SEO-safe alt enforcement
✔ Responsive sizes
✔ LCP optimized

💤 Lazy Loading
import { lazyImport } from "rkk-next";

const Chart = lazyImport(() => import("./Chart"));

export default function Dashboard() {
  return <Chart />;
}

🧠 Intelligent Prefetching
import { prefetchRoute, isFastConnection } from "rkk-next";

prefetchRoute("/dashboard", {
  condition: isFastConnection,
});

🗄️ Cache Headers

Use directly inside next.config.js:

const {
  LONG_TERM_CACHE,
  EDGE_CACHE,
  NO_CACHE,
  applyCache,
} = require("rkk-next");

module.exports = {
  async headers() {
    return [
      applyCache("/_next/static/:path*", LONG_TERM_CACHE),
      applyCache("/api/public/:path*", EDGE_CACHE),
      applyCache("/dashboard/:path*", NO_CACHE),
    ];
  },
};

## 🧩 Supported Next.js Versions

| Feature           | Pages Router | App Router |
|-------------------|--------------|------------|
| MetaManager       | ✅          | ✅ (via generateAppMetadata) |
| JsonLd            | ✅          | ✅         |
| SmartLink         | ✅          | ⚠️ (use for internal links only) |
| Routing Observer  | ✅          | ⚠️ (Pages Router recommended) |
| OptimizedImage    | ✅          | ✅         |
| Lazy Loading      | ✅          | ✅         |
| Cache Headers     | ✅          | ✅         |
| Web Vitals        | ✅          | ✅         |

**Minimum Requirements:**
- Next.js >= 12.0.0
- React >= 17.0.0
- TypeScript >= 4.5.0 (optional but recommended)
🛠️ Best Practices

Use MetaManager on every page

Avoid lazy loading LCP elements

Use SmartLink for internal navigation

Enable cache headers for static assets

Always provide alt text for images

## 🧑‍💻 Author

**Rohit Kumar Kundu**  
🎓 B.Tech CSE | Web3 & Next.js Developer  
🔗 [GitHub](https://github.com/ROHIT8759) | [LinkedIn](https://linkedin.com/in/rohit-kumar-kundu)

## 📚 Documentation

- 📖 [Full Documentation](./docs/DOCS.md)
- 🚀 [Quick Start Guide](./docs/QUICKSTART.md)
- 📝 [API Reference](./docs/DOCS.md#api-reference)
- 💡 [Examples](./examples/)

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Next Steps

- [ ] Add App Router `generateMetadata` helper
- [ ] Expand Web Vitals analytics integration
- [ ] Create demo app showcase
- [ ] Add Lighthouse CI integration
- [ ] Video tutorials & guides

## 📄 License

MIT License © 2025 [Rohit Kumar Kundu](https://github.com/ROHIT8759)

Free to use, modify, and distribute. See [LICENSE](./LICENSE) for details.

## ⭐ Support the Project

If you find rkk-next helpful:

- ⭐ **Star the repo** on GitHub
- 🐛 **Report issues** to help improve the SDK
- 🤝 **Contribute** with PRs and feature ideas
- 📢 **Share** with other Next.js developers
- 💬 **Join discussions** and share your use cases

---

**Made with ❤️ for the Next.js community**

[Get Started](./docs/QUICKSTART.md) | [Documentation](./docs/DOCS.md) | [Examples](./examples/) | [Report Issue](https://github.com/ROHIT8759/rkk-next/issues)

NPM publish

If you want, I can now:

✔ Review this README

✔ Add badges (npm, downloads)

✔ Prepare NPM publish checklist

✔ Create example Next.js app

✔ Final SDK audit before release

Just tell me 👍