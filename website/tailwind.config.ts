import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        dark: {
          bg: {
            DEFAULT: "hsl(var(--dark-bg))",
            secondary: "hsl(var(--dark-bg-secondary))",
            tertiary: "hsl(var(--dark-bg-tertiary))",
          },
          text: {
            primary: "hsl(var(--dark-text-primary))",
            secondary: "hsl(var(--dark-text-secondary))",
            muted: "hsl(var(--dark-text-muted))",
          },
          border: "hsl(var(--dark-border))",
          accent: {
            DEFAULT: "hsl(var(--dark-accent))",
            hover: "hsl(var(--dark-accent-hover))",
          },
        },
        primary: {
          DEFAULT: "#5865f2",
          50: "#f0f1ff",
          100: "#e0e2ff",
          200: "#c1c5ff",
          300: "#a2a8ff",
          400: "#838bff",
          500: "#5865f2",
          600: "#4651c2",
          700: "#343d91",
          800: "#232861",
          900: "#111430",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "neo-black": "#141414",
        slate: "#272727",
        slab: "#202020",
        brass: "#1C1C1C",
        subtitle: "#8F8F8F",
        "subtitle-1": "#757575",
        "white-smoke": "#EDEEF0",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "inset-light": "inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
        "elevated-light":
          "0px 1px 0px 0px rgba(255,255,255,0.15) inset, 0px 1px 1px 0px rgba(0,0,0,0.10), 0px 0px 1px 0px rgba(0,0,0,0.10), 0px 12px 24px 0px rgba(0,0,0,0.08), 0px 2px 5px 0px rgba(0,0,0,0.25)",
        "paywall-card":
          "0px 8px 16px 0px rgba(0, 0, 0, 0.16), 0px 24px 40px -8px rgba(0, 0, 0, 0.20), 0px 0px 1px 0px rgba(94, 94, 94, 0.15)",
        "layered": "0px 0px 0px 1px rgba(2, 6, 23, 0.08), 0px 4px 4px -2px rgba(2, 6, 23, 0.04), 0px 6px 6px -3px rgba(2, 6, 23, 0.08), 0px 2px 2px -1px rgba(2, 6, 23, 0.02), 0px 1px 1px 0px rgba(2, 6, 23, 0.08)",
        "domain-button": "0px 0px 0px 0px rgba(0, 0, 0, 0.02), 0px 2px 3px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.07)",
        "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        "dark": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
        "dark-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)",
        "dark-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        "dark-2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        "dark-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
        "dark-glow": "0 0 15px rgba(88, 101, 242, 0.3)",
        "dark-glow-lg": "0 0 30px rgba(88, 101, 242, 0.4)",
      },
      backgroundImage: {
        "rigid-card":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.04) 100%)",
        "selected-gradient":
          "linear-gradient(90deg, #AB68F1 25%, #CD87A7 25%, #F0A260 50%, #71A2F9 100%)",
      },
      keyframes: {
        confetti: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "50%": {
            transform: "translateY(-100px) rotate(180deg)",
            opacity: "0.5",
          },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        scale: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        confetti: "confetti 1s ease-in-out infinite",
        slideUp: "slideUp 0.3s ease-out",
        scale: "scale 0.3s ease-in-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
