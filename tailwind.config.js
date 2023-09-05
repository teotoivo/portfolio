/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        "background-with-opacity": "var(--background-with-opacity)",
        btn: {
          background: "var(--btn-background)",
          border: "var(--btn-border)",
          "border-hover": "var(--btn-border-hover)",
          "secondary-background": "var(--btn-secondary-background)",
        },
      },
      backgroundImage: {
        main: "var(--bakcground-image)",
      },
      boxShadow: {
        "btn-main": "0 0 14px -10px var(--btn-border)",
      },
      keyframes: {
        navbarDissapear: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        navbarDissapear: "navbarDissapear auto ease-in-out",
      },
    },
  },
  plugins: [],
};
