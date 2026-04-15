/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#0a3524',
          900: '#0f4a32',
          800: '#1a6b4a',
          700: '#1e7d57',
        },
        gold: {
          300: '#e0c97a',
          400: '#d4b560',
          500: '#c9a84c',
        },
        cream: {
          50: '#faf6ee',
          100: '#f0e8d8',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-img': "url('https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1920&q=80')",
        'fungsi-img': "url('https://images.unsplash.com/photo-1581888227599-779811939961?w=1920&q=80')",
        'org-img': "url('https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=1920&q=80')",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-up-delay': 'fadeUp 0.8s 0.2s ease forwards',
        'fade-up-delay2': 'fadeUp 0.8s 0.4s ease forwards',
        'fade-up-delay3': 'fadeUp 0.8s 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
