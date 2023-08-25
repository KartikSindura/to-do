/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          delete: "var(--delete)",
          tick: "var(--tick)",
          cancel: "var(--cancel)",

        },
      },
    },
    plugins: [],
  }