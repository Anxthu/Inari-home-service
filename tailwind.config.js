/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        background: '#F0EDE8',
        surface: '#FFFFFF',
        accent: {
          green: '#283628', // Brand Deep Forest Green
          blue: '#3B82F6', // Keep for secondary accents
          orange: '#F97316',
          dark: '#1A1A1A',
        },
        brand: {
          primary: '#283628',
          light: '#3D5A3D',
          tint: '#E8EDE8',
        }
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(0,0,0,0.05)',
        'float': '0 30px 60px -20px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
