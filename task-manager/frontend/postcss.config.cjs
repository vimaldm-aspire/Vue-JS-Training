// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Correct PostCSS plugin
    require('autoprefixer'), // To automatically add vendor prefixes
  ],
};
