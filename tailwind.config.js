/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '359px',
      'sm': '440px',
      'md': '768px',
      'lg': '1024px'
    },
    extend: {
      fontFamily : {
        NavFont: ["Alkalami", "serif"],
        CursiveFont: ['Cedarville Cursive']
      },
    },
  },
  plugins: [],
}