module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      spacing: {
        "1pt": "1pt",
        "8pt": "8pt",
        "10pt": "10pt",
        "16pt": "16pt",
        "24pt": "24pt",
        "25pt": "25pt",
        "37pt": "37pt",
        "40pt": "40pt",
        "45pt": "45pt",
        "58pt": "58pt",
        "60pt": "60pt",
        "70pt": "70pt",
        "76pt": "76pt",
        "90pt": "90pt",
        "120pt": "120pt",
        "136pt": "136pt",
        "210pt": "210pt",
        "298pt": "298pt",
        "312pt": "312pt",
        "100pt": "100pt",
      },
      margin: {},
      padding: {},
      fontSize: {},
      borderWidth: {},
      zIndex: {},
      flexShrink: {},
      lineHeight: {},
      minWidth: {},
      maxWidth: {},
      minHeight: {},
    },
    screens: {
      // xxs: { min: "320", max: "375" },
      xs: "386px",
      sm: "500px",
      "2sm": "641px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    boxShadow: {}
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
    require("tailwindcss"),
  ],
}
