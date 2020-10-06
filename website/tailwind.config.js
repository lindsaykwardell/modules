const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'forest-night': '#003c3c',
        'cloudy-grey': '#e6f0f0',
        'campfire-orange': '#ff6446',
        'sky-blue': '#28AAf0',
        'sun-yellow': '#ffe65a',
        'stone-green': '#648282',
        'clay-brown': '#b4b48c',
        'rainy-grey': '#d1e2e2',
        green: {
          50: '#F2FDF9',
          100: '#E6FCF3',
          200: '#BFF6E0',
          300: '#99F1CD',
          400: '#4DE7A8',
          500: '#00DC82',
          600: '#00C675',
          700: '#00844E',
          800: '#00633B',
          900: '#004227',
        }
      }
    }
  },
  variants: {
    opacity: ({ after }) => after(['group-hover'])
  },
  plugins: [require('@tailwindcss/ui')]
}