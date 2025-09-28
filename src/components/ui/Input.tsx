import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ 
  label, 
  error, 
  icon, 
  className, 
  id, 
  ...props 
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={clsx(
            'block w-full rounded-lg border-gray-300 shadow-sm',
            'focus:border-blue-500 focus:ring-blue-500',
            'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
            'dark:focus:border-blue-400 dark:focus:ring-blue-400',
            'transition-colors duration-200',
            {
              'pl-10': icon,
              'border-red-500 focus:border-red-500 focus:ring-red-500': error,
            },
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}