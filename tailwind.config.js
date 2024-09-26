import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./@/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#1C1C1E", // Slightly lighter dark gray
          dark: "#121212", // Pure black for a deeper dark mode if needed
        },
        foreground: {
          DEFAULT: "#E0E0E0", // Light warm gray for primary text
          muted: "#B0B0B0", // Muted gray for secondary text
        },
        primary: {
          DEFAULT: "#4A90E2", // Light blue/teal for primary buttons
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF9500", // Muted orange for secondary actions
          foreground: "#FFFFFF",
        },
        input: {
          DEFAULT: "#2B2B2B", // Dark gray input background
          border: "#3cabe3", // Light blue border for input fields
          foreground: "#E0E0E0", // Light text in input fields
        },
        accent: {
          DEFAULT: "#00A8E2", // Teal for accent elements
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#E53935", // Red for destructive actions
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280", // Muted gray
          foreground: "#D1D5DB",
        },
        popover: {
          DEFAULT: "#2D2D2D", // Darker popover background
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#242526", // Card background in dark mode
          foreground: "#E0E0E0", // Lighter card text
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
