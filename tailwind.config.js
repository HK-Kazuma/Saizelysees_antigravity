/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saize: {
          green: '#008f39',
          red: '#d12b2b',
          cream: '#fff8ea',
          dark: '#1c1917',
          brick: '#b45309',
        }
      },
      fontFamily: {
        pixel: ['"Courier New"', 'monospace', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
