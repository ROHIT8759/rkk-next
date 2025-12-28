# Next.js App Router + rkk-next Example

Complete production-ready example showing how to integrate **rkk-next** with Next.js 13+ App Router.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000

## 📁 Project Structure

```
app/
├── api/
│   ├── users/route.ts          # Backend middleware demo
│   └── products/route.ts       # Rate limiting + caching
├── blog/
│   └── [slug]/page.tsx         # Dynamic SEO
├── products/
│   └── page.tsx                # Product catalog
├── layout.tsx                  # Root layout with global SEO
└── page.tsx                    # Homepage with JsonLd

components/
├── ProductCard.tsx             # Reusable product card
└── Navigation.tsx              # Smart navigation

lib/
└── seo.ts                      # SEO configuration
```

## ✨ Features Demonstrated

### SEO

- ✅ Global SEO configuration
- ✅ Dynamic meta tags per page
- ✅ JSON-LD structured data
- ✅ App Router metadata generation

### Routing

- ✅ Smart prefetching
- ✅ Route observation
- ✅ Optimized navigation

### Performance

- ✅ Image optimization
- ✅ Code splitting
- ✅ Cache headers
- ✅ Security headers

### Backend

- ✅ API middleware composition
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Request validation
- ✅ Response caching
- ✅ Error handling

### Analytics

- ✅ Web Vitals tracking
- ✅ Performance monitoring

## 📖 Key Files to Review

### 1. Root Layout (`app/layout.tsx`)

Global SEO, analytics, and route observation setup.

### 2. Homepage (`app/page.tsx`)

MetaManager usage with JsonLd structured data.

### 3. API Routes (`app/api/*/route.ts`)

Backend middleware composition and optimization.

### 4. Components (`components/`)

Reusable components with rkk-next features.

### 5. Blog Page (`app/blog/[slug]/page.tsx`)

Dynamic SEO metadata for blog posts.

## 🎯 Learning Path

1. **Start with `app/layout.tsx`** - See global configuration
2. **Check `app/page.tsx`** - Homepage implementation
3. **Explore `app/api/users/route.ts`** - Backend utilities
4. **Review `components/ProductCard.tsx`** - Component patterns
5. **Read `app/blog/[slug]/page.tsx`** - Dynamic pages

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Next.js Config

See `next.config.js` for:

- Cache headers
- Security headers
- Image optimization

## 📚 Documentation

- [rkk-next README](../../README.md)
- [Backend Utilities](../../docs/BACKEND.md)
- [Project Structure](../../docs/PROJECT_STRUCTURE.md)

## 🤝 Need Help?

- [Report Issues](https://github.com/ROHIT8759/rkk-next/issues)
- [View Source](https://github.com/ROHIT8759/rkk-next)

## 📄 License

MIT
