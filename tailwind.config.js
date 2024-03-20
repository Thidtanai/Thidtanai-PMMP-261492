/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-grey": "#e8e8e8",
        white: "#fff",
        "cmu-purple": "#6b69b1",
        orange: "#faab1d",
        grey: "#444344",
        black: "#1a1a1a",
        darkslategray: "#404040",
        cornflowerblue: "#8582c9",
        "cmu-purple-shade": "#bdbcc9",
        gainsboro: "#e6e6e6",
        lightslategray: "#8a8a96",
        "lavender": "#e0dfee",
      },
      spacing: {},
      fontFamily: {
        "heading-2": "'Saira Condensed'",
        body: "Inter",
        saira: "Saira",
      },
    },
    fontSize: {
      "5xl": "1.5rem",
      base: "1rem",
      "31xl": "3.125rem",
      "13xl": "2rem",
      "111xl": "8.125rem",
      "11xl": "1.875rem",
      "21xl": "2.5rem",
      lgi: "1.188rem",
      "7xl": "1.625rem",
      xs: "0.75rem",
      xl: "1.25rem",
      sm: "0.875rem",
      inherit: "inherit",
    },
    screens: {
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
