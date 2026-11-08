import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        peach: '#F7C6B5',
        blush: '#F6DDE1',
        cream: '#FFF9F5',
        sage: '#A8B9A0',
        wine: '#7D4354',
        brown: '#5C4540',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(124, 71, 85, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
