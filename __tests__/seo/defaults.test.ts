import {
  SEO_DEFAULTS,
  getSeoTitle,
  getCanonicalUrl,
  mergeSeoDefaults,
} from '../../src/seo/defaults';

describe('SEO Defaults', () => {
  describe('SEO_DEFAULTS', () => {
    it('should have all required properties', () => {
      expect(SEO_DEFAULTS).toHaveProperty('siteName');
      expect(SEO_DEFAULTS).toHaveProperty('titleTemplate');
      expect(SEO_DEFAULTS).toHaveProperty('defaultTitle');
      expect(SEO_DEFAULTS).toHaveProperty('defaultDescription');
      expect(SEO_DEFAULTS).toHaveProperty('siteUrl');
    });
  });

  describe('getSeoTitle', () => {
    it('should format title with template', () => {
      const title = getSeoTitle('Home', '%s | My Site');
      expect(title).toBe('Home | My Site');
    });

    it('should return default title when no title provided', () => {
      const title = getSeoTitle();
      expect(title).toBe(SEO_DEFAULTS.defaultTitle);
    });

    it('should use default template when not specified', () => {
      const title = getSeoTitle('About');
      expect(title).toContain('About');
    });
  });

  describe('getCanonicalUrl', () => {
    it('should generate canonical URL from path', () => {
      const url = getCanonicalUrl('/blog/post-1');
      expect(url).toBe(`${SEO_DEFAULTS.siteUrl}/blog/post-1`);
    });

    it('should handle paths without leading slash', () => {
      const url = getCanonicalUrl('about');
      expect(url).toBe(`${SEO_DEFAULTS.siteUrl}/about`);
    });

    it('should handle root path', () => {
      const url = getCanonicalUrl('/');
      expect(url).toBe(`${SEO_DEFAULTS.siteUrl}/`);
    });
  });

  describe('mergeSeoDefaults', () => {
    it('should merge custom config with defaults', () => {
      const custom = {
        siteName: 'Custom Site',
        siteUrl: 'https://custom.com',
      };

      const merged = mergeSeoDefaults(custom);
      
      expect(merged.siteName).toBe('Custom Site');
      expect(merged.siteUrl).toBe('https://custom.com');
      expect(merged.defaultTitle).toBe(SEO_DEFAULTS.defaultTitle);
    });

    it('should return defaults when no overrides provided', () => {
      const merged = mergeSeoDefaults();
      expect(merged).toEqual(SEO_DEFAULTS);
    });
  });
});

