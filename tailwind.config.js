/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        primary: "#ffffff",
        secondary: "#a1a1aa",
        "accent-orange": "#ff5e00",
        "accent-red": "#ff2a00",
        "accent-yellow": "#ffe000",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"]
      }
    },
  },
  plugins: [],
}
