/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#5b9ae2ff",
        secondary: "#dce5ff",
      },
    },
    // 斷點的padding跟margin
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    // 字體大小   
     fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    // 標題字體大小
    heading: {
      h1: "2rem",
      h2: "1.5rem",
      h3: "1.25rem",
    },
  },
  plugins: [],
};
