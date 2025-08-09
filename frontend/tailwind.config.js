/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F0E0E",
        accent: "#3B82F6", // Tailwind blue-500
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
