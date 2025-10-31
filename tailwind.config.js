export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-nature': '#2E8B57',
        'blue-ocean': '#1E90FF',
        'yellow-solar': '#FFD700',
        'green-deep': '#1B4D3E',
        'light-bg': '#F8F9FA',
        'text-gray': '#333333',
        'green-hover': '#3CB371',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
