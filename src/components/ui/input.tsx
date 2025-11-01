import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 py-2 bg-white border rounded-xl transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'placeholder:text-neutral-400',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
