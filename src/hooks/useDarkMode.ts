import { useState, useEffect } from "react";
import type { Theme } from "@/types";

export function useDarkMode() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem("portfolio-theme") as Theme;
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    const isDark = theme === "dark";

    return { theme, isDark, toggle };
}