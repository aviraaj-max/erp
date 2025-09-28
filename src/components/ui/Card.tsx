import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl shadow-sm',
        {
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700': variant === 'default',
          'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20': variant === 'glass',
          'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900': variant === 'gradient',
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-6 py-4', className)}>
      {children}
    </div>
  );
}