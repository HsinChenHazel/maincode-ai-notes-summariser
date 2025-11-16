// frontend/src/components/ui/Textarea.tsx
import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const textareaVariants = cva(
  [
    'w-full',
    'flex-1',
    'resize-none',
    'overflow-y-auto',
    'rounded-xl',
    'border',
    'border-transparent',
    'px-4',
    'py-3',
    'text-base',
    'bg-background-primary',
    'text-text-primary',
    'placeholder:text-text-tertiary',
    'outline-none',
    'transition',
    'focus:border-primary',
    'focus:ring-2',
    'focus:ring-secondary-light',
    'disabled:cursor-not-allowed',
    'disabled:bg-background-tertiary',
    'disabled:text-text-disabled',
  ],
  {
    variants: {
      variant: {
        default: [],
        error: [
          'border-error',
          'focus:border-error',
          'focus:ring-error-light',
        ],
      },
      size: {
        sm: ['min-h-[80px]', 'text-sm', 'py-2'],
        md: ['min-h-[140px]'],
        lg: ['min-h-[200px]'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TextareaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      'size' | 'onChange'
    >,
    VariantProps<typeof textareaVariants> {
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
  label?: string;
  /** label only for screen readers（same as sr-only） */
  srOnlyLabel?: boolean;
  onChange?: (value: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      helperText,
      wrapperClassName,
      className,
      label,
      srOnlyLabel,
      id,
      variant,
      size,
      onChange,
      ...props
    },
    ref
  ) => {
    const effectiveVariant = error ? 'error' : variant ?? 'default';

    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = error ? errorId : helperId;

    return (
      <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-text-secondary',
              srOnlyLabel && 'sr-only'
            )}
          >
            {label}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          className={cn(
            textareaVariants({
              variant: effectiveVariant,
              size,
            }),
            className
          )}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />

        {error ? (
          <p id={errorId} className="mt-1 text-xs text-error">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1 text-xs text-text-tertiary">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
