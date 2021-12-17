module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./pages/**/*.{js,jsx,tsx}"],
};
