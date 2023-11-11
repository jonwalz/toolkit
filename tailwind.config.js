import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./@/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
