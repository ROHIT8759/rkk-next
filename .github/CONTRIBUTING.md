# Contributing to rkk-next

Thank you for your interest in contributing to rkk-next! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/YOUR_USERNAME/rkk-next.git
   cd rkk-next
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   npm run test:coverage
   ```

## Project Structure

```
rkk-next/
├── src/                      # Source code
│   ├── seo/                 # SEO utilities
│   │   ├── MetaManager.tsx  # Meta tags management
│   │   ├── JsonLd.tsx       # Structured data
│   │   ├── defaults.ts      # Default SEO config
│   │   └── appMetadata.ts   # App Router metadata
│   ├── routing/             # Routing utilities
│   │   ├── SmartLink.tsx    # Smart link component
│   │   ├── prefetch.ts      # Prefetch utilities
│   │   └── RouteObserver.ts # Route change observer
│   ├── performance/         # Performance utilities
│   │   ├── ImageOptimizer.tsx  # Image optimization
│   │   ├── Lazy.tsx         # Code splitting
│   │   ├── cacheHeaders.ts  # Cache configuration
│   │   └── securityHeaders.ts  # Security headers
│   ├── analytics/           # Analytics utilities
│   │   └── webVitals.ts     # Web Vitals tracking
│   ├── backend/             # Backend utilities
│   │   ├── middleware.ts    # API middleware
│   │   ├── cache.ts         # Server caching
│   │   └── optimization.ts  # API optimization
│   └── index.ts             # Main entry point
├── __tests__/               # Test files
│   ├── seo/
│   ├── routing/
│   ├── performance/
│   ├── analytics/
│   └── backend/
├── __mocks__/               # Mock files
│   └── next/               # Next.js mocks
├── docs/                    # Documentation
│   └── BACKEND.md          # Backend utilities docs
├── examples/                # Usage examples
├── cli/                     # CLI tool source
├── dist/                    # Build output
└── coverage/                # Test coverage reports
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add TypeScript types
- Update documentation

### 3. Write Tests

All new features must include tests:

```typescript
// __tests__/your-feature/feature.test.ts
import { yourFeature } from "../../src/your-feature/feature";

describe("yourFeature", () => {
  it("should work correctly", () => {
    expect(yourFeature()).toBe(expected);
  });
});
```

### 4. Run Tests

```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### 5. Build

```bash
npm run build
```

### 6. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test updates
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Build/tooling changes

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style

- **TypeScript**: Use strict types, avoid `any`
- **React**: Functional components with hooks
- **Naming**: camelCase for functions, PascalCase for components
- **Exports**: Named exports preferred over default
- **Comments**: JSDoc for public APIs

## Testing Guidelines

- Maintain at least 50% code coverage
- Test both success and error cases
- Mock external dependencies (Next.js, etc.)
- Use descriptive test names

## Documentation

- Update README.md for new features
- Add JSDoc comments to public APIs
- Create examples in `examples/` directory
- Update `docs/` for complex features

## Need Help?

- 📖 [Documentation](https://github.com/ROHIT8759/rkk-next)
- 🐛 [Report Issues](https://github.com/ROHIT8759/rkk-next/issues)
- 💬 [Discussions](https://github.com/ROHIT8759/rkk-next/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
