import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'solid';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-black border-2 border-black',
      outline: 'bg-white text-black border-2 border-black',
      solid: 'bg-black text-white border-2 border-black',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 text-xs font-bold uppercase tracking-wide',
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
