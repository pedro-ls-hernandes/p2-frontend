/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.html",
    // Adicione outros caminhos conforme a estrutura do seu projeto
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5E17EB", // Roxo principal
          dark: "#4A0082",
          light: "#8A2BE2",
        },
        secondary: {
          DEFAULT: "#FF914D", // Laranja
          dark: "#FF8C42",
          light: "#FFBE7B",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          light: "#F5F7FA",
          medium: "#E4E7EB",
          dark: "#4A5568",
        },
        purple: {
          light: "#F9F6FF",
          medium: "#DDCCFF",
          dark: "#6A0DAD",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        medium:
          "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        // Define o keyframe 'float'
        float: {
          "0%, 100%": { transform: "translateY(0px)" }, // Posição inicial e final
          "50%": { transform: "translateY(-15px)" }, // Posição no meio da animação (flutuando para cima)
        },
      },
      animation: {
        // Define a classe de animação 'float-infinite' que usa o keyframe 'float'
        "float-infinite": "float 3s ease-in-out infinite", // Nome da animação, duração, timing-function, iteração
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
