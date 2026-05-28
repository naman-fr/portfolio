import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0e0d0b",
        terminal: "var(--color-primary)",
        neural: "var(--color-secondary)",
        amber: "var(--color-accent)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        base: "var(--color-base)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      animation: {
        "text-reveal": "textReveal 0.8s ease-out",
        "typewriter": "typewriter 3s steps(40) 1s 1 normal both",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        textReveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typewriter: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px var(--color-primary), 0 0 10px var(--color-primary)" },
          "100%": { boxShadow: "0 0 10px var(--color-primary), 0 0 20px var(--color-primary), 0 0 30px var(--color-primary)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
