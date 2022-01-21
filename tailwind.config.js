module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./safelist.txt"],
  theme: {
    extend: {
      colors: {
        primary: "#ee2b7b",
        // gray: "#6f7287",
        dark: "#303030",
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
