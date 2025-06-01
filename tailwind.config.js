/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        baloo: ['"Baloo 2"', 'sans-serif'],
        benzin: ['Benzin', 'sans-serif'],
      },
    },
  },
  plugins: [],
}