import * as React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'borderless';
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-card border bg-background-primary p-5 shadow',
        'border-border-DEFAULT',
        'transition-all duration-[600ms] ease-out',
        variant === 'subtle' && 'shadow-sm',
        variant === 'borderless' && 'border-none shadow-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
