const { LONG_TERM_CACHE, EDGE_CACHE, NO_CACHE, SECURITY_HEADERS, applyCache } = require('rkk-next/dist/performance/cacheHeaders');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'via.placeholder.com'],
    },
    async headers() {
        return [
            // Static assets: aggressive caching
            applyCache('/_next/static/:path*', LONG_TERM_CACHE),
            applyCache('/images/:path*', LONG_TERM_CACHE),

            // API routes: edge caching
            applyCache('/api/products/:path*', EDGE_CACHE),

            // User-specific pages: no cache
            applyCache('/dashboard/:path*', NO_CACHE),

            // Security headers for all routes
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    }
                ],
            },
        ];
    },
};

module.exports = nextConfig;
