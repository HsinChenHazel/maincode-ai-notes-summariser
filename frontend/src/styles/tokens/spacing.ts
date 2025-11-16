/**
 * Spacing & Border Radius Design Tokens
 * 
 * Spacing follows 4px base unit (0.25rem)
 * Border radius uses semantic names that match component usage
 */

// ===== SPACING =====
// Use numeric scale (matches Tailwind) + semantic names
export const spacing = {
  // Numeric scale (Tailwind-compatible)
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px

  // Semantic names (for specific use cases)
  xs: '0.5rem',     // 8px - tight spacing
  sm: '0.75rem',    // 12px - small spacing
  md: '1rem',       // 16px - default spacing
  lg: '1.25rem',    // 20px - comfortable spacing
  xl: '1.5rem',     // 24px - loose spacing
  '2xl': '2rem',    // 32px - very loose spacing
} as const;

// ===== BORDER RADIUS =====
// Semantic names based on component usage
// For generic use cases, use Tailwind's built-in classes: rounded-sm, rounded-md, rounded-lg, etc.
export const borderRadius = {
  // Component-specific radii (semantic tokens)
  none: '0',
  button: '0.5rem',       // 8px - standard buttons (same as Tailwind's rounded-lg)
  card: '1rem',           // 16px - cards, containers (same as Tailwind's rounded-2xl)
  sidebar: '1.25rem',     // 20px - sidebar buttons
  sidebarWidth: '4.25rem',  // 68px - sidebar width
  modal: '1.5rem',        // 24px - modals, dialogs (custom - Tailwind's rounded-2xl is 1rem)
  pill: '6.25rem',        // 100px - fully rounded (add button)
  full: '9999px',         // Fully rounded circles (same as Tailwind's rounded-full)
  
  // Note: For generic border radius, use Tailwind's built-in classes:
  // rounded-sm (0.125rem), rounded (0.25rem), rounded-md (0.375rem),
  // rounded-lg (0.5rem), rounded-xl (0.75rem), rounded-2xl (1rem), rounded-full (9999px)
} as const;

// Export types
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;