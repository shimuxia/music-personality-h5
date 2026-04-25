/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06070a',
        mist: '#f2ede3',
        smoke: '#a8a29a',
        sand: '#c7b08b',
        line: 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        display: ['Baskerville', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Noto Serif SC', 'Songti SC', 'STSong', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 28px 100px rgba(0, 0, 0, 0.32)',
      },
      backgroundImage: {
        haze:
          'radial-gradient(circle at top, rgba(185, 176, 160, 0.18), transparent 30%), radial-gradient(circle at 80% 20%, rgba(123, 136, 158, 0.16), transparent 24%)',
        staff:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 34px, rgba(255,255,255,0.06) 35px, transparent 36px)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        rise: 'rise 500ms ease-out both',
      },
    },
  },
  plugins: [],
}
