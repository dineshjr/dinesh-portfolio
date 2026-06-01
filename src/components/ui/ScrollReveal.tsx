import React from "react";
import clsx from "clsx";
import { useScrollReveal } from "@/animations/useScrollReveal";

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
    delay?: number;
    duration?: number;
    stagger?: number;
    className?: string;
    once?: boolean;
}

export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.9,
    stagger = 0.1,
    className,
    once = true,
}: ScrollRevealProps) {
    const ref = useScrollReveal<HTMLDivElement>({
        direction,
        delay,
        duration,
        stagger,
        once,
    });

    return (
        <div ref={ref} className={clsx(className)}>
            {children}
        </div>
    );
}