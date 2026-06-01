import React from "react";
import clsx from "clsx";

interface LofiTagProps {
    children: React.ReactNode;
    emoji?: string;
    className?: string;
    onClick?: () => void;
    active?: boolean;
}

export function LofiTag({
    children,
    emoji,
    className,
    onClick,
    active = false,
}: LofiTagProps) {
    return (
        <span
            onClick={onClick}
            className={clsx(
                "lofi-tag",
                "select-none",
                onClick && "cursor-none hover:scale-105 active:scale-95",
                "transition-all duration-200",
                active && "!bg-[rgba(200,135,74,0.25)] !border-[var(--amber)]",
                className
            )}
        >
            {emoji && <span>{emoji}</span>}
            {children}
        </span>
    );
}