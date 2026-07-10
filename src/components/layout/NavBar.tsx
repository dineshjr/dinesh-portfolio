import { useState, useEffect } from "react";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { useSectionInView } from "@/hooks/useSectionInView";
import { scrollToSection } from "@/animations/pageTransitions";
import type { SectionId } from "@/types";

const navItems: { label: string; id: SectionId; emoji: string }[] = [
    { label: "About", id: "about", emoji: "👤" },
    { label: "Projects", id: "projects", emoji: "⚡" },
    { label: "Movies", id: "movies", emoji: "🎬" },
    { label: "Anime", id: "anime", emoji: "⛩️" },
    { label: "Gym", id: "gym", emoji: "🏋️" },
    { label: "Playlist", id: "playlist", emoji: "🎵" },
    { label: "Contact", id: "contact", emoji: "✉️" },
];

const sectionIds: SectionId[] = [
    "hero", "about", "projects", "movies", "anime", "gym", "playlist", "contact",
];

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, toggle: toggleTheme } = useDarkMode();
    const { isPlaying, toggle: toggleAudio } = useAmbientSound();
    const activeSection = useSectionInView(sectionIds);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const handleNav = (id: SectionId) => {
        scrollToSection(id);
        setMenuOpen(false);
    };

    return (
        <>
            <nav
                className={clsx(
                    "fixed top-0 left-0 right-0 z-[var(--z-sticky)]",
                    "transition-all duration-500",
                    scrolled
                        ? "py-3 glass shadow-[var(--shadow-md)]"
                        : "py-5 bg-transparent"
                )}
            >
                <div className="container-main flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => handleNav("hero")}
                        className="font-display text-lg font-bold text-[var(--text-primary)] tracking-wide hover:text-[var(--amber)] transition-colors duration-200 cursor-none"
                    >
                        DK<span className="text-[var(--amber)]">.</span>
                    </button>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNav(item.id)}
                                    className={clsx(
                                        "relative px-3 py-2 rounded-lg font-mono text-xs tracking-wide",
                                        "transition-all duration-200 cursor-none",
                                        "hover:text-[var(--amber)] hover:bg-[rgba(200,135,74,0.08)]",
                                        activeSection === item.id
                                            ? "text-[var(--amber)]"
                                            : "text-[var(--text-muted)]"
                                    )}
                                >
                                    {activeSection === item.id && (
                                        <span className="absolute inset-0 rounded-lg bg-[rgba(200,135,74,0.1)] border border-[rgba(200,135,74,0.2)]" />
                                    )}
                                    <span className="relative">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Audio toggle */}
                        <button
                            onClick={toggleAudio}
                            title={isPlaying ? "Pause lofi" : "Play lofi"}
                            className={clsx(
                                "w-9 h-9 rounded-xl flex items-center justify-center",
                                "transition-all duration-200 cursor-none text-base",
                                "hover:bg-[rgba(200,135,74,0.1)] hover:scale-110",
                                isPlaying ? "text-[var(--amber)]" : "text-[var(--text-muted)]"
                            )}
                        >
                            {isPlaying ? "🎵" : "🔇"}
                        </button>

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            title="Toggle theme"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-base hover:bg-[rgba(200,135,74,0.1)] hover:scale-110 transition-all duration-200 cursor-none text-[var(--text-muted)]"
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>

                        {/* Mobile menu */}
                        <button
                            onClick={() => setMenuOpen((o) => !o)}
                            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[rgba(200,135,74,0.1)] transition-all cursor-none text-[var(--text-primary)]"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={clsx(
                    "fixed inset-0 z-[var(--z-modal)] glass-dark flex flex-col items-center justify-center gap-6",
                    "transition-all duration-400 md:hidden",
                    menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-6 right-6 text-[var(--cream)] text-2xl cursor-none"
                >
                    ✕
                </button>
                {navItems.map((item, i) => (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        style={{ transitionDelay: `${i * 50}ms` }}
                        className={clsx(
                            "font-display text-3xl font-bold cursor-none",
                            "transition-all duration-300",
                            "hover:text-[var(--amber)] hover:scale-105",
                            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                            activeSection === item.id
                                ? "text-[var(--amber)]"
                                : "text-[var(--cream)]"
                        )}
                    >
                        {item.emoji} {item.label}
                    </button>
                ))}
            </div>
        </>
    );
}