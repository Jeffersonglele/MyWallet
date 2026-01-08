/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#4f46e5', // indigo-600
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
