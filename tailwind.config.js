/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        or: '#c9a84c',
        'or-light': '#E8D5A0',
        'or-pale': '#F5EDD8',
        noir: '#0a0a0a',
        'noir-2': '#111111',
        'noir-3': '#161616',
        blanc: '#f5f0e8',
        texte: '#9ca3af',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        cormorant: ['Syne', 'system-ui', 'sans-serif'],
        jost: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}
