const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'prod',
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const zIndex = {
        '.z-1000000': {
          'z-index': '1000000'
        },
      }

      addUtilities(zIndex, ['responsive', 'hover'])
    })
  ],
};