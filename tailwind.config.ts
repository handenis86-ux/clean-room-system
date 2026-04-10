import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0a1a22',
          900: '#0f2a36',
          800: '#153a4a',
          700: '#1b4a5e',
          600: '#245c72',
          500: '#2d7088',
          400: '#3d8ea8',
          300: '#5eadc4',
          200: '#8ecadb',
          100: '#c4e4ee',
          50: '#e8f4f8',
        },
        accent: {
          600: '#1a7a8a',
          500: '#22919e',
          400: '#2ab0be',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
