module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        "-50": "-50%"
      },
      width: {
        "200": "200%"
      },
      height: {
        "200": "200%"
      },
      minWidth: {
        "50": "50%"
      },
      minHeight: {
        "50": "50%"
      },
      zIndex: {
        "-10": "-10"
      },
      backgroundColor: {
        grey: "#181818"
      }
    }
  },
  variants: {
    extend: {
      zIndex: ["hover", "active"]
    }
  },
  plugins: []
};
