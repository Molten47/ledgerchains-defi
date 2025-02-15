/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      backcolor: ''},
    extend: {
      zIndex: {
        '1000': '1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}