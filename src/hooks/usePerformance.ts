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

  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    // TTFB (Time to First Byte) - Her zaman mevcut
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metricsRef.current.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      if (isDevelopment) {
        console.log('TTFB:', navigationEntry.responseStart - navigationEntry.requestStart);
      }
    }

    // Performance Observer'ları sadece destekleniyorsa başlat
    const startObservers = () => {
      try {
        // LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
              const lastEntry = entries[entries.length - 1] as PerformanceEntry;
              metricsRef.current.lcp = lastEntry.startTime;
              if (isDevelopment) {
                console.log('LCP:', lastEntry.startTime);
              }
            }
          });

          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                metricsRef.current.fid = entry.processingStart - entry.startTime;
                if (isDevelopment) {
                  console.log('FID:', metricsRef.current.fid);
                }
              }
            });
          });

          fidObserver.observe({ entryTypes: ['first-input'] });

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
            if (isDevelopment) {
              console.log('CLS:', clsValue);
            }
          });

          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // FCP (First Contentful Paint) - Fallback ile
          try {
            const fcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              if (entries.length > 0) {
                const firstEntry = entries[0];
                metricsRef.current.fcp = firstEntry.startTime;
                if (isDevelopment) {
                  console.log('FCP:', firstEntry.startTime);
                }
              }
            });

            fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });
          } catch (fcpError) {
            if (isDevelopment) {
              console.log('FCP observer not supported, using paint timing API');
            }
            // Fallback: Paint timing API kullan
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              metricsRef.current.fcp = fcpEntry.startTime;
              if (isDevelopment) {
                console.log('FCP (fallback):', fcpEntry.startTime);
              }
            }
          }

          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
          };
        }
      } catch (error) {
        if (isDevelopment) {
          console.warn('Performance Observer not supported:', error);
        }
      }
    };

    // Sayfa yüklendikten sonra observer'ları başlat
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startObservers);
      return () => document.removeEventListener('DOMContentLoaded', startObservers);
    } else {
      return startObservers();
    }
  }, [isDevelopment]);

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