import { useEffect, useRef, useState } from "react";
import { HeroScene } from "@/components/three/HeroScene";
import { NoisyButton } from "@/components/ui/NoisyButton";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { TypewriterText } from "./TypeWriterText";
import { heroEntrance, scrollToSection } from "@/animations/pageTransitions";
import styles from "./Hero.module.css";

const ROLES = [
    "Frontend Engineer",
    "React Developer",
    "UI Craftsman",
    "Three.js Explorer",
    "Full-Stack Builder",
];

export function Hero() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!hasAnimated.current) {
            hasAnimated.current = true;
            heroEntrance();
        }
    }, []);

    useEffect(() => {
        const handler = () => {
            const progress = window.scrollY / window.innerHeight;
            setScrollProgress(Math.min(progress, 1));
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.bg} />

            {/* Three.js canvas */}
            <div className={styles.canvas}>
                <HeroScene scrollProgress={scrollProgress} />
            </div>

            <div className={styles.content}>
                {/* Left: Text */}
                <div className={styles.left}>
                    <div className="hero-eyebrow">
                        <span className={styles.eyebrow}>
                            Available for work
                        </span>
                        <GlowBadge color="sage" size="xs" pulse>
                            🟢 Open
                        </GlowBadge>
                    </div>

                    <h1 className={`${styles.title} hero-title split-text`}>
                        <span className="word">Dinesh</span>{" "}
                        <span className="word">Kumar</span>
                        <span className={`${styles.titleAccent} word`}>Thangaraj</span>
                    </h1>

                    <div className={`${styles.typewriterRow} hero-subtitle`}>
                        <span className={styles.typewriterLabel}>$ role =</span>
                        <TypewriterText
                            texts={ROLES}
                            className="text-[var(--text-primary)] font-mono text-sm"
                        />
                    </div>

                    <p className={`${styles.subtitle} hero-subtitle`}>
                        Chennai-based Frontend Engineer building immersive web experiences
                        with React, TypeScript, and Three.js. Currently crafting
                        dungeon-based dev tools and voice-powered apps.
                    </p>

                    <div className={`${styles.ctas} hero-cta`}>
                        <NoisyButton
                            variant="primary"
                            size="md"
                            icon={<span>⚡</span>}
                            onClick={() => scrollToSection("projects")}
                        >
                            View Projects
                        </NoisyButton>
                        <NoisyButton
                            variant="ghost"
                            size="md"
                            icon={<span>✉️</span>}
                            onClick={() => scrollToSection("contact")}
                        >
                            Say Hello
                        </NoisyButton>
                    </div>

                    <div className={`${styles.stats} hero-cta`}>
                        {[
                            { value: "2+", label: "Years Exp" },
                            { value: "10+", label: "Projects" },
                            { value: "∞", label: "Curiosity" },
                        ].map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: 3D Canvas placeholder (canvas is absolute) */}
                <div className={styles.right} />
            </div>

            {/* Scroll indicator */}
            <div className={`${styles.scrollIndicator} hero-scroll-indicator`}>
                <span className={styles.scrollText}>scroll</span>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}