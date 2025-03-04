
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./client/index.html', './client/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Using rgb variables from CSS for better opacity control
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 0.5)',
          600: 'rgb(var(--color-primary) / 0.6)',
          700: 'rgb(var(--color-primary) / 0.7)',
          800: 'rgb(var(--color-primary) / 0.8)',
          900: 'rgb(var(--color-primary) / 0.9)',
          950: 'rgb(var(--color-primary) / 0.95)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary) / 0.05)',
          100: 'rgb(var(--color-secondary) / 0.1)',
          200: 'rgb(var(--color-secondary) / 0.2)',
          300: 'rgb(var(--color-secondary) / 0.3)',
          400: 'rgb(var(--color-secondary) / 0.4)',
          500: 'rgb(var(--color-secondary) / 0.5)',
          600: 'rgb(var(--color-secondary) / 0.6)',
          700: 'rgb(var(--color-secondary) / 0.7)',
          800: 'rgb(var(--color-secondary) / 0.8)',
          900: 'rgb(var(--color-secondary) / 0.9)',
          950: 'rgb(var(--color-secondary) / 0.95)',
        },
        accent: {
          50: 'rgb(var(--color-accent) / 0.05)',
          100: 'rgb(var(--color-accent) / 0.1)',
          200: 'rgb(var(--color-accent) / 0.2)',
          300: 'rgb(var(--color-accent) / 0.3)',
          400: 'rgb(var(--color-accent) / 0.4)',
          500: 'rgb(var(--color-accent) / 0.5)',
          600: 'rgb(var(--color-accent) / 0.6)',
          700: 'rgb(var(--color-accent) / 0.7)',
          800: 'rgb(var(--color-accent) / 0.8)',
          900: 'rgb(var(--color-accent) / 0.9)',
          950: 'rgb(var(--color-accent) / 0.95)',
        },
        success: {
          50: 'rgb(var(--color-success) / 0.05)',
          100: 'rgb(var(--color-success) / 0.1)',
          200: 'rgb(var(--color-success) / 0.2)',
          300: 'rgb(var(--color-success) / 0.3)',
          400: 'rgb(var(--color-success) / 0.4)',
          500: 'rgb(var(--color-success) / 0.5)',
          600: 'rgb(var(--color-success) / 0.6)',
          700: 'rgb(var(--color-success) / 0.7)',
          800: 'rgb(var(--color-success) / 0.8)',
          900: 'rgb(var(--color-success) / 0.9)',
          950: 'rgb(var(--color-success) / 0.95)',
        },
        warning: {
          50: 'rgb(var(--color-warning) / 0.05)',
          100: 'rgb(var(--color-warning) / 0.1)',
          200: 'rgb(var(--color-warning) / 0.2)',
          300: 'rgb(var(--color-warning) / 0.3)',
          400: 'rgb(var(--color-warning) / 0.4)',
          500: 'rgb(var(--color-warning) / 0.5)',
          600: 'rgb(var(--color-warning) / 0.6)',
          700: 'rgb(var(--color-warning) / 0.7)',
          800: 'rgb(var(--color-warning) / 0.8)',
          900: 'rgb(var(--color-warning) / 0.9)',
          950: 'rgb(var(--color-warning) / 0.95)',
        },
        error: {
          50: 'rgb(var(--color-error) / 0.05)',
          100: 'rgb(var(--color-error) / 0.1)',
          200: 'rgb(var(--color-error) / 0.2)',
          300: 'rgb(var(--color-error) / 0.3)',
          400: 'rgb(var(--color-error) / 0.4)',
          500: 'rgb(var(--color-error) / 0.5)',
          600: 'rgb(var(--color-error) / 0.6)',
          700: 'rgb(var(--color-error) / 0.7)',
          800: 'rgb(var(--color-error) / 0.8)',
          900: 'rgb(var(--color-error) / 0.9)',
          950: 'rgb(var(--color-error) / 0.95)',
        },
        info: {
          50: 'rgb(var(--color-info) / 0.05)',
          100: 'rgb(var(--color-info) / 0.1)',
          200: 'rgb(var(--color-info) / 0.2)',
          300: 'rgb(var(--color-info) / 0.3)',
          400: 'rgb(var(--color-info) / 0.4)',
          500: 'rgb(var(--color-info) / 0.5)',
          600: 'rgb(var(--color-info) / 0.6)',
          700: 'rgb(var(--color-info) / 0.7)',
          800: 'rgb(var(--color-info) / 0.8)',
          900: 'rgb(var(--color-info) / 0.9)',
          950: 'rgb(var(--color-info) / 0.95)',
        },
        // Semantic colors
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
        display: ['var(--font-display)', ...fontFamily.sans],
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        s: 'var(--space-s)',
        m: 'var(--space-m)',
        l: 'var(--space-l)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        'full': 'var(--radius-full)',
      },
      zIndex: {
        'negative': 'var(--z-negative)',
        'base': 'var(--z-base)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'toast': 'var(--z-toast)',
        'tooltip': 'var(--z-tooltip)',
        'overlay': 'var(--z-overlay)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
        'appearance': 'appearance 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'bounce-subtle': 'bounce 2.5s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-up': 'slideInUp 0.5s ease-out forwards',
        'slide-in-down': 'slideInDown 0.5s ease-out forwards',
        'shake': 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
        'blink': 'blink 1.2s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'ai-pattern': 'radial-gradient(circle at center, rgba(var(--color-primary), 0.2) 0.5px, transparent 0.5px)',
        'grid': 'linear-gradient(to right, rgba(var(--color-primary), 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--color-primary), 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 0deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(to right, rgba(var(--color-primary), 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--color-primary), 0.05) 1px, transparent 1px), radial-gradient(circle at center, rgba(var(--color-primary), 0.05) 0.5px, transparent 0.5px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        appearance: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backgroundSize: {
        'ai-pattern': '24px 24px',
        'grid': '40px 40px',
      },
      opacity: {
        '15': '0.15',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
        '2500': '2500ms',
        '3000': '3000ms',
      },
      transitionDelay: {
        '1500': '1500ms',
        '2000': '2000ms',
        '2500': '2500ms',
        '3000': '3000ms',
      },
      cursor: {
        'grab': 'grab',
        'grabbing': 'grabbing',
      },
      backdropBlur: {
        'xs': '2px',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.2)',
        'md': '0 2px 4px rgba(0,0,0,0.2)',
        'lg': '0 3px 6px rgba(0,0,0,0.2)',
        'xl': '0 4px 8px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [
    // Text shadow plugin
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
    
    // Aspect ratio plugin (for responsive UI)
    plugin(function({ matchUtilities }) {
      matchUtilities(
        {
          'aspect': (value) => ({
            aspectRatio: value,
          }),
        },
        { values: { 'square': '1/1', 'video': '16/9', 'portrait': '3/4', 'landscape': '4/3', 'ultrawide': '21/9' } }
      );
    }),
    
    // Direction-aware hover plugin
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.hover-lift': {
          'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
          'will-change': 'transform, box-shadow',
          '&:hover': {
            'transform': 'translateY(-5px)',
            'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.1)'
          }
        },
        '.hover-glow': {
          'transition': 'box-shadow 0.3s ease',
          '&:hover': {
            'box-shadow': '0 0 15px rgba(var(--color-primary), 0.5)'
          }
        },
        '.clickable': {
          'cursor': 'pointer',
          'transition': 'transform 0.15s ease',
          '&:active': {
            'transform': 'scale(0.97)'
          }
        },
      };
      addUtilities(newUtilities);
    }),
    
    // Typography plugins
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
