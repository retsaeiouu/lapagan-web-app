import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_raisin: "#212838",
        custom_darkerspace: "#242C3E",
        custom_space: "#283044",
        custom_payne: "#506980",
        custom_charcoal: "#3C4D62",
        custom_air: "#78A1BB",
        custom_columbia: "#B2CBD5",
        custom_mint: "#EBF5EE",
        custom_khaki: "#BFA89E",
        custom_cinereous: "#A59086",
        custom_darkercine: "#8B786D",
      },
      fontFamily: {
        comfortaa: ["var(--font-comfortaa)"],
        gloria: ["var(--font-gloria)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;
