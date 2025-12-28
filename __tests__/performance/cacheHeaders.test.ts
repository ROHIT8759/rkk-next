import {
  LONG_TERM_CACHE,
  SHORT_TERM_CACHE,
  NO_CACHE,
  EDGE_CACHE,
  applyCache,
} from '../../src/performance/cacheHeaders';

describe('Cache Headers', () => {
  describe('LONG_TERM_CACHE', () => {
    it('should have correct cache control header', () => {
      const header = LONG_TERM_CACHE.find(h => h.key === 'Cache-Control');
      expect(header?.value).toContain('max-age=31536000');
      expect(header?.value).toContain('immutable');
    });
  });

  describe('SHORT_TERM_CACHE', () => {
    it('should have stale-while-revalidate', () => {
      const header = SHORT_TERM_CACHE.find(h => h.key === 'Cache-Control');
      expect(header?.value).toContain('stale-while-revalidate');
    });
  });

  describe('NO_CACHE', () => {
    it('should have no-store directive', () => {
      const header = NO_CACHE.find(h => h.key === 'Cache-Control');
      expect(header?.value).toContain('no-store');
    });

    it('should include Pragma and Expires headers', () => {
      expect(NO_CACHE).toContainEqual({ key: 'Pragma', value: 'no-cache' });
      expect(NO_CACHE).toContainEqual({ key: 'Expires', value: '0' });
    });
  });

  describe('EDGE_CACHE', () => {
    it('should have s-maxage for CDN', () => {
      const header = EDGE_CACHE.find(h => h.key === 'Cache-Control');
      expect(header?.value).toContain('s-maxage');
    });
  });

  describe('applyCache', () => {
    it('should create header object with source and headers', () => {
      const result = applyCache('/static/:path*', LONG_TERM_CACHE);
      
      expect(result).toHaveProperty('source', '/static/:path*');
      expect(result).toHaveProperty('headers');
      expect(result.headers).toEqual(LONG_TERM_CACHE);
    });
  });
});

