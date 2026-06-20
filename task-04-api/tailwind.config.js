/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        wiki: {
          blue: '#3366cc',
          lightblue: '#eaf3fb',
          gray: '#54595d',
          lightgray: '#f8f9fa',
          border: '#a2a9b1',
          text: '#202122',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}