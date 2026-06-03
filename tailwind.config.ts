import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: '#6B4C96',
          'plum-dark': '#4E3570',
          'plum-light': '#F0EBF8',
          teal: '#3D9E8C',
          'teal-dark': '#2D7A6B',
          'teal-light': '#E6F5F2',
          rose: '#D4657A',
          'rose-light': '#FDF0F2',
          lavender: '#F5F1FD',
          charcoal: '#2D2535',
          muted: '#6B6478',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
