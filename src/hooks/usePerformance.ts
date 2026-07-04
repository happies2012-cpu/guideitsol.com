'use client';

import { useEffect, useCallback, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
}

/**
 * Monitor Core Web Vitals and performance metrics
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Observe Web Vitals using PerformanceObserver
    try {
      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          setMetrics((prev) => ({ ...prev, fcp: Math.round(entry.startTime) }));
        }
      });

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({ ...prev, lcp: Math.round(lastEntry.renderTime || lastEntry.loadTime) }));
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        return () => lcpObserver.disconnect();
      }
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }
  }, []);

  return metrics;
};

/**
 * Debounce function for optimizing event handlers
 */
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutId(newTimeoutId);
    },
    [callback, delay, timeoutId]
  );

  return debouncedCallback;
};

/**
 * Throttle function for optimizing scroll/resize handlers
 */
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const [lastRun, setLastRun] = useState<number>(Date.now());

  const throttledCallback = useCallback(
    (...args: T) => {
      const now = Date.now();
      if (now - lastRun >= delay) {
        callback(...args);
        setLastRun(now);
      }
    },
    [callback, delay, lastRun]
  );

  return throttledCallback;
};

/**
 * Lazy load images for better performance
 */
export const useLazyLoadImage = (ref: React.RefObject<HTMLImageElement>) => {
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      return;
    }

    const imageElement = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imageElement);

    return () => observer.disconnect();
  }, [ref]);
};

export default usePerformance;
