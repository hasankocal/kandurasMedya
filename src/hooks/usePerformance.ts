import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

export const usePerformance = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  useEffect(() => {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      metricsRef.current.lcp = lastEntry.startTime;
      
      console.log('LCP:', lastEntry.startTime);
    });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        metricsRef.current.fid = entry.processingStart - entry.startTime;
        console.log('FID:', metricsRef.current.fid);
      });
    });

    // CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries() as any[];
      
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      metricsRef.current.cls = clsValue;
      console.log('CLS:', clsValue);
    });

    // FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0];
      metricsRef.current.fcp = firstEntry.startTime;
      console.log('FCP:', firstEntry.startTime);
    });

    // TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metricsRef.current.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      console.log('TTFB:', metricsRef.current.ttfb);
    }

    // Observer'ları başlat
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  const getMetrics = () => metricsRef.current;

  const logMetrics = () => {
    const metrics = getMetrics();
    console.group('Core Web Vitals');
    console.log('LCP:', metrics.lcp, 'ms');
    console.log('FID:', metrics.fid, 'ms');
    console.log('CLS:', metrics.cls);
    console.log('FCP:', metrics.fcp, 'ms');
    console.log('TTFB:', metrics.ttfb, 'ms');
    console.groupEnd();
  };

  return { getMetrics, logMetrics };
};

export default usePerformance; 