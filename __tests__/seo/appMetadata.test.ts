import { generateAppMetadata } from '../../src/seo/appMetadata';

describe('appMetadata', () => {
  describe('generateAppMetadata', () => {
    it('should generate basic metadata', () => {
      const metadata = generateAppMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(metadata.title).toBe('Test Page');
      expect(metadata.description).toBe('Test description');
    });

    it('should include OpenGraph metadata', () => {
      const metadata = generateAppMetadata({
        title: 'OG Test',
        description: 'OG Description',
        image: '/og-image.png',
      });

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('OG Test');
      expect(metadata.openGraph?.description).toBe('OG Description');
      expect(metadata.openGraph?.images).toContain('/og-image.png');
    });

    it('should use defaults when no values provided', () => {
      const metadata = generateAppMetadata({});

      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
    });

    it('should handle image in OpenGraph', () => {
      const metadata = generateAppMetadata({
        title: 'Image Test',
        description: 'Description',
        image: '/test-image.jpg',
      });

      expect(metadata.openGraph.images).toEqual(['/test-image.jpg']);
    });
  });
});

