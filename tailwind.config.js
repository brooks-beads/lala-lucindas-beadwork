/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mukta: ['var(--font-mukta)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        earth: {
          50:  '#faf8f5',
          100: '#f2ece2',
          200: '#e8ddd0',
          300: '#d4c4ae',
          400: '#c4a882',
          500: '#b08a60',
          600: '#8b6f47',
          700: '#6b5035',
          800: '#4a3422',
          900: '#2c1e10',
        },
        sand: '#e8d5b0',
        clay: '#c4715a',
        sage: '#8a9e7d',
        midnight: '#1e1a16',
      },
      letterSpacing: {
        widest: '0.2em',
        wide: '0.1em',
        normal: '0.071em', // 1px at 14px
      },
      lineHeight: {
        base: '1.643', // 23px at 14px
      },
    },
  },
  plugins: [],
}
