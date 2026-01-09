/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'altyr-bg': '#18021A',
        'altyr-bg-dark': '#0d0110',
        'altyr-magenta': '#AC0064',
        'altyr-purple': '#64109A',
        'altyr-purple-light': '#9B4DCA',
        'altyr-orange': '#E85A24',
        'altyr-orange-light': '#FF8C42',
        'altyr-amber': '#B56A00',
        'badge-bronze': '#CD7F32',
        'badge-silver': '#C0C0C0',
        'badge-gold': '#FFD700',
        'badge-platinum': '#E5E4E2',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
