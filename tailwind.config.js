/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e9721c',
          light: '#f59e0b',
          dark: '#c2410c',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
        },
        cream: {
          DEFAULT: '#faf7f2',
          dark: '#f5f0e8',
        }
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
