import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      colors: {
        forest: "#111a10",
        "forest-mid": "#1c2b1a",
        cream: "#e8dcc8",
        "cream-dark": "#c4a882",
        parchment: "#f0e8d5",
        "parchment-dark": "#e2d5bc",
        gold: "#c9a84c",
      },
      keyframes: {
        petalSpin: {
          "0%": { transform: "rotate(0deg) scale(0)", opacity: "0" },
          "50%": { transform: "rotate(180deg) scale(1.2)", opacity: "1" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "0.8" },
        },
        bloomIn: {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: "0" },
          "60%": { transform: "scale(1.15) rotate(10deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        vineGrow: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        petalSpin: "petalSpin 0.6s ease-out forwards",
        bloomIn: "bloomIn 0.4s ease-out forwards",
        floatUp: "floatUp 3s ease-in-out infinite",
        vineGrow: "vineGrow 2s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
