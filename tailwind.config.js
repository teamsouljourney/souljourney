/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './css/**/*.css', // `css` klasöründeki CSS dosyalarını da içe al
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
