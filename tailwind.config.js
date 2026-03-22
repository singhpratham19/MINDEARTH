/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          blue: "#0A2540",
          body: "#475569",
          muted: "#94A3B8",
          light: "#F8FAFC",
          border: "#E2E8F0",
          green: "#0B6E4F",
          "green-light": "#E6F4EF",
        },
      },
      fontFamily: {
        heading: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        body: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
