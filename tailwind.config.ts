import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lofi: {
          cream:      "#F5F0E8",
          parchment:  "#EDE4D0",
          warm:       "#D4A574",
          amber:      "#C8874A",
          brown:      "#8B5E3C",
          espresso:   "#3D2314",
          charcoal:   "#2A2018",
          ink:        "#1A1208",
          mist:       "#B8C4CC",
          sage:       "#8FA882",
          dust:       "#C4B49A",
          glow:       "#F0C060",
        },
      },
      fontFamily: {
        display: ["Lora", "Georgia", "serif"],
        mono:    ["GeistMono", "Fira Code", "monospace"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "float-slow":   "float 10s ease-in-out infinite",
        "pulse-warm":   "pulseWarm 4s ease-in-out infinite",
        "spin-slow":    "spin 20s linear infinite",
        "spin-vinyl":   "spin 3s linear infinite",
        "waveform":     "waveform 1.2s ease-in-out infinite",
        "marquee":      "marquee 30s linear infinite",
        "grain":        "grain 0.5s steps(1) infinite",
        "fade-up":      "fadeUp 0.8s ease forwards",
        "fade-in":      "fadeIn 0.6s ease forwards",
        "slide-left":   "slideLeft 0.7s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":       { transform: "translateY(-12px) rotate(1deg)" },
          "66%":       { transform: "translateY(-6px) rotate(-1deg)" },
        },
        pulseWarm: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        waveform: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%":      { transform: "scaleY(1)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":      { transform: "translate(-2%, -3%)" },
          "20%":      { transform: "translate(3%, 1%)" },
          "30%":      { transform: "translate(-1%, 4%)" },
          "40%":      { transform: "translate(2%, -2%)" },
          "50%":      { transform: "translate(-3%, 3%)" },
          "60%":      { transform: "translate(1%, -1%)" },
          "70%":      { transform: "translate(-2%, 2%)" },
          "80%":      { transform: "translate(3%, -3%)" },
          "90%":      { transform: "translate(-1%, 1%)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        "lofi-sm":  "0 2px 8px rgba(61, 35, 20, 0.08)",
        "lofi-md":  "0 4px 20px rgba(61, 35, 20, 0.12)",
        "lofi-lg":  "0 8px 40px rgba(61, 35, 20, 0.18)",
        "lofi-xl":  "0 16px 60px rgba(61, 35, 20, 0.24)",
        "glow-warm": "0 0 30px rgba(240, 192, 96, 0.3)",
        "glow-amber": "0 0 40px rgba(200, 135, 74, 0.35)",
        "inset-warm": "inset 0 1px 0 rgba(245, 240, 232, 0.6)",
      },
      backgroundImage: {
        "lofi-gradient":  "linear-gradient(135deg, #F5F0E8 0%, #EDE4D0 50%, #D4A574 100%)",
        "dark-gradient":  "linear-gradient(135deg, #1A1208 0%, #2A2018 50%, #3D2314 100%)",
        "warm-radial":    "radial-gradient(ellipse at center, #F0C060 0%, transparent 70%)",
        "amber-radial":   "radial-gradient(ellipse at top right, #C8874A22 0%, transparent 60%)",
        "noise":          "url('/textures/grain.png')",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-expo":   "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      screens: {
        "xs": "375px",
      },
    },
  },
  plugins: [],
};

export default config;