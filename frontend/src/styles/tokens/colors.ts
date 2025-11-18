/**
 * Color Design Tokens
 * Extracted from Figma design system
 * 
 * Naming Convention:
 * - Semantic names (primary, secondary) for main colors
 * - Descriptive names for interactive states
 * - Status colors for system feedback
 */

export const colors = {
  // ===== PRIMARY COLORS =====
  // Main brand colors used for primary actions and emphasis
  primary: {
    DEFAULT: '#0065d9',     // Default primary blue
    hover: '#067aef',       // Hover state (from Figma)
    active: '#005ac2',      // Active/click state (from Figma)
    dark: '#0052b3',        // Darker variant
    light: '#89b5f5',       // Lighter variant (for rings/borders)
  },

  // ===== SECONDARY COLORS =====
  // Supporting colors for secondary actions
  secondary: {
    DEFAULT: '#d3dfed',     // Light blue background (selected state)
    light: '#f2f5f9',       // Very light blue (hover background)
    lighter: '#f5faff',     // Lightest blue (hover for secondary buttons)
    hover: '#ecf4fe',       // Specific hover state for secondary buttons (from Figma)
    active: '#b6cbe3',      // Active/click state (from Figma)
    bg: '#f9fcff',          // Secondary button default background (from Figma)
  },

  // ===== INTERACTIVE STATES =====
  // Generic interaction colors that can be used across components
  interactive: {
    hover: '#efefef',       // Light gray hover (for sidebar, add button)
    disabled: {
      bg: 'rgba(118, 118, 128, 0.12)',  // Disabled background
      text: '#b3b3b3',      // Disabled text color
      border: '#b3b3b3',    // Disabled border color
    },
  },

  // ===== BACKGROUND COLORS =====
  // Page and component backgrounds
  background: {
    primary: '#ffffff',     // White (cards, modals)
    secondary: '#f8f9fa',   // Light gray (page background)
    tertiary: '#f2f2f2',    // Slightly darker gray (note box background)
    overlay: 'rgba(0, 0, 0, 0.25)',  // Modal overlay
  },

  // ===== TEXT COLORS =====
  // All text colors for different hierarchies
  text: {
    primary: '#181818',     // Main text (almost black)
    secondary: '#3e3e3e',   // Secondary text (dark gray)
    tertiary: '#797979',    // Tertiary text (medium gray)
    quaternary: '#acacac',  // Quaternary text (light gray)
    disabled: '#b3b3b3',    // Disabled text (lightest gray)
    onPrimary: '#ffffff',   // Text on primary colored backgrounds
    link: '#0065d9',        // Link color (same as primary)
  },

  // ===== BORDER COLORS =====
  // Border and divider colors
  border: {
    light: '#e9e9e9',       // Light border (default)
    DEFAULT: '#dddddd',     // Standard border
    primary: '#0065d9',     // Primary colored border
    focus: '#89b5f5',       // Focus ring color
  },

  // ===== STATUS COLORS =====
  // System feedback colors (success, error, warning, info)
  status: {
    success: {
      DEFAULT: '#16AB4D',
      light: '#B2F8B5',
      dark: '#047857',
    },
    error: {
      DEFAULT: '#EF2727',
      light: '#FFCFCF',
      dark: '#B71616',
    },
    warning: {
      DEFAULT: '#f59e0b',
      light: '#fef3c7',
      dark: '#d97706',
    },
    info: {
      DEFAULT: '#3b82f6',
      light: '#dbeafe',
      dark: '#2563eb',
    },
  },

  // ===== SIDEBAR COLORS =====
  // Specific colors for sidebar buttons
  sidebar: {
    icon: {
      default: '#0c4a6e',   // Default icon color (from Figma)
      selected: '#005ac2',  // Selected icon color
      disabled: '#b3b3b3',  // Disabled icon color
    },
  },
} as const;

// Export type for TypeScript autocomplete
export type Colors = typeof colors;