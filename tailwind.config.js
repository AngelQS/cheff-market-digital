/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
          DEFAULT: '#E51920',
          dark: '#850000',
        },
        spooky: {
          orange: '#FF5E00',
          pumpkin: '#FF7700',
          toxic: '#10B981',
          acid: '#22C55E',
          purple: '#9333EA',
          violet: '#7C3AED',
          night: '#08080C',
          card: '#12131C',
          cardHover: '#1A1C29',
          border: '#2A2C3D',
        }
      },
      fontFamily: {
        horror: ['"Creepster"', 'cursive', 'sans-serif'],
        display: ['"Cinzel Decorative"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'blood-drop': 'bloodDrop 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '1',
            filter: 'drop-shadow(0 0 15px rgba(229, 25, 32, 0.7))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(229, 25, 32, 0.3), inset 0 0 15px rgba(229, 25, 32, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 35px rgba(229, 25, 32, 0.7), inset 0 0 25px rgba(229, 25, 32, 0.4)',
          },
        },
        bloodDrop: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '50%': { transform: 'scaleY(1.2)', opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
