/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        btn: {
          background: "var(--btn-background)",
          border: "var(--btn-border)",
          "border-hover": "var(--btn-border-hover)",
          "secondary-background": "var(--btn-secondary-background)",
        },
      },
      backgroundImage: {
        main: 'url("")',
        background: 'url("/background.jpg") no-repeat center fixed',
      },
      boxShadow: {
        "btn-main": "0 0 14px -10px var(--btn-border)",
      },
    },
  },
  plugins: [],
};
