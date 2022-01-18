module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./safelist.txt"],
  theme: {
    extend: {
      colors: {
        primary: "#ff277e",
      },
      borderWidth: {
        6: "6px",
      },
    },
  },
  plugins: [
    require("tailwind-safelist-generator")({
      patterns: ["{screens}:gap-{gap}", "{screens}:col-span-{gap}"],
    }),
  ],
};
