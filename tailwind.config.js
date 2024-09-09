/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/screens/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/layouts/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3470ED",
        secondary: "#D5E5FF",
        "primary-transparent": "#333470ED",
        gray: "#878B9E",
        "light-gray": "#C5C5C5",
        "gray-shade": "#737373",
        "chart-gray": "#E9EDF0",
        red: "#ED2E2E",
        green: "#03D155",
        "green-light": "#03d15533",
        info: "#FFB573",
        "info-light": "rgba(255, 181, 115, 0.2)",
      },
      fontFamily: {
        "ubuntu-regular": ["Ubuntu-Regular"],
        "ubuntu-medium": ["Ubuntu-Medium"],
        "ubuntu-bold": ["Ubuntu-Bold"],
        "poppins-regular": ["Poppins-Regular"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-bold": ["Poppins-Bold"],
      },
    },
  },
  plugins: [],
};
