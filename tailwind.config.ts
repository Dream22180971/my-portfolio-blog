import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#0a0e17",
          card: "#111827",
          border: "rgba(0,212,255,0.08)",
          borderHover: "rgba(0,212,255,0.35)",
        },
        neon: {
          cyan: "#00d4ff",
          purple: "#7c3aed",
          green: "#10b981",
          red: "#ef4444",
          amber: "#f59e0b",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#64748b",
          muted: "#475569",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,212,255,0.15)",
        "glow-lg": "0 0 40px rgba(0,212,255,0.25)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        pulse: "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
