const {
  LONG_TERM_CACHE,
  SHORT_TERM_CACHE,
  NO_CACHE,
  EDGE_CACHE,
  applyCache,
} = require("next-optimize-sdk/performance/cacheHeaders");

module.exports = {
  async headers() {
    return [
      applyCache("/_next/static/:path*", LONG_TERM_CACHE),
      applyCache("/images/:path*", LONG_TERM_CACHE),
      applyCache("/api/public/:path*", EDGE_CACHE),
      applyCache("/dashboard/:path*", NO_CACHE),
      applyCache("/blog/:path*", SHORT_TERM_CACHE),
    ];
  },
};
