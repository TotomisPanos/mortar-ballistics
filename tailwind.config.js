/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        retro: ["'Press Start 2P'", "cursive"],
      },
      colors: {
        dosGreen: "#33FF33",
        dosBlack: "#001100",
        dosBorder: "#00AA00",
      },
    },
  },
  plugins: [],
};
