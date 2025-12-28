# Test Coverage Report

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
__tests__/
├── seo/
│   ├── MetaManager.test.tsx     # SEO meta tags testing
│   ├── JsonLd.test.tsx          # JSON-LD schema testing
│   └── defaults.test.ts         # SEO utilities testing
├── routing/
│   ├── prefetch.test.ts         # Prefetch utilities
│   └── RouteObserver.test.ts    # Route tracking
└── performance/
    ├── cacheHeaders.test.ts     # Cache configuration
    └── ImageOptimizer.test.tsx  # Image optimization
```

## Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## What's Tested

✅ SEO Components

- MetaManager rendering
- OpenGraph tags
- Twitter Cards
- JSON-LD schema generation

✅ Routing Utilities

- Route prefetching
- Network-aware prefetching
- Batch prefetching

✅ Performance Tools

- Cache headers configuration
- Header presets validation

## Running Specific Tests

```bash
# Test specific file
npm test MetaManager

# Test specific describe block
npm test -- -t "MetaManager"

# Update snapshots
npm test -- -u
```

## CI Integration

Tests run automatically on:

- Pull requests
- Push to main branch
- Pre-publish hook

## Writing New Tests

1. Create test file in `__tests__/` matching source structure
2. Use descriptive test names
3. Mock Next.js dependencies
4. Aim for high coverage
5. Test edge cases

Example:

```typescript
import { render } from "@testing-library/react";
import { MyComponent } from "../../path/to/component";

describe("MyComponent", () => {
  it("should render correctly", () => {
    const { container } = render(<MyComponent />);
    expect(container).toBeInTheDocument();
  });
});
```

## Troubleshooting

**Tests not running?**

- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (>= 16.0.0)

**Mock errors?**

- Verify `__mocks__` directory structure
- Check that mocks match Next.js API

**Coverage too low?**

- Add tests for untested branches
- Test error handling
- Test edge cases
