/** @type {import('tailwindcss').Config} */

// Import your design tokens
import { colors } from './src/styles/tokens/colors.ts';
import { spacing, borderRadius } from './src/styles/tokens/spacing.ts';
import { typography } from './src/styles/tokens/typography.ts';
import { shadows } from './src/styles/tokens/shadows.ts';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== COLORS =====
      colors: {
        // Primary colors
        primary: {
          DEFAULT: colors.primary.DEFAULT,
          hover: colors.primary.hover,
          active: colors.primary.active,
          dark: colors.primary.dark,
          light: colors.primary.light,
        },
        
        // Secondary colors
        secondary: {
          DEFAULT: colors.secondary.DEFAULT,
          bg: colors.secondary.bg,         
          hover: colors.secondary.hover,    
          light: colors.secondary.light,
          lighter: colors.secondary.lighter,
          active: colors.secondary.active,
        },
        
        // Interactive states
        interactive: {
          hover: colors.interactive.hover,
          disabled: {
            bg: colors.interactive.disabled.bg,
            text: colors.interactive.disabled.text,
            border: colors.interactive.disabled.border,
          },
        },
        
        // Backgrounds
        background: {
          primary: colors.background.primary,
          secondary: colors.background.secondary,
          tertiary: colors.background.tertiary,
          overlay: colors.background.overlay,
        },
        
        // Text colors
        text: {
          primary: colors.text.primary,
          secondary: colors.text.secondary,
          tertiary: colors.text.tertiary,
          quaternary: colors.text.quaternary,
          disabled: colors.text.disabled,
          onPrimary: colors.text.onPrimary,  
          link: colors.text.link,
        },
        
        // Borders
        border: {
          light: colors.border.light,
          DEFAULT: colors.border.DEFAULT,
          primary: colors.border.primary,
          focus: colors.border.focus,
        },
        
        // Status colors
        success: colors.status.success,
        error: colors.status.error,
        warning: colors.status.warning,
        info: colors.status.info,
        
        // Sidebar
        sidebar: colors.sidebar,
      },

      // ===== SPACING =====
      // spacing: spacing,
    
      spacing: {
        sidebarWidth: '4.25rem',
      },
      
      

      // ===== BORDER RADIUS =====
      borderRadius: {
        ...borderRadius,
        // button radius
        button: borderRadius.button, 
        card: borderRadius.card,
        sidebar: borderRadius.sidebar,
        pill: borderRadius.pill,
      },

      // ===== TYPOGRAPHY =====
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,

      // ===== SHADOWS =====
      boxShadow: shadows,

      // ===== TRANSITIONS =====
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};