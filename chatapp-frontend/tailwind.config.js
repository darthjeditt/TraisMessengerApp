module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
     fontFamily: {
      'swurvy': ['Satoshi', 'cursive'],
     }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
  ],
}
