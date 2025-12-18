# Publishing rkk-next to NPM

## Pre-publish Checklist

- [ ] All tests pass
- [ ] Documentation is up to date
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Examples tested
- [ ] README.md reviewed

## Build the Package

```bash
npm run build
```

This will compile TypeScript to JavaScript in the `dist/` directory.

## Test Locally

```bash
# Link the package locally
npm link

# In a test Next.js project
npm link rkk-next
```

## Publish to NPM

### 1. Login to NPM

```bash
npm login
```

### 2. Publish

```bash
npm publish
```

Or for beta versions:

```bash
npm publish --tag beta
```

## Post-publish

1. Create a GitHub release
2. Tag the version: `git tag v1.0.0`
3. Push tags: `git push --tags`
4. Update documentation if needed

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backward compatible
- **Patch** (0.0.1): Bug fixes

## Automated Publishing

This repo includes GitHub Actions workflow for automated publishing on release.

See `.github/workflows/publish.yml`

---

**Author:** Rohit Kumar Kundu
