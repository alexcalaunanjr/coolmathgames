const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    fontFamily: {
      Limelight: ["Limelight", "sans-serif"]
    },
    colors: {
      brown: "#5A402A",
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}