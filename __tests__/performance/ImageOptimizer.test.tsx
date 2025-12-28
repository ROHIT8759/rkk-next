import React from 'react';
import { render } from '@testing-library/react';
import { OptimizedImage } from '../../src/performance/ImageOptimizer';

describe('OptimizedImage', () => {
    it('should render with basic props', () => {
        const { container } = render(
            <OptimizedImage
                src="/test-image.jpg"
                alt="Test Image"
                width={800}
                height={600}
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.getAttribute('alt')).toBe('Test Image');
    });

    it('should apply priority loading', () => {
        const { container } = render(
            <OptimizedImage
                src="/hero.jpg"
                alt="Hero"
                width={1200}
                height={800}
                priority
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeTruthy();
    });

    it('should use placeholder blur', () => {
        const { container } = render(
            <OptimizedImage
                src="/product.jpg"
                alt="Product"
                width={400}
                height={400}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg"
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeTruthy();
    });

    it('should handle responsive sizes', () => {
        const { container } = render(
            <OptimizedImage
                src="/responsive.jpg"
                alt="Responsive"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeTruthy();
    });

    it('should apply custom className', () => {
        const { container } = render(
            <OptimizedImage
                src="/styled.jpg"
                alt="Styled"
                width={600}
                height={400}
                className="custom-image-class"
            />
        );

        const img = container.querySelector('img');
        expect(img?.className).toContain('custom-image-class');
    });
});

