# rkk-next Testing Guide

## Running Tests

```bash
npm test
```

## Test Coverage

Currently, tests are in development. Planned test coverage includes:

### Unit Tests

- SEO component rendering
- JSON-LD schema generation
- Cache header generation
- Prefetch utilities
- Route observer functionality

### Integration Tests

- MetaManager with Next.js Head
- SmartLink prefetching behavior
- Image optimization
- Lazy loading

### E2E Tests

- Full page SEO validation
- Route navigation and prefetching
- Performance metrics

## Contributing Tests

When adding new features, please include:

1. Unit tests for utility functions
2. Component tests for React components
3. Type tests for TypeScript types

Example test structure:

```typescript
import { describe, it, expect } from "vitest";
import { getCanonicalUrl } from "../seo/defaults";

describe("getCanonicalUrl", () => {
  it("should generate canonical URL from path", () => {
    const url = getCanonicalUrl("/blog/post-1");
    expect(url).toBe("https://example.com/blog/post-1");
  });
});
```

## Test TODO List

- [ ] Add Vitest configuration
- [ ] Add React Testing Library
- [ ] Write unit tests for all utilities
- [ ] Add component tests
- [ ] Set up CI/CD for automated testing
- [ ] Add E2E tests with Playwright

## Manual Testing Checklist

Before releasing:

- [ ] Test in Next.js Pages Router app
- [ ] Test in Next.js App Router app
- [ ] Verify SEO meta tags in browser
- [ ] Check JSON-LD with Google Rich Results Test
- [ ] Test prefetching in Network tab
- [ ] Verify lazy loading behavior
- [ ] Test all cache headers
- [ ] Check TypeScript types compilation
- [ ] Verify package build and exports

---

**Note:** Automated tests coming soon! For now, please test manually using the examples in the `examples/` directory.
