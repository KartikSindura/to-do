/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        delete: "var(--delete)",
        tick: "var(--tick)",
        cancel: "var(--cancel)",
        dark_bg: "var(--dark-bg)",
        dark_primary: "var(--dark-primary)",
      },
    },
  },
  plugins: [],
};
