# Project Structure

This document explains the structure of the rkk-next SDK repository.

## 📁 Repository Structure

```
rkk-next/
│
├── 📂 seo/                      # SEO optimization modules
│   ├── MetaManager.tsx          # Meta tags manager component
│   ├── JsonLd.tsx               # JSON-LD structured data
│   ├── defaults.ts              # SEO default configurations
│   └── appMetadata.ts           # App Router metadata helper
│
├── 📂 routing/                  # Routing optimization
│   ├── SmartLink.tsx            # Enhanced navigation link
│   ├── prefetch.ts              # Route prefetching utilities
│   └── RouteObserver.ts         # Route change tracking
│
├── 📂 performance/              # Performance optimization
│   ├── ImageOptimizer.tsx       # SEO-safe image component
│   ├── Lazy.tsx                 # Lazy loading utilities
│   ├── cacheHeaders.ts          # Cache header presets
│   └── securityHeaders.ts       # Security headers
│
├── 📂 analytics/                # Analytics integration
│   └── webVitals.ts             # Web Vitals tracking
│
├── 📂 examples/                 # Usage examples
│   ├── pages-router/            # Pages Router examples
│   ├── app-router/              # App Router examples
│   ├── components/              # Example components
│   └── styles/                  # Example styles
│
├── 📂 .github/                  # GitHub configuration
│   ├── workflows/               # CI/CD workflows
│   └── ISSUE_TEMPLATE/          # Issue templates
│
├── 📄 index.ts                  # Main entry point
├── 📄 package.json              # Package configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 next.config.js            # Example Next.js config
│
├── 📄 README.md                 # Main documentation
├── 📄 DOCS.md                   # Comprehensive docs
├── 📄 QUICKSTART.md             # Quick start guide
├── 📄 CONTRIBUTING.md           # Contribution guidelines
├── 📄 CHANGELOG.md              # Version history
├── 📄 LICENSE                   # MIT License
├── 📄 SECURITY.md               # Security policy
├── 📄 TESTING.md                # Testing guide
└── 📄 PUBLISHING.md             # Publishing guide
```

## 🔧 Core Modules

### SEO Module (`seo/`)

Handles all SEO-related functionality including meta tags, structured data, and canonical URLs.

### Routing Module (`routing/`)

Provides intelligent routing features like prefetching and navigation tracking.

### Performance Module (`performance/`)

Includes optimization tools for images, lazy loading, and caching strategies.

### Analytics Module (`analytics/`)

Web Vitals tracking and performance monitoring integration.

## 📝 Documentation Files

| File            | Purpose                           |
| --------------- | --------------------------------- |
| README.md       | Main documentation and overview   |
| DOCS.md         | Complete API reference and guides |
| QUICKSTART.md   | 5-minute setup guide              |
| CONTRIBUTING.md | How to contribute to the project  |
| CHANGELOG.md    | Version history and changes       |
| TESTING.md      | Testing guidelines                |
| PUBLISHING.md   | NPM publishing instructions       |
| SECURITY.md     | Security policies and reporting   |

## 🚀 Getting Started

1. **Development:**

   ```bash
   npm install
   npm run dev
   ```

2. **Build:**

   ```bash
   npm run build
   ```

3. **Test:**
   ```bash
   npm test
   ```

## 📦 Distribution

The package is distributed via NPM. Only the `dist/` folder and essential files are published (configured in `.npmignore`).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## 📄 License

MIT © Rohit Kumar Kundu
