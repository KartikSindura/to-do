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
        monkey: "#010203",
        type: "#2e2c2c",
        text: "#7d8991",
        todo: "#E25403",

        // Arch,
        // monkey: "#0C0D12",
        // type: "#232636",
        // text: "#454964",
        // todo: "#7EB9B5",
      },
    },
  },
  plugins: [],
};
