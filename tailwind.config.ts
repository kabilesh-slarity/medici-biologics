import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "3rem" },
      screens: { "2xl": "1152px" },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-elev": "var(--surface-elev)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        border: "var(--border)",
        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        accent: "var(--accent)",
        sage: "var(--sage)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.6" }],
        display: ["44px", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        section: ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        card: "0 1px 0 rgb(229 225 216 / 0.6), 0 24px 48px -24px rgb(10 14 13 / 0.10)",
        "card-dark": "0 1px 0 rgb(31 39 41 / 1), 0 24px 48px -24px rgb(0 0 0 / 0.5)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
