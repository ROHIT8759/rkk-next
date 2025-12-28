import { observeRoutes, RouteChangeEvent } from '../../src/routing/RouteObserver';
import Router from 'next/router';

jest.mock('next/router');

describe('RouteObserver', () => {
    let mockCallback: jest.Mock;

    beforeEach(() => {
        mockCallback = jest.fn();
        jest.clearAllMocks();
    });

    it('should subscribe to router events', () => {
        const unsubscribe = observeRoutes(mockCallback);

        expect(Router.events.on).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
        expect(Router.events.on).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));

        if (unsubscribe) {
            unsubscribe();
        }
    });

    it('should track route changes', () => {
        observeRoutes(mockCallback);

        // Get the callbacks registered with Router.events.on
        const calls = (Router.events.on as jest.Mock).mock.calls;
        const routeChangeStart = calls.find(call => call[0] === 'routeChangeStart')?.[1];
        const routeChangeComplete = calls.find(call => call[0] === 'routeChangeComplete')?.[1];

        // Simulate route change
        if (routeChangeStart) {
            routeChangeStart('/new-route');
        }

        if (routeChangeComplete) {
            routeChangeComplete('/new-route');
        }

        expect(mockCallback).toHaveBeenCalled();
    });

    it('should return an unsubscribe function', () => {
        const unsubscribe = observeRoutes(mockCallback);

        expect(typeof unsubscribe).toBe('function');

        if (unsubscribe) {
            unsubscribe();
        }

        expect(Router.events.off).toHaveBeenCalled();
    });
});

