/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blush: "#F8C8D8",
          blushLight: "#FCEBEB",
          blushDeep: "#F9D8D2",
          pink: "#E75480",
          pinkDeep: "#C83B65",
          black: "#111111",
          charcoal: "#2C2C2C",
          charcoalLight: "#444748",
          porcelain: "#FDFBF7",
          surface: "#FBF9F5",
          surfaceLow: "#F5F3EF",
          surfaceHigh: "#EAE8E4",
          whatsapp: "#25D366",
          whatsappHover: "#1EBE5D",
          instagram: "#E1306C",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Poppins", "Nunito", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(44, 44, 44, 0.05)",
        card: "0 8px 30px -4px rgba(44, 44, 44, 0.06)",
        float: "0 12px 36px -6px rgba(44, 44, 44, 0.12)",
        whatsapp: "0 10px 28px -4px rgba(37, 211, 102, 0.38)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};

