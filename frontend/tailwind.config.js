/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['Poppins'],
        'roboto' : ['Roboto']
      }
    },
  },
  plugins: [],
}

