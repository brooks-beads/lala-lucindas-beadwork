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
        lora: ['var(--font-lora)', 'Georgia', 'Times New Roman', 'serif'],
        lato: ['var(--font-lato)', 'system-ui', '-apple-system', 'sans-serif'],
        // kept for any legacy usage
        mukta: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── New brand palette ──────────────────────────────────
        midnight:   '#2C2F38',   // primary dark — backgrounds, headers
        slate:      '#5A5F67',   // secondary text, captions
        gold:       '#C9A040',   // accent — CTAs, highlights
        'gold-light': '#E8C870', // hover states
        cream:      '#EDE8D8',   // light backgrounds, cards
        smoke:      '#787060',   // muted text, borders
        offwhite:   '#F7F4EE',   // page background
        ink:        '#1A1C22',   // body text
        // ── Legacy earth palette (kept for backward compat) ────
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
      },
      letterSpacing: {
        widest: '0.22em',
        wider:  '0.12em',
        wide:   '0.06em',
      },
      lineHeight: {
        tight:   '1.2',
        snug:    '1.35',
        relaxed: '1.75',
      },
    },
  },
  plugins: [],
}
