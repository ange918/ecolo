/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        or: '#C9A84C',
        'or-light': '#E8D5A0',
        'or-pale': '#F5EDD8',
        noir: '#0A0A0A',
        'noir-2': '#111111',
        'noir-3': '#1A1A1A',
        blanc: '#F5F0E8',
        texte: '#B8B0A0',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
