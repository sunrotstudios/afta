import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brutalist black and white palette
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#3f3f3f',
          900: '#1a1a1a',
        },
        // Minimal accent (used very sparingly)
        accent: '#000000',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['2rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.5rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #000',
        'brutal-sm': '2px 2px 0 0 #000',
        'brutal-lg': '8px 8px 0 0 #000',
      },
      animation: {
        'none': 'none',
      },
    },
  },
  plugins: [],
} satisfies Config;
