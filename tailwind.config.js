/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#080a0e',
          900: '#0e121a',
          850: '#141824',
          800: '#1a2030',
          700: '#262f44',
          600: '#394460',
          500: '#526084',
          400: '#7584a8',
          300: '#9faecc',
          200: '#cbd4e6',
          100: '#e6ebf5',
          50: '#f4f6fa',
        },
        brass: {
          DEFAULT: '#c5a059',
          light: '#dfbe79',
          dark: '#8e6e30',
          muted: '#6c552a',
        },
        burgundy: {
          DEFAULT: '#802332',
          dark: '#4f141e',
          light: '#ab3244',
        },
        teal: {
          noir: '#2e5866',
          dark: '#1b343c',
          light: '#488094',
        },
        ivory: {
          DEFAULT: '#ede8dd',
          muted: '#cfc8b6',
          dark: '#a89f89',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'noir-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(197, 160, 89, 0.2)',
        'noir-glow': '0 0 20px -3px rgba(197, 160, 89, 0.35)',
        'pulse-detect': '0 0 25px 2px rgba(66, 153, 225, 0.4)',
      }
    },
  },
  plugins: [],
}
