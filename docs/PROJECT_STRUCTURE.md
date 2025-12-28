# Project Structure

This document explains the organization and architecture of the rkk-next SDK.

## Directory Overview

```
rkk-next/
├── 📁 src/                      # Source code (compiled to dist/)
├── 📁 __tests__/               # Test suites
├── 📁 __mocks__/               # Test mocks
├── 📁 docs/                    # Documentation
├── 📁 examples/                # Usage examples
├── 📁 cli/                     # CLI tool (create-next-rkk)
├── 📁 dist/                    # Build output (generated)
├── 📁 coverage/                # Test coverage reports (generated)
├── 📁 .github/                 # GitHub configuration
├── 📄 package.json            # Package configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 jest.config.js          # Jest test configuration
└── 📄 README.md               # Main documentation
```

## Source Code (`src/`)

### SEO Module (`src/seo/`)

Meta tag management and structured data for search engine optimization.

**Files:**

- `MetaManager.tsx` - React component for managing meta tags
- `JsonLd.tsx` - Structured data (JSON-LD) component
- `defaults.ts` - Default SEO configuration and constants
- `appMetadata.ts` - Next.js App Router metadata generator

**Usage:**

```typescript
import { MetaManager, JsonLd, generateAppMetadata } from "rkk-next";
```

### Routing Module (`src/routing/`)

Smart routing and navigation optimization.

**Files:**

- `SmartLink.tsx` - Enhanced Next.js Link with prefetching
- `prefetch.ts` - Programmatic prefetch utilities
- `RouteObserver.ts` - Route change observer and analytics

**Usage:**

```typescript
import { SmartLink, prefetchRoute, observeRoutes } from "rkk-next";
```

### Performance Module (`src/performance/`)

Performance optimization utilities and components.

**Files:**

- `ImageOptimizer.tsx` - Optimized image component
- `Lazy.tsx` - Code splitting and lazy loading
- `cacheHeaders.ts` - HTTP caching configuration
- `securityHeaders.ts` - Security headers configuration

**Usage:**

```typescript
import { OptimizedImage, lazyImport, LONG_TERM_CACHE } from "rkk-next";
```

### Analytics Module (`src/analytics/`)

Web Vitals tracking and performance monitoring.

**Files:**

- `webVitals.ts` - Core Web Vitals reporting

**Usage:**

```typescript
import { reportWebVitals } from "rkk-next";
```

### Backend Module (`src/backend/`)

API route utilities for Next.js backend.

**Files:**

- `middleware.ts` - Express-like middleware system
- `cache.ts` - Server-side caching utilities
- `optimization.ts` - API optimization helpers

**Usage:**

```typescript
import { composeMiddleware, cors, rateLimit, cache } from "rkk-next";
```

### Entry Point (`src/index.ts`)

Main entry point that exports all public APIs.

## Tests (`__tests__/`)

Mirror structure of `src/` with test files.

```
__tests__/
├── seo/
│   ├── MetaManager.test.tsx
│   ├── JsonLd.test.tsx
│   ├── defaults.test.ts
│   └── appMetadata.test.ts
├── routing/
│   ├── SmartLink.test.tsx
│   ├── prefetch.test.ts
│   └── RouteObserver.test.tsx
├── performance/
│   ├── ImageOptimizer.test.tsx
│   ├── Lazy.test.tsx
│   └── cacheHeaders.test.ts
├── analytics/
│   └── webVitals.test.ts
└── backend/
    ├── middleware.test.ts
    ├── cache.test.ts
    └── optimization.test.ts
```

**Running Tests:**

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Generate coverage
```

## Mocks (`__mocks__/`)

Mock implementations for testing.

```
__mocks__/
└── next/
    ├── head.tsx           # Mock Next.js Head
    ├── router.tsx         # Mock Next.js Router
    ├── image.tsx          # Mock Next.js Image
    └── dynamic.tsx        # Mock Next.js dynamic
```

## Documentation (`docs/`)

Detailed documentation for specific features.

```
docs/
└── BACKEND.md             # Backend utilities guide
```

## Examples (`examples/`)

Sample implementations and use cases.

```
examples/
├── seo-example.tsx
├── routing-example.tsx
└── backend-example.ts
```

## CLI Tool (`cli/`)

Separate npm package for creating Next.js apps with rkk-next.

```
cli/
├── src/
│   └── index.ts           # CLI implementation
├── dist/                  # Build output
├── package.json          # CLI package config
└── README.md             # CLI documentation
```

**Package:** `create-next-rkk`

## Build Output (`dist/`)

TypeScript compilation output (gitignored, generated on build).

```
dist/
├── index.js
├── index.d.ts
├── seo/
├── routing/
├── performance/
├── analytics/
└── backend/
```

**Build Commands:**

```bash
npm run build              # Compile TypeScript
npm run dev               # Watch mode
```

## Configuration Files

### `package.json`

- Package metadata
- Dependencies
- Scripts
- NPM publish configuration

### `tsconfig.json`

- TypeScript compiler options
- Source directory: `src/`
- Output directory: `dist/`
- Strict mode enabled

### `jest.config.js`

- Test runner configuration
- Coverage thresholds (50%)
- Mock mappings

### `.npmignore`

- Excludes source files from npm package
- Only `dist/` is published

### `.gitignore`

- Excludes build artifacts
- Excludes `node_modules/`
- Excludes coverage reports

## GitHub Configuration (`.github/`)

```
.github/
├── CONTRIBUTING.md        # Contribution guidelines
└── PULL_REQUEST_TEMPLATE.md  # PR template
```

## Package Distribution

When published to npm, the package includes:

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT License
- `package.json` - Package metadata

**Installation:**

```bash
npm install rkk-next
```

## Development Workflow

1. **Source Code** → Edit files in `src/`
2. **Write Tests** → Add tests in `__tests__/`
3. **Build** → `npm run build` compiles to `dist/`
4. **Test** → `npm test` runs Jest tests
5. **Publish** → `npm publish` publishes to npm

## Architecture Principles

- **Modular**: Each feature in separate module
- **Tree-shakeable**: Named exports for optimal bundling
- **Type-safe**: Full TypeScript support
- **Tested**: Comprehensive test coverage
- **Documented**: JSDoc comments on public APIs

## Import Paths

**External (npm package):**

```typescript
import { MetaManager } from "rkk-next";
```

**Internal (development):**

```typescript
// From tests
import { MetaManager } from "../../src/seo/MetaManager";

// From src files
import { defaultSEO } from "./defaults";
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for development guidelines.
