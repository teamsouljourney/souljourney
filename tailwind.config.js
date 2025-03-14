/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        // Main Colors
        pink: {
          DEFAULT: "#D798B0", // Light Pink (Main color)
          light: "#dba2b8", // Light Light Pink
          dark: "#c2899e", // Dark Light Pink
        },
        mauve: {
          DEFAULT: "#8F5B8A", // Mauve (Purple-Brown)
          light: "#9a6b96", // Light Mauve
          dark: "#81527c", // Dark Mauve
        },
        navy: {
          DEFAULT: "#2E5077", // Navy Blue (Main color)
          light: "#436285", // Light Navy Blue
          dark: "#29486b", // Dark Navy Blue
        },
        seaGreen: {
          DEFAULT: "#4DA1A9", // Sea Green (Main color)
          light: "#5FAAB2", // Light Sea Green
          dark: "#459198", // Dark Sea Green
        },
        pastelGreen: {
          DEFAULT: "#79D7B8", // Pastel Green (Main color)
          light: "#86dcc2a6", // Light Pastel Green
          dark: "#6DC2A6", // Dark Pastel Green
        },
        offWhite: {
          DEFAULT: "#F6F4F0", // Off-White (Main color)
          light: "#f7f5f2", // Lighter Off-White
          dark: "#dddcd8", // Darker Off-White
        },
        customBlack: {
          DEFAULT: "#181a1b", // Custom Black (Main color)
          light: "#161718", // Light Custom Black
          dark: "#2f3132", // Darker Custom Black
        },
        // Background Colors
        background: {
          DEFAULT: "#F7F7F7", // Background (Main color)
          light: "#F7F7F7", // Light Background
          lightdark: "#4b5563 ", // gray-600
          dark: "#374151", // gray-700
          darker: "#1f2937",  // gray-800
        }
      },      
    },
  },
  plugins: [],
};
