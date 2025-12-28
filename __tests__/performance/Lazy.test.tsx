import React from 'react';
import { lazyImport } from '../../src/performance/Lazy';

describe('Lazy Import', () => {
    it('should create a lazy component', () => {
        const TestComponent = () => <div>Lazy Loaded Content</div>;

        const LazyComponent = lazyImport(() => Promise.resolve({ default: TestComponent }), {
            ssr: false,
        });

        expect(LazyComponent).toBeTruthy();
    });

    it('should handle options', () => {
        const TestComponent = () => <div>Content</div>;
        const LoadingComponent = () => <div>Loading...</div>;

        const LazyComponent = lazyImport(
            () => Promise.resolve({ default: TestComponent }),
            {
                loading: LoadingComponent,
                ssr: true,
                delay: 200,
            }
        );

        expect(LazyComponent).toBeTruthy();
    });

    it('should create component without options', () => {
        const TestComponent = () => <div>No Options Content</div>;

        const LazyComponent = lazyImport(
            () => Promise.resolve({ default: TestComponent })
        );

        expect(LazyComponent).toBeTruthy();
    });

    it('should disable SSR when specified', () => {
        const TestComponent = () => <div>SSR False Content</div>;

        const LazyComponent = lazyImport(
            () => Promise.resolve({ default: TestComponent }),
            { ssr: false }
        );

        expect(LazyComponent).toBeTruthy();
    });
});

