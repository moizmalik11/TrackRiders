/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-black': '#0a0f1e',
        'brand-red': '#ff4b4b',
        'brand-gold': '#ffb400',
        'emerald-green': '#10b981',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom right, #0a0f1e, #0f172a)',
      }
    },
  },
  plugins: [],
}
