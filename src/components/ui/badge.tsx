import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 text-neutral-700',
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
