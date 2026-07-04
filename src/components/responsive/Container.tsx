'use client';

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  noPadding?: boolean;
}

const sizeMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

/**
 * Responsive container with max-width constraints
 * Automatically adds padding on small screens
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  noPadding = false,
}) => {
  return (
    <div
      className={`${sizeMap[size]} ${!noPadding ? 'px-4 sm:px-6 lg:px-8' : ''} mx-auto w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
