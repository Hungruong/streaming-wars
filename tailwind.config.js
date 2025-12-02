/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: '#E50914',
        disney: '#113CCF',
        prime: '#00A8E1',
        hbo: '#B535F6',
        hulu: '#1CE783',
        apple: '#555555',
        paramount: '#0064FF',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
