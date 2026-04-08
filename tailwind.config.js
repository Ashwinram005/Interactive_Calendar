/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 20px 40px rgba(17, 24, 39, 0.16)',
      },
      colors: {
        paper: '#f5f0e7',
        ink: '#18181b',
        accent: '#b2452f',
        accentSoft: '#e9c7b8',
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(0,0,0,0.12), transparent 34%), linear-gradient(135deg, #102023 0%, #2a3d41 60%, #5f6769 100%)",
      },
    },
  },
  plugins: [],
}
