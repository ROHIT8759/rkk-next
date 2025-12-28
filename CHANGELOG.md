# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-28

### Added

- **Backend Utilities Module** - Express-like middleware system for Next.js API routes
  - `composeMiddleware` - Chain multiple middleware functions
  - `cors` - CORS configuration middleware
  - `rateLimit` - IP-based rate limiting
  - `validateRequest` - Request validation middleware
  - `logger` - Request logging middleware
  - `errorHandler` - Centralized error handling
- **Server-side Caching System**
  - `MemoryCache` class with TTL support
  - `cacheResponse` middleware for automatic GET caching
  - `memoize` function for caching expensive operations
  - `invalidateCache` for pattern-based cache clearing
- **API Optimization Utilities**
  - `compress` - Gzip compression middleware
  - `responseTime` - Response time tracking
  - `paginate` - Dataset pagination helper
  - `jsonResponse` - Consistent JSON response formatter
  - `timeout` - Request timeout protection
  - `bodyLimit` - Request payload size limits
  - `allowMethods` - HTTP method filtering
- **Professional Project Structure**
  - Moved all source code to `src/` directory
  - Added comprehensive project documentation
  - Added contribution guidelines
  - Added pull request template
- **Documentation**
  - Complete backend utilities guide ([docs/BACKEND.md](docs/BACKEND.md))
  - Project structure documentation ([docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md))
  - Contributing guidelines ([.github/CONTRIBUTING.md](.github/CONTRIBUTING.md))
- **Testing**
  - 38 new tests for backend utilities
  - Total test coverage: 97 tests across 14 suites
  - 85%+ code coverage maintained
- **CLI Updates**
  - Updated `create-next-rkk` to version 1.1.0
  - Synchronized with main package version

### Changed

- Reorganized project structure with dedicated `src/` directory
- Updated TypeScript configuration for new structure
- Updated Jest configuration for improved coverage reporting
- Enhanced README with badges, project structure, and backend examples
- Improved package.json with better metadata and keywords

### Improved

- Build output now cleaner and more organized
- Better separation of source code and build artifacts
- Enhanced type safety across all modules
- More comprehensive error handling

## [1.0.0] - 2025-12-27

### Added

- **SEO Module**
  - `MetaManager` - Dynamic meta tags management
  - `JsonLd` - Structured data for rich snippets
  - `generateAppMetadata` - Next.js App Router metadata
  - Default SEO configurations
- **Routing Module**
  - `SmartLink` - Intelligent prefetching
  - `prefetchRoute` - Programmatic prefetching
  - `RouteObserver` - Route change tracking
- **Performance Module**
  - `OptimizedImage` - Automatic image optimization
  - `lazyImport` - Code splitting utilities
  - Cache headers configuration
  - Security headers
- **Analytics Module**
  - Core Web Vitals tracking
  - Performance monitoring
- **CLI Tool**
  - `create-next-rkk` - Project scaffolding
  - Interactive setup wizard
  - TypeScript support
  - Both App and Pages Router support
- **Testing Infrastructure**
  - Jest configuration with ts-jest
  - 59 comprehensive tests
  - Next.js component mocks
  - 85%+ code coverage
- **Documentation**
  - Comprehensive README
  - Usage examples
  - TypeScript type definitions

### Features

- Full TypeScript support
- Next.js 12+ compatibility
- React 17+ compatibility
- Tree-shakeable exports
- Zero config setup
- Production-ready defaults

## [0.1.0] - Initial Development

### Added

- Project initialization
- Basic project structure
- Initial documentation

---

## Upgrade Guide

### From 1.0.0 to 1.1.0

**No breaking changes!** This is a feature addition release.

To use the new backend utilities:

```typescript
// Before (1.0.0) - Still works!
import { MetaManager, SmartLink } from "rkk-next";

// After (1.1.0) - New features available
import {
  MetaManager,
  SmartLink,
  composeMiddleware, // NEW!
  cors, // NEW!
  rateLimit, // NEW!
  cache, // NEW!
} from "rkk-next";
```

**New import paths** (internal development only):

```typescript
// If contributing to the project
import { MetaManager } from "../../src/seo/MetaManager"; // New path with src/
```

---

## Links

- [npm Package](https://www.npmjs.com/package/rkk-next)
- [GitHub Repository](https://github.com/ROHIT8759/rkk-next)
- [Issue Tracker](https://github.com/ROHIT8759/rkk-next/issues)
- [CLI Tool (create-next-rkk)](https://www.npmjs.com/package/create-next-rkk)
