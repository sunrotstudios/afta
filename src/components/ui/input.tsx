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
          'w-full px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-0 focus:border-transparent',
          'placeholder:text-charcoal-400',
          error
            ? 'border-red-300 focus:ring-red-500'
            : 'border-charcoal-200 hover:border-charcoal-300',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-charcoal-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
