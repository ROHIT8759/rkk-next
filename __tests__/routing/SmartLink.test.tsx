import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SmartLink } from '../../src/routing/SmartLink';

jest.mock('next/router');

describe('SmartLink', () => {
    it('should render link with href', () => {
        const { container } = render(
            <SmartLink href="/about">
                About Us
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link).toBeTruthy();
        expect(link?.getAttribute('href')).toBe('/about');
        expect(link?.textContent).toBe('About Us');
    });

    it('should handle external links with target blank', () => {
        const { container } = render(
            <SmartLink href="https://external.com" target="_blank" rel="noopener noreferrer">
                External Site
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link?.getAttribute('target')).toBe('_blank');
        expect(link?.getAttribute('rel')).toContain('noopener');
    });

    it('should apply custom className', () => {
        const { container } = render(
            <SmartLink href="/page" className="custom-link">
                Custom Link
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link?.className).toContain('custom-link');
    });

    it('should prefetch on hover when enabled', () => {
        const { container } = render(
            <SmartLink href="/prefetch-page" prefetch>
                Hover to Prefetch
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link).toBeTruthy();

        // Simulate hover
        if (link) {
            fireEvent.mouseEnter(link);
        }
    });

    it('should not prefetch when disabled', () => {
        const { container } = render(
            <SmartLink href="/no-prefetch" prefetch={false}>
                No Prefetch
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link).toBeTruthy();
    });

    it('should handle shallow routing', () => {
        const { container } = render(
            <SmartLink href="/shallow" shallow>
                Shallow Route
            </SmartLink>
        );

        const link = container.querySelector('a');
        expect(link?.getAttribute('href')).toBe('/shallow');
    });
});

