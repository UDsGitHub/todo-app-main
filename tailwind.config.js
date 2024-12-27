/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-dark": "url('/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/images/bg-desktop-light.jpg')",
        "mobile-dark": "url('/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/images/bg-mobile-light.jpg')",
      },
      fontFamily: {
        "epilogue": ['"Epilogue"', 'serif'],
      },
    },
  },
  plugins: [],
};
