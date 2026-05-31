import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    glsl(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei", "gsap"],
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("three") || id.includes("@react-three")) {
            return "three";
          }
          if (id.includes("gsap")) {
            return "gsap";
          }
          if (id.includes("react")) {
            return "react";
          }
        },
      },
    },
  },
});