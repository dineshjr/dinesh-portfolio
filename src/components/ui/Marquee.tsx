import React from "react";
import clsx from "clsx";

interface MarqueeProps {
    items: string[];
    speed?: "slow" | "normal" | "fast";
    direction?: "left" | "right";
    separator?: string;
    className?: string;
    itemClassName?: string;
}

const durationMap = { slow: "40s", normal: "25s", fast: "15s" };

export function Marquee({
    items,
    speed = "normal",
    direction = "left",
    separator = "✦",
    className,
    itemClassName,
}: MarqueeProps) {
    const doubled = [...items, ...items];

    return (
        <div className={clsx("overflow-hidden whitespace-nowrap", className)}>
            <div
                className="inline-flex gap-6"
                style={{
                    animation: `marquee ${durationMap[speed]} linear infinite`,
                    animationDirection: direction === "right" ? "reverse" : "normal",
                }}
            >
                {doubled.map((item, i) => (
                    <React.Fragment key={i}>
                        <span
                            className={clsx(
                                "font-mono text-sm tracking-wider text-[var(--text-muted)]",
                                itemClassName
                            )}
                        >
                            {item}
                        </span>
                        <span className="text-[var(--amber)] opacity-60">{separator}</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}