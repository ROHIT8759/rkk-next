import { reportWebVitals } from '../../src/analytics/webVitals';

describe('webVitals', () => {
  describe('reportWebVitals', () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it('should log metric name and value', () => {
      const metric = {
        name: 'CLS' as any,
        value: 0.05,
        id: 'test-id',
        startTime: 0,
        label: 'web-vital' as const,
      };

      reportWebVitals(metric);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('[Vitals]', 'CLS', 0.05);
    });

    it('should log FID metric', () => {
      const metric = {
        name: 'FID' as any,
        value: 50,
        id: 'test-id',
        startTime: 100,
        label: 'web-vital' as const,
      };

      reportWebVitals(metric);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('[Vitals]', 'FID', 50);
    });

    it('should log LCP metric', () => {
      const metric = {
        name: 'LCP' as any,
        value: 2000,
        id: 'test-id',
        startTime: 0,
        label: 'web-vital' as const,
      };

      reportWebVitals(metric);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('[Vitals]', 'LCP', 2000);
    });
  });
});

