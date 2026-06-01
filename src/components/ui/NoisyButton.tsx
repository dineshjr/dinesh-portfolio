import React from "react";
import clsx from "clsx";
import { useMagnetic } from "@/animations/useCardHover";

interface NoisyButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
    disabled?: boolean;
    href?: string;
    magnetic?: boolean;
}

const sizeMap = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
};

export function NoisyButton({
    children,
    onClick,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    className,
    disabled = false,
    href,
    magnetic = true,
}: NoisyButtonProps) {
    const magneticRef = useMagnetic<HTMLElement>({ strength: 0.3 });

    const baseClass = clsx(
        "inline-flex items-center font-mono tracking-wide",
        "rounded-xl relative overflow-hidden",
        "transition-all duration-300 select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        sizeMap[size],
        disabled && "opacity-50 pointer-events-none",
        variant === "primary" && [
            "bg-[var(--amber)] text-[var(--cream)]",
            "shadow-[0_4px_15px_rgba(200,135,74,0.4)]",
            "hover:shadow-[0_8px_25px_rgba(200,135,74,0.5),var(--shadow-glow)]",
            "hover:-translate-y-0.5 hover:scale-[1.02]",
            "active:translate-y-0 active:scale-[0.98]",
        ],
        variant === "ghost" && [
            "bg-transparent text-[var(--amber)]",
            "border border-[var(--border-warm)]",
            "hover:bg-[rgba(200,135,74,0.1)]",
            "hover:shadow-[var(--shadow-glow)]",
        ],
        variant === "outline" && [
            "bg-transparent text-[var(--text-primary)]",
            "border border-[var(--border-strong)]",
            "hover:border-[var(--amber)] hover:text-[var(--amber)]",
        ],
        className
    );

    const inner = (
        <>
            {/* Noise texture overlay */}
            <span
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "url('/textures/grain.png')", backgroundSize: "200px" }}
            />
            {/* Shine */}
            <span
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
                }}
            />
            {icon && iconPosition === "left" && (
                <span className="relative z-10 flex-shrink-0">{icon}</span>
            )}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === "right" && (
                <span className="relative z-10 flex-shrink-0">{icon}</span>
            )}
        </>
    );

    if (href) {
        return (
            <a
                ref={magnetic ? (magneticRef as React.Ref<HTMLAnchorElement>) : undefined}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClass}
            >
                {inner}
            </a>
        );
    }

    return (
        <button
            ref={magnetic ? (magneticRef as React.Ref<HTMLButtonElement>) : undefined}
            onClick={onClick}
            disabled={disabled}
            className={baseClass}
        >
            {inner}
        </button>
    );
}