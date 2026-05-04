/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#22c55e",
        darkGreen: "#16a34a",
        softGreen: "#4ade80",
        black: "#0a0a0a",
        dark: "#030712",
        softBlack: "#1a1a1a",
        lightDark: "#2a2a2a",
        surface: "#111827",
        white: "#ffffff",
        grayLight: "#d1d5db",
        gray: "#9ca3af",
      },
    },
  },
  plugins: [],
});
