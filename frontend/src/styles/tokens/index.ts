/**
 * Design Tokens - Central Export
 * 
 * All design tokens are exported from here for easy access
 * Import individual tokens or the combined object
 */

// Re-export individual token modules
export { colors, type Colors } from './colors';
export { spacing, borderRadius, type Spacing, type BorderRadius } from './spacing';
export { typography, type Typography } from './typography';
export { shadows } from './shadows';

// Import for combined export
import { colors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';

/**
 * Combined design tokens object
 * Use this when you need access to multiple token categories
 * 
 * @example
 * import { tokens } from '@/styles/tokens';
 * const primaryColor = tokens.colors.primary.DEFAULT;
 * const buttonRadius = tokens.borderRadius.button;
 */
export const tokens = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} as const;

// Export combined type
export type Tokens = typeof tokens;