module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-100": "#f7f7f7",
        "blue-primary": "#0054c1",
        "blue-pale": "#eff3fe",
        "blue-soft": "#f0f4fa",
        "blue-dark-sky": "#367dda",
        "blue-profile": "#0f57b4",
        "blue-background": "#0d52ad",
        "blue-darkish": "#063d85",
        "blue-check": "#0f57b4",
        "gray-light": "#f7f7f7",
        "gray-a1a1": "#a1a1a1",
        "gray-light-dark": "#c6c6c6",
        "gray-light-profile": "#ECE9E9",
        "gray-light-pink": "#efefef",
        "gray-bluey": "#959ba7",
        "gray-warm": "#868686",
        "gray-icon": "#E6E6E6",
        "gray-expired": "#9e9e9e",
        "gray-sidebar": "#AFB4CB",
        "gray-hover": "#ebeaf3",
        "red-error": "#f24242",
        "red-unpaid": "#f44336",
        "red-light": "#cd3c3d",
        "red-dark": "#cf2728",
        "gray-powder": "#ccd2e3",
        "gray-brownish": "#727272",
        "green-success": "#1bb55c",
        "green-toast-success": "#3abf94",
        "green-toast-close": "#3ed7a5",
        "yellow-orange-two": "#ffb003",
        "yellow-light": "#ffd14f",
        "yellow-dark": "#f0c753",
        "yellow-soft": "#fff9e9",
        success: "#0054c1",
        pending: "#727272",
        failed: "#f44336",
        // blue: {
        //   primary: "#0054c1"
        // },
      },
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

        "1px": "1px",
        "6px": "6px",
        "10px": "10px",
        "24px": "24px",
        53: "53px",
        "52px": "52px",
        62: "62px",
        82: "82px",
        "104px": "104px",
        200: "200px",
        224: "224px",

        "9vw": "9vw",
        "300%": "300%",
      },
      // inset: {
      //   '-1px': '-1px'
      // },
      margin: {
        "2px": "2px",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "24px": "24px",
      },
      padding: {
        "14px": "14px",
        "10px": "10px",
        "24px": "24px",
      },
      fontSize: {
        xxs: ".55em",
        "10px": "10px",
        "14px": "14px",
      },
      borderWidth: {
        1: "1px",
      },
      zIndex: {
        "-1": -1,
        25: 25,
        75: 75,
        100: 100,
        9999: 9999,
      },
      flexShrink: {
        100: 100,
      },
      lineHeight: {
        0: 0,
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        90: "90px",
        "458pt": "458pt",
      },
      maxWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        90: "90px",
        "100-px": "100px",
        "150-px": "150px",
        "200-px": "200px",
        "250-px": "250px",
        "300-px": "300px",
        "350-px": "350px",
        "400-px": "400px",
        "450-px": "450px",
        "500-px": "500px",
        "550-px": "550px",
        "600-px": "600px",
      },
      minHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        90: "90px",
        "458pt": "458pt",
      },
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
    boxShadow: {
      up: "rgb(108 114 124 / 16%) 0px -2px 4px 0px",
      md:
        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      md2:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      lg:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      blue: "-1px 8px 21px 3px rgba(0,84,193,0.37)",
      none: "none",
    },
  },
  variants: {
    extend: {
      opacity: ["disabled", "active"],
      backgroundColor: ["active", "disabled"],
      // border: ["disabled"],
      textColor: ["active"],
      scale: ["active", "group-hover"],
      transform: ["active"],
      gradientColorStops: ["active", "group-hover", "disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
    require("tailwindcss"),
  ],
};
