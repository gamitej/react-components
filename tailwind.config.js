/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    keyframes: {
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      "slide-in": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0)" },
      },
    },
    animation: {
      "fade-in": "fade-in 0.3s ease-out",
      "slide-in": "slide-in 0.3s ease-out",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
    },
  ],
};
