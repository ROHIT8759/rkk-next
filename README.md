🚀 rkk-next

rkk-next is an opinionated Next.js SDK that helps you build SEO-optimized, fast, and scalable applications with better routing, caching, and performance defaults.

Built for Next.js Pages Router & App Router
Ideal for startups, landing pages, Web3 dashboards, hackathons

✨ Features
🔍 SEO Optimization

Centralized meta management

OpenGraph & Twitter Cards

JSON-LD (Schema.org)

Canonical URL handling

SEO-safe defaults

⚡ Routing Optimization

Intelligent route prefetching

Hover-based prefetch intent

Route change observer

Analytics-ready routing events

🚀 Performance Boost

Lazy loading for heavy components

Optimized image wrapper

Cache & CDN header presets

Edge-friendly caching strategies

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

🧩 Supported Next.js Versions
Feature	Pages Router	App Router
MetaManager	✅	✅
JsonLd	✅	✅
SmartLink	✅	⚠️ (use only for internal links)
Routing Observer	✅	⚠️
ImageOptimizer	✅	✅
Lazy Loading	✅	✅
🛠️ Best Practices

Use MetaManager on every page

Avoid lazy loading LCP elements

Use SmartLink for internal navigation

Enable cache headers for static assets

Always provide alt text for images

🧑‍💻 Author

Rohit Kumar Kundu
B.Tech CSE | Web3 & Next.js Developer

📄 License

MIT License © 2025
Free to use, modify, and distribute.

⭐ Support the Project

If you like rkk-next:

⭐ Star the repo

🐛 Report issues

🤝 Contribute PRs

🚀 Next Steps

Add App Router generateMetadata

Web Vitals analytics

Example demo app

NPM publish

If you want, I can now:

✔ Review this README

✔ Add badges (npm, downloads)

✔ Prepare NPM publish checklist

✔ Create example Next.js app

✔ Final SDK audit before release

Just tell me 👍