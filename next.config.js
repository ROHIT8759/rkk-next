// Example next.config.js using rkk-next
const {
    LONG_TERM_CACHE,
    SHORT_TERM_CACHE,
    NO_CACHE,
    EDGE_CACHE,
    applyCache,
} = require("./performance/cacheHeaders");

const { SECURITY_HEADERS } = require("./performance/securityHeaders");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    async headers() {
        return [
            // Static assets - long-term caching
            applyCache("/_next/static/:path*", LONG_TERM_CACHE),
            applyCache("/images/:path*", LONG_TERM_CACHE),
            applyCache("/fonts/:path*", LONG_TERM_CACHE),

            // Public API - edge caching
            applyCache("/api/public/:path*", EDGE_CACHE),

            // Blog posts - short-term caching with ISR
            applyCache("/blog/:path*", SHORT_TERM_CACHE),

            // Dashboard - no caching
            applyCache("/dashboard/:path*", NO_CACHE),
            applyCache("/api/user/:path*", NO_CACHE),

            // Security headers for all routes
            {
                source: "/:path*",
                headers: SECURITY_HEADERS,
            },
        ];
    },
};
