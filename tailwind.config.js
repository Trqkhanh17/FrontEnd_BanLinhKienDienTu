/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7fb",
          100: "#d9ebf5",
          500: "#0f5f8f",
          600: "#0a4c75",
          700: "#0a3d62",
          900: "#06263e",
        },
      },
      boxShadow: {
        soft: "0 12px 35px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};
