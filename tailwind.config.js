/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './ui/*.(js|jsx)',
    './people/ui/**/*.(js|jsx)',
    './communities/ui/**/*.(js|jsx)',
    './client/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
