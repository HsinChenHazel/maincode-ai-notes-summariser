import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Button Variants using CVA
 * Based on Figma design system
 * 
 * Variants:
 * - primary: Filled blue button
 * - secondary: Outlined button
 * - ghost: Transparent button
 * 
 * States handled by HTML disabled attribute and CSS
 */
export const buttonVariants = cva(
  // Base styles (always applied)
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'font-medium',
    'rounded-button',           // 8px border radius (from tokens: borderRadius.button)
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary-light',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      // ===== VARIANT (Visual Style) =====
      variant: {
        primary: [
          'bg-primary',
          'text-text-onPrimary',
          'hover:bg-primary-hover',
          'active:bg-primary-active',
          'disabled:bg-interactive-disabled-bg',
          'disabled:text-text-onPrimary/80',
        ],
        secondary: [
          // Default state - bg-[#f9fcff] from Figma
          'bg-secondary-bg',
          'text-primary',
          'border',
          'border-primary',
          // Hover state - bg-[#ecf4fe] from Figma
          'hover:bg-secondary-hover',
          'hover:border-primary',
          // Active/onClick state - bg-[#f9fcff] (same as default), border/text change to active
          'active:bg-secondary-bg',
          'active:border-primary-active',
          'active:text-primary-active',
          // Disabled state
          'disabled:bg-background-primary',
          'disabled:border-interactive-disabled-border',
          'disabled:text-interactive-disabled-text',
        ],
        ghost: [
          'bg-transparent',
          'text-text-primary',
          'hover:bg-secondary-light',
          'active:bg-secondary',
        ],
        sidebarAdd: [
        // layout
        'flex',
        'w-full',
        'h-auto',
        'items-center',
        'justify-center',
        'gap-3',
    
        // shape
        'rounded-full',     
        'md:rounded-[100px]', 
    
        // spacing
        'p-3',
        'md:p-4',
    
        // colors（enabled）
        'bg-background-primary',
        'text-primary-active',
        'shadow-sm',
        'hover:bg-secondary-lighter',
        'active:bg-secondary-active',
        'md:shadow',
    
        // disabled
        'disabled:bg-interactive-disabled-bg',
        'disabled:text-interactive-disabled-text',
        'disabled:shadow-none',
        ],
    
        /**
         * sidebarNav =  Home / Summary History
         */
        sidebarNav: [
        'flex items-center justify-center',
        'rounded-full',
        'transition',
        'h-11 w-11 md:h-10 md:w-10',
        'text-sidebar-icon-default',
        'hover:bg-secondary-light',
        ], 
      },
      

      // ===== SIZE =====
      size: {
        sm: ['px-3', 'py-1.5', 'text-sm', 'h-8'],
        md: ['px-4', 'py-2', 'text-base', 'h-10'],
        lg: ['px-6', 'py-3', 'text-lg', 'h-12'],
      },

      // ===== ICON ONLY =====
      iconOnly: {
        true: ['p-0'],
        false: [],
      },
    },

    // ===== COMPOUND VARIANTS =====
    // Special rules when multiple variants are combined
    compoundVariants: [
      // Icon-only buttons are square
      {
        iconOnly: true,
        size: 'sm',
        className: 'w-8 h-8',
      },
      {
        iconOnly: true,
        size: 'md',
        className: 'w-10 h-10',
      },
      {
        iconOnly: true,
        size: 'lg',
        className: 'w-12 h-12',
      },
    ],

    // ===== DEFAULT VARIANTS =====
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  }
);

// ===== BUTTON PROPS =====
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Position of icon relative to text */
  iconPosition?: 'left' | 'right';
  /** Loading state (shows spinner, disables button) */
  loading?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

// ===== BUTTON COMPONENT =====
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      iconOnly,
      icon,
      iconPosition = 'left',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine if button is icon-only
    const isIconOnly = iconOnly ?? (!children && !!icon);

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
            iconOnly: isIconOnly,
          }),
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon (Left) */}
        {icon && iconPosition === 'left' && !loading && icon}

        {/* Button Text */}
        {children}

        {/* Icon (Right) */}
        {icon && iconPosition === 'right' && !loading && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';
