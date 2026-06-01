import React from "react";
import clsx from "clsx";
import type { SectionId } from "@/types";

interface SectionWrapperProps {
    id: SectionId;
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
    noTopPad?: boolean;
    noBottomPad?: boolean;
    dark?: boolean;
}

export function SectionWrapper({
    id,
    children,
    className,
    fullWidth = false,
    noTopPad = false,
    noBottomPad = false,
    dark = false,
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={clsx(
                "relative w-full overflow-hidden",
                !noTopPad && "pt-[clamp(4rem,10vw,8rem)]",
                !noBottomPad && "pb-[clamp(4rem,10vw,8rem)]",
                dark && "bg-[var(--bg-secondary)]",
                className
            )}
        >
            {fullWidth ? (
                children
            ) : (
                <div className="container-main">{children}</div>
            )}
        </section>
    );
}