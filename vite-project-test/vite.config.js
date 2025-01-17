/** @type {import('tailwindcss').Config} */
import vue from '@vitejs/plugin-vue';
export default {
  // Make changes below
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [vue()],
};
