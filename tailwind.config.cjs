/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        white: '#F4F6FF',
        gray: {
          300: '#B1B4BD',
          500: '#91949D',
          700: '#696C74',
        },
        black: '#0B0E16',
        red: {
          300: '#BB2E57',
          500: '#AF053F',
          700: '#300219'
        }
      },
    },
    screens: {
      'mobile': '320px',
      'md': '768px',
    },
  },
  plugins: [],
}
