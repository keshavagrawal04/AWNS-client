/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/screens/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3470ED',
        gray: '#878B9E',
        'light-gray': '#C5C5C5',
      },
      fontFamily: {
        'ubuntu-regular': ['Ubuntu-Regular'],
        'ubuntu-medium': ['Ubuntu-Medium'],
        'ubuntu-bold': ['Ubuntu-Bold'],
        'poppins-regular': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-bold': ['Poppins-Bold'],
      },
    },
  },
  plugins: [],
};
