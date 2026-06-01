import { useTypewriter } from "@/animations/useTextSplit";

interface TypewriterTextProps {
    texts: string[];
    className?: string;
}

export function TypewriterText({ texts, className }: TypewriterTextProps) {
    const ref = useTypewriter(texts, { speed: 80, deleteSpeed: 40, pauseTime: 2200 });

    return (
        <span className={className}>
            <span ref={ref} />
            <span className="typewriter-cursor" />
        </span>
    );
}