/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: [
    {
      mytheme: {
        primary: "#3ABFF8",

        secondary: "#828DF8",

        accent: "#F471B5",

        neutral: "#1D283A",

        "base-100": "#0F1729",

        info: "#0CA6E9",

        success: "#2BD4BD",

        warning: "#F4C152",

        error: "#FB6F84",
      },
      
    },
  ],
  plugins: [require("daisyui")],
};
