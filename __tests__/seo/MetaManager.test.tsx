import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetaManager } from '../../src/seo/MetaManager';

describe('MetaManager', () => {
    it('should render title', () => {
        const { container } = render(
            <MetaManager
                title="Test Title"
                description="Test description"
            />
        );

        const title = container.querySelector('title');
        expect(title?.textContent).toBe('Test Title');
    });

    it('should render meta description', () => {
        const { container } = render(
            <MetaManager
                title="Test"
                description="Test description for SEO"
            />
        );

        const metaDesc = container.querySelector('meta[name="description"]');
        expect(metaDesc?.getAttribute('content')).toBe('Test description for SEO');
    });

    it('should render keywords when provided', () => {
        const { container } = render(
            <MetaManager
                title="Test"
                description="Test"
                keywords="next,seo,react"
            />
        );

        const metaKeywords = container.querySelector('meta[name="keywords"]');
        expect(metaKeywords?.getAttribute('content')).toBe('next,seo,react');
    });

    it('should render OpenGraph tags', () => {
        const { container } = render(
            <MetaManager
                title="Test Page"
                description="Test description"
                image="/og-image.png"
                type="article"
            />
        );

        const ogTitle = container.querySelector('meta[property="og:title"]');
        const ogDesc = container.querySelector('meta[property="og:description"]');
        const ogType = container.querySelector('meta[property="og:type"]');
        const ogImage = container.querySelector('meta[property="og:image"]');

        expect(ogTitle?.getAttribute('content')).toBe('Test Page');
        expect(ogDesc?.getAttribute('content')).toBe('Test description');
        expect(ogType?.getAttribute('content')).toBe('article');
        expect(ogImage?.getAttribute('content')).toBe('/og-image.png');
    });

    it('should render Twitter Card tags', () => {
        const { container } = render(
            <MetaManager
                title="Test"
                description="Test"
                twitterHandle="testuser"
            />
        );

        const twitterCard = container.querySelector('meta[name="twitter:card"]');
        const twitterSite = container.querySelector('meta[name="twitter:site"]');

        expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
        expect(twitterSite?.getAttribute('content')).toBe('@testuser');
    });

    it('should set noindex when specified', () => {
        const { container } = render(
            <MetaManager
                title="Test"
                description="Test"
                noIndex={true}
            />
        );

        const robots = container.querySelector('meta[name="robots"]');
        expect(robots?.getAttribute('content')).toBe('noindex, nofollow');
    });

    it('should allow indexing by default', () => {
        const { container } = render(
            <MetaManager
                title="Test"
                description="Test"
            />
        );

        const robots = container.querySelector('meta[name="robots"]');
        expect(robots?.getAttribute('content')).toBe('index, follow');
    });
});

