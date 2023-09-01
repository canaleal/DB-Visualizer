/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#245c9b',
        'primary-dark': '#245c9b',
      }
    },
  },
  plugins: [],
}