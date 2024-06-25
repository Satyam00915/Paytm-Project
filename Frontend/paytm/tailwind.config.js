/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          500: "#868c97",
        },
        blue: {
          300: "#e2e850",
          400: "#c2cfdc",
        },
      },
    },
  },
  plugins: [],
};
