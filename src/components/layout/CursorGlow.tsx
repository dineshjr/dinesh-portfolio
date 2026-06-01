import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap.config";

export function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        const glow = glowRef.current;
        if (!dot || !ring || !glow) return;

        // Move dot instantly
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            gsap.set(dot, { x: e.clientX, y: e.clientY });
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.12,
                ease: "power2.out",
            });
            gsap.to(glow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        // Hover state on interactive elements
        const onEnter = () => setIsHovering(true);
        const onLeave = () => setIsHovering(false);
        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);

        const interactives = document.querySelectorAll(
            "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
        );

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    // Animate cursor state changes
    useEffect(() => {
        const ring = ringRef.current;
        const glow = glowRef.current;
        if (!ring || !glow) return;

        gsap.to(ring, {
            scale: isHovering ? 2.2 : isClicking ? 0.8 : 1,
            opacity: isHovering ? 0.6 : 1,
            duration: 0.25,
            ease: "power2.out",
        });
        gsap.to(glow, {
            scale: isHovering ? 1.5 : isClicking ? 0.6 : 1,
            opacity: isHovering ? 0.5 : 0.25,
            duration: 0.4,
        });
    }, [isHovering, isClicking]);

    return (
        <>
            {/* Dot — instant */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)]"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <div
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--amber)",
                        boxShadow: "0 0 6px var(--amber)",
                    }}
                />
            </div>

            {/* Ring — slightly lagged */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[var(--z-cursor)]"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "1.5px solid var(--amber)",
                        opacity: 0.7,
                    }}
                />
            </div>

            {/* Glow — most lagged */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 z-[9997]"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(200,135,74,0.12) 0%, transparent 70%)",
                        opacity: 0.25,
                    }}
                />
            </div>
        </>
    );
}