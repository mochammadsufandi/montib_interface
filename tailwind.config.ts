import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navbar: "var(--foreground)",
        navbarText: "#CDB61F",
        logoBox: "#2D2E08",
        searchByBox: "#462B2B",
        searchByDivPart: "#C9C192",
        resultButton: "#50A01A",
        searchButton: "#275CC6",
        filterAndSortBox: "#1F0E0E",
        dropdownSelectField: "#B7A11D",
        activeFilterField: "#CDB61F",
        nonActiveFilterField: "#F0E07C",
        whiteText: "#FFFFFF",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "100", transform: "translateY(0)" },
          "100%": { opacity: "20", transform: "translateY(2rem)" },
        },
      },
      animation: {
        fadeOut: "fadeOut 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;