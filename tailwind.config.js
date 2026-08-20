/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        textMain: "var(--color-text-main)",
        textMuted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        error: "var(--color-error)",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        pixel: ['"Silkscreen"', "cursive"],
      },
    },
  },
  plugins: [],
};