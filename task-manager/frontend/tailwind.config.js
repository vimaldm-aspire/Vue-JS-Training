// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'hover:bg-red-600',
    'text-white',
  ],  
  theme: {
    extend: {},
  },
  plugins: [],
};
