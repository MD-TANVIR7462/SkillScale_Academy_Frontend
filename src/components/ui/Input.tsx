import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  helperText,
  className,
  ...props
}, ref) => {
  const inputClasses = cn(
    'w-full px-4 py-3 border rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    'placeholder-gray-400',
    error 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-300 hover:border-gray-400 focus:border-blue-500',
    icon && 'pl-10',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;