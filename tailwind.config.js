/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          150: "#c3eff9",
          250: "#9bd4e8",
          350: "#5fa0b4",
          450: "#2e475c",
          550: "#1b2836",
          650: "#66ccff",
          750: "#0099cc",
          850: "rgba(255,255,255,0)",
          950: "rgba(102,204,255,0.25)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
