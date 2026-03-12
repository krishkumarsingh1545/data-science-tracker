/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        primary: '#f0c040',
        success: '#3ddc97',
        info: '#7c9fff',
        danger: '#ff6b6b',
        purple: '#c89bff',
        dark: '#0a0c10',
        'dark-secondary': '#161b26',
        'dark-tertiary': '#1e2535',
      },
    },
  },
  plugins: [],
};