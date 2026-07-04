'use client';

import React, { ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: string;
  className?: string;
}

/**
 * Responsive grid that adapts to screen size
 * Default: 1 col on mobile, 2 on tablet, 3 on desktop
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  gap = '4',
  className = '',
}) => {
  const { isBetween, isAbove } = useResponsive();

  let columnCount = cols.xs || 1;
  
  if (isAbove('2xl')) {
    columnCount = cols['2xl'] || cols.xl || 4;
  } else if (isAbove('xl')) {
    columnCount = cols.xl || 4;
  } else if (isAbove('lg')) {
    columnCount = cols.lg || 3;
  } else if (isAbove('md')) {
    columnCount = cols.md || 2;
  } else if (isAbove('sm')) {
    columnCount = cols.sm || 1;
  }

  return (
    <div
      className={`grid gap-${gap} grid-cols-${columnCount} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gap: `${parseInt(gap) * 0.25}rem`,
      }}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
