/**
 * Typography Design Tokens
 * 
 * Font families, sizes, weights, and line heights
 * Based on your Figma design system
 */

export const typography = {
  // ===== FONT FAMILIES =====
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    serif: ['Inria Serif', 'Georgia', 'serif'],
    mono: ['Monaco', 'Courier New', 'monospace'],
  },

  // ===== FONT SIZES =====
  // Matches Tailwind scale for consistency
  fontSize: {
    xs: '0.75rem',      // 12px - small labels, captions
    sm: '0.875rem',     // 14px - small text, secondary
    base: '1rem',       // 16px - body text, buttons (your default)
    lg: '1.125rem',     // 18px - subtitle (from Figma)
    xl: '1.25rem',      // 20px - large text
    '2xl': '1.5rem',    // 24px - section headers
    '3xl': '2rem',      // 32px - page title (from Figma)
    '4xl': '2.5rem',    // 40px - hero text
  },

  // ===== FONT WEIGHTS =====
  fontWeight: {
    light: '300',
    normal: '400',      // Regular (your default from Figma)
    medium: '500',      // Medium (section headers from Figma)
    semibold: '600',
    bold: '700',
  },

  // ===== LINE HEIGHTS =====
  lineHeight: {
    tight: '1.25',      // 125% - headings
    snug: '1.375',      // 137.5% - tight body
    normal: '1.5',      // 150% - body text
    relaxed: '1.6',     // 160% - your default from Figma
    loose: '1.75',      // 175% - loose paragraphs
  },

  // ===== LETTER SPACING =====
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Export type
export type Typography = typeof typography;