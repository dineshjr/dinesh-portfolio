import React, { useRef } from "react";
import clsx from "clsx";
import { useCardTilt } from "@/animations/useCardHover";
import type { GridSpan } from "@/types";

interface KentoCardProps {
    children: React.ReactNode;
    span?: GridSpan;
    className?: string;
    onClick?: () => void;
    delay?: number;
    tilt?: boolean;
    glowColor?: string;
    padding?: "none" | "sm" | "md" | "lg";
    variant?: "default" | "dark" | "accent" | "ghost";
}

const spanMap: Record<GridSpan, string> = {
    normal: "col-span-1",
    wide: "col-span-1 md:col-span-2",
    tall: "row-span-2",
    large: "col-span-1 md:col-span-2 row-span-2",
};

const paddingMap = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
};

const variantMap = {
    default: "bg-[var(--bg-card)] border border-[var(--border-soft)]",
    dark: "bg-[var(--charcoal)] border border-[var(--border-warm)]",
    accent: "bg-gradient-to-br from-[var(--amber)] to-[var(--warm)] border-0",
    ghost: "bg-transparent border border-[var(--border-warm)]",
};

export function KentoCard({
    children,
    span = "normal",
    className,
    onClick,
    delay = 0,
    tilt = true,
    padding = "md",
    variant = "default",
}: KentoCardProps) {
    const tiltRef = useCardTilt<HTMLDivElement>({ maxTilt: 8, scale: 1.02 });
    const noTiltRef = useRef<HTMLDivElement>(null);
    const ref = tilt ? tiltRef : noTiltRef;

    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{ animationDelay: `${delay}ms` }}
            className={clsx(
                "kento-card",
                "relative overflow-hidden rounded-2xl",
                "transition-all duration-300",
                "reveal-item",
                spanMap[span],
                paddingMap[padding],
                variantMap[variant],
                onClick && "cursor-none select-none",
                className
            )}
        >
            {/* Inner shine */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(245,240,232,0.35) 0%, transparent 50%)",
                }}
            />
            {children}
        </div>
    );
}