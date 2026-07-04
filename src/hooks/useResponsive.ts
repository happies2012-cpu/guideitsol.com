'use client';

import { useEffect, useState } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointConfig {
  xs: number;  // 320px
  sm: number;  // 640px
  md: number;  // 768px
  lg: number;  // 1024px
  xl: number;  // 1280px
  '2xl': number; // 1536px
}

const breakpoints: BreakpointConfig = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < breakpoints.md);
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
      setIsDesktop(width >= breakpoints.lg);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAbove = (breakpoint: Breakpoint) => screenWidth >= breakpoints[breakpoint];
  const isBelow = (breakpoint: Breakpoint) => screenWidth < breakpoints[breakpoint];
  const isBetween = (min: Breakpoint, max: Breakpoint) =>
    screenWidth >= breakpoints[min] && screenWidth < breakpoints[max];

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    isAbove,
    isBelow,
    isBetween,
  };
};

export default useResponsive;
