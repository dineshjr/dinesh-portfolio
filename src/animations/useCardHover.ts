import { useEffect, useRef } from "react";
import { gsap } from "./gsap.config";

interface TiltOptions {
    maxTilt?: number;
    perspective?: number;
    glareOpacity?: number;
    scale?: number;
    speed?: number;
}

export function useCardTilt<T extends HTMLElement = HTMLDivElement>(
    options: TiltOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        maxTilt = 12,
        perspective = 1000,
        glareOpacity = 0.15,
        scale = 1.03,
        speed = 0.3,
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Create glare element
        const glare = document.createElement("div");
        glare.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,${glareOpacity}), transparent 60%);
      pointer-events: none;
      opacity: 0;
      transition: opacity ${speed}s;
      z-index: 2;
    `;
        el.style.position = "relative";
        el.appendChild(glare);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;

            gsap.to(el, {
                rotateX,
                rotateY,
                scale,
                transformPerspective: perspective,
                duration: speed,
                ease: "power2.out",
            });

            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`;
            glare.style.opacity = "1";
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: "elastic.out(1, 0.75)",
            });
            glare.style.opacity = "0";
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            if (el.contains(glare)) el.removeChild(glare);
        };
    }, [maxTilt, perspective, glareOpacity, scale, speed]);

    return ref;
}

// Magnetic button effect
interface MagneticOptions {
    strength?: number;
    ease?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
    options: MagneticOptions = {}
) {
    const ref = useRef<T>(null);
    const { strength = 0.4, ease: easeStrength = 0.15 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: easeStrength,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
            });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength, easeStrength]);

    return ref;
}

// Hover lift with glow
export function useHoverGlow<T extends HTMLElement = HTMLDivElement>(
    glowColor = "rgba(200, 135, 74, 0.3)"
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleEnter = () => {
            gsap.to(el, {
                y: -6,
                boxShadow: `0 20px 60px ${glowColor}, 0 8px 30px rgba(0,0,0,0.15)`,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleLeave = () => {
            gsap.to(el, {
                y: 0,
                boxShadow: "0 4px 20px rgba(61, 35, 20, 0.12)",
                duration: 0.4,
                ease: "power2.out",
            });
        };

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, [glowColor]);

    return ref;
}