import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        peach: '#EDE2D0',
        blush: '#EDE2D0',
        cream: '#FAF8F3',
        champagne: '#EDE2D0',
        rose: '#945D70',
        gold: '#B69A70',
        sage: '#B69A70',
        wine: '#682C40',
        brown: '#43383A',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(104, 44, 64, 0.08)',
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
