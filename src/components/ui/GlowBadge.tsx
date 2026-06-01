import React from "react";
import clsx from "clsx";

interface GlowBadgeProps {
    children: React.ReactNode;
    color?: "amber" | "sage" | "mist" | "warm" | "cream";
    size?: "xs" | "sm" | "md";
    pulse?: boolean;
    className?: string;
}

const colorMap = {
    amber: {
        bg: "rgba(200, 135, 74, 0.12)",
        border: "rgba(200, 135, 74, 0.3)",
        text: "var(--amber)",
        glow: "rgba(200, 135, 74, 0.25)",
    },
    sage: {
        bg: "rgba(143, 168, 130, 0.12)",
        border: "rgba(143, 168, 130, 0.3)",
        text: "var(--sage)",
        glow: "rgba(143, 168, 130, 0.2)",
    },
    mist: {
        bg: "rgba(184, 196, 204, 0.12)",
        border: "rgba(184, 196, 204, 0.3)",
        text: "var(--mist)",
        glow: "rgba(184, 196, 204, 0.2)",
    },
    warm: {
        bg: "rgba(212, 165, 116, 0.15)",
        border: "rgba(212, 165, 116, 0.3)",
        text: "var(--warm)",
        glow: "rgba(212, 165, 116, 0.2)",
    },
    cream: {
        bg: "rgba(245, 240, 232, 0.15)",
        border: "rgba(245, 240, 232, 0.3)",
        text: "var(--cream)",
        glow: "rgba(245, 240, 232, 0.15)",
    },
};

const sizeMap = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
};

export function GlowBadge({
    children,
    color = "amber",
    size = "sm",
    pulse = false,
    className,
}: GlowBadgeProps) {
    const c = colorMap[color];

    return (
        <span
            className={clsx(
                "inline-flex items-center gap-1 rounded-full font-mono",
                "transition-all duration-300",
                sizeMap[size],
                pulse && "animate-pulse-warm",
                className
            )}
            style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.text,
                boxShadow: `0 0 10px ${c.glow}`,
            }}
        >
            {children}
        </span>
    );
}