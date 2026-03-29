import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pa: {
          red: '#CE1126',
          black: '#080808',
          dark: '#0f0f0f',
          card: '#111111',
        },
      },
      fontFamily: {
        mono: ['monospace'],
        serif: ['Georgia', 'serif'],
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
