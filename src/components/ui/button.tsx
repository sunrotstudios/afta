import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-100 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed border-2';

    const variants = {
      primary: 'bg-black text-white border-black hover:bg-gray-900 active:translate-x-0.5 active:translate-y-0.5',
      secondary: 'bg-white text-black border-black hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5',
      ghost: 'bg-transparent text-black border-transparent hover:border-black',
      outline: 'bg-white text-black border-black hover:bg-black hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="mr-2">→</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
