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
          DEFAULT: '#00608A',
          dark: '#004D6B',
          light: '#E8F4F8',
          muted: '#B8DCE8',
          hover: '#005577',
        },
        surface: {
          DEFAULT: '#F8FAFB',
          border: '#EEF0F2',
          stroke: '#E0E0E0',
          input: '#DDE1E6',
        },
        text: {
          DEFAULT: '#666666',
          dark: '#1A1A1A',
          muted: '#888888',
          light: '#99AABB',
        },
        footer: {
          DEFAULT: '#0A0A0A',
          alt: '#0A1A22',
          text: '#888888',
          link: '#99AABB',
          border: '#1A2A33',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '80px',
        },
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
