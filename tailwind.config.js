/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Grey 토큰
        grey: {
          1: '#FFFFFF',
          2: '#F5F5F5',
          3: '#DDDDDD',
          4: '#A6A6A6',
          5: '#666666',
          6: '#222222',
        },
        // Main 토큰
        main: {
          1: '#F2EFFD',
          2: '#EDE6FF',
          3: '#D7CBF7',
          4: '#B69CF1',
          5: '#986BE9',
          6: '#7C35D9',
          7: '#522193',
        },
        // Other 토큰
        other: {
          green: '#5EB669',
          'light-green': '#E7F429',
          red: '#CC0A0A',
          'pale-pink': '#F9E2E2',
          yellow: '#F6A818',
          'pale-yellow': '#FDEECE',
        },
        // Primary
        primary: {
          DEFAULT: '#6201E0',
          hover: '#4E01B3',
          active: '#3B0186',
          light: '#EFE6FC',
        },
      },
    },
  },
  plugins: [],
}
