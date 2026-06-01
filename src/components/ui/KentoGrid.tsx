import React from "react";
import clsx from "clsx";

interface KentoGridProps {
    children: React.ReactNode;
    className?: string;
    cols?: 2 | 3 | 4;
    gap?: "sm" | "md" | "lg";
}

const gapMap = {
    sm: "gap-3",
    md: "gap-4 md:gap-5",
    lg: "gap-5 md:gap-6",
};

const colMap = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function KentoGrid({
    children,
    className,
    cols = 3,
    gap = "md",
}: KentoGridProps) {
    return (
        <div
            className={clsx(
                "grid w-full",
                colMap[cols],
                gapMap[gap],
                "auto-rows-auto",
                className
            )}
        >
            {children}
        </div>
    );
}