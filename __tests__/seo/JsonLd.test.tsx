import React from 'react';
import { render } from '@testing-library/react';
import { JsonLd } from '../../src/seo/JsonLd';

describe('JsonLd', () => {
    it('should render JSON-LD script with WebSite type', () => {
        const data = {
            name: 'My Website',
            url: 'https://example.com',
        };

        const { container } = render(
            <JsonLd type="WebSite" data={data} />
        );

        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).toBeTruthy();

        const jsonData = JSON.parse(script?.textContent || '{}');
        expect(jsonData['@context']).toBe('https://schema.org');
        expect(jsonData['@type']).toBe('WebSite');
        expect(jsonData.name).toBe('My Website');
        expect(jsonData.url).toBe('https://example.com');
    });

    it('should render JSON-LD script with Article type', () => {
        const data = {
            headline: 'Test Article',
            datePublished: '2025-01-01',
            author: {
                '@type': 'Person',
                name: 'John Doe',
            },
        };

        const { container } = render(
            <JsonLd type="Article" data={data} />
        );

        const script = container.querySelector('script[type="application/ld+json"]');
        const jsonData = JSON.parse(script?.textContent || '{}');

        expect(jsonData['@type']).toBe('Article');
        expect(jsonData.headline).toBe('Test Article');
        expect(jsonData.author.name).toBe('John Doe');
    });

    it('should handle custom id prop', () => {
        const { container } = render(
            <JsonLd
                type="WebSite"
                data={{ name: 'Test' }}
                id="custom-schema"
            />
        );

        const script = container.querySelector('script#custom-schema');
        expect(script).toBeTruthy();
    });

    it('should return null when data is not provided', () => {
        const { container } = render(
            <JsonLd type="WebSite" data={null as any} />
        );

        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).toBeNull();
    });
});

