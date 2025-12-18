# rkk-next Examples

This directory contains real-world examples of using rkk-next in Next.js applications.

## 📁 Directory Structure

```
examples/
├── pages-router/          # Pages Router examples
│   ├── _app.tsx          # App setup with Web Vitals
│   ├── index.tsx         # Home page with SEO
│   ├── dashboard.tsx     # Lazy loading & route tracking
│   └── blog/[slug].tsx   # Dynamic blog with JSON-LD
│
└── app-router/           # App Router examples
    ├── layout.tsx        # Root layout with metadata
    ├── page.tsx          # Home page
    └── blog/[slug]/
        └── page.tsx      # Dynamic blog post
```

## 🚀 Running Examples

### Using Pages Router Example

1. Create a new Next.js app (Pages Router):

```bash
npx create-next-app@latest my-app --use-npm
cd my-app
```

2. Install rkk-next:

```bash
npm install rkk-next
```

3. Copy files from `examples/pages-router/` to your `pages/` directory

4. Run:

```bash
npm run dev
```

### Using App Router Example

1. Create a new Next.js app (App Router):

```bash
npx create-next-app@latest my-app --app --use-npm
cd my-app
```

2. Install rkk-next:

```bash
npm install rkk-next
```

3. Copy files from `examples/app-router/` to your `app/` directory

4. Run:

```bash
npm run dev
```

## 📖 What Each Example Demonstrates

### Pages Router Examples

**`_app.tsx`**

- Setting up Web Vitals reporting
- App-wide configuration

**`index.tsx`**

- Basic SEO with MetaManager
- JSON-LD structured data
- Optimized images
- Smart links with prefetching

**`dashboard.tsx`**

- Lazy loading heavy components
- Route change tracking
- Private page SEO (noIndex)

**`blog/[slug].tsx`**

- Dynamic routes with ISR
- Article SEO optimization
- JSON-LD for articles
- Rich results setup

### App Router Examples

**`layout.tsx`**

- generateAppMetadata helper
- Root layout configuration

**`page.tsx`**

- App Router SEO setup
- Image optimization
- JSON-LD integration

**`blog/[slug]/page.tsx`**

- Dynamic metadata generation
- generateStaticParams
- Article schema markup

## 🔧 Customization

Feel free to modify these examples to fit your needs:

- Change SEO defaults in MetaManager
- Add your own JSON-LD schemas
- Customize cache headers
- Add analytics providers
- Style components

## 📚 Learn More

- [Main Documentation](../DOCS.md)
- [Quick Start Guide](../QUICKSTART.md)
- [API Reference](../DOCS.md#api-reference)

## 💡 Tips

1. Always test SEO with:

   - Google Rich Results Test
   - Lighthouse
   - Browser DevTools

2. Monitor performance:

   - Check Web Vitals in production
   - Use Network tab to verify prefetching
   - Test lazy loading behavior

3. Validate structured data:
   - Use schema.org validator
   - Check Google Search Console

## 🐛 Issues?

If you find any issues with these examples, please [report them](https://github.com/ROHIT8759/rkk-next/issues).

---

**Happy Coding! 🚀**
