import { prefetchRoute, prefetchRoutes, isFastConnection } from '../../src/routing/prefetch';
import Router from 'next/router';

jest.mock('next/router');

describe('Prefetch Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('prefetchRoute', () => {
    it('should call Router.prefetch with route', (done) => {
      prefetchRoute('/dashboard', { delay: 0 });
      
      setTimeout(() => {
        expect(Router.prefetch).toHaveBeenCalledWith('/dashboard');
        done();
      }, 10);
    });

    it('should not prefetch when disabled', (done) => {
      prefetchRoute('/test', { enabled: false, delay: 0 });
      
      setTimeout(() => {
        expect(Router.prefetch).not.toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should respect delay option', (done) => {
      const start = Date.now();
      prefetchRoute('/test', { delay: 100 });
      
      setTimeout(() => {
        const elapsed = Date.now() - start;
        expect(elapsed).toBeGreaterThanOrEqual(100);
        expect(Router.prefetch).toHaveBeenCalled();
        done();
      }, 150);
    });

    it('should respect condition function', (done) => {
      const condition = jest.fn(() => false);
      prefetchRoute('/test', { condition, delay: 0 });
      
      setTimeout(() => {
        expect(condition).toHaveBeenCalled();
        expect(Router.prefetch).not.toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe('prefetchRoutes', () => {
    it('should prefetch multiple routes', (done) => {
      const routes = ['/page1', '/page2', '/page3'];
      prefetchRoutes(routes, { delay: 0 });
      
      setTimeout(() => {
        expect(Router.prefetch).toHaveBeenCalledTimes(3);
        expect(Router.prefetch).toHaveBeenCalledWith('/page1');
        expect(Router.prefetch).toHaveBeenCalledWith('/page2');
        expect(Router.prefetch).toHaveBeenCalledWith('/page3');
        done();
      }, 50);
    });
  });

  describe('isFastConnection', () => {
    it('should return true when no connection API available', () => {
      expect(isFastConnection()).toBe(true);
    });

    it('should return true for fast connections', () => {
      (global.navigator as any).connection = {
        effectiveType: '4g',
      };
      
      expect(isFastConnection()).toBe(true);
    });

    it('should return false for slow connections', () => {
      (global.navigator as any).connection = {
        effectiveType: '2g',
      };
      
      expect(isFastConnection()).toBe(false);
    });
  });
});

