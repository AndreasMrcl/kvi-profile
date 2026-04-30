/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Secondary — green
        kvi: {
          50: '#e8f5ed',
          100: '#c5e6d2',
          200: '#8fcca5',
          300: '#59b27a',
          400: '#2c9e60',
          500: '#1a8b50',
          600: '#147846',
          700: '#105e37',
          800: '#0c4628',
          900: '#082e1a',
          950: '#041d10',
        },
        // Primary — institutional navy
        navy: {
          50: '#eaf1f8',
          100: '#cddff0',
          200: '#9bbfdf',
          300: '#6699c5',
          400: '#3a73a6',
          500: '#1f5485',
          600: '#144572',
          700: '#0e3d68',
          800: '#0a365c',
          900: '#062543',
          950: '#03182d',
        },
        gold: {
          300: '#f4d98a',
          400: '#e6bf60',
          500: '#c9a13a',
          600: '#a48128',
        },
        paper: {
          50: '#fafaf7',
          100: '#f4f4ef',
          200: '#e8e8e0',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(10, 54, 92, 0.18)',
        soft: '0 4px 16px -6px rgba(10, 54, 92, 0.12)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
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
