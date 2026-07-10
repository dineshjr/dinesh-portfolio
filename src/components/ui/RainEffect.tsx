import { useMemo } from "react";

const pseudoRandom = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
};

interface RainEffectProps {
    count?: number;
    opacity?: number;
}

export function RainEffect({ count = 40, opacity = 0.08 }: RainEffectProps) {
    const drops = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: `${pseudoRandom(i + 1) * 100}%`,
                delay: `${pseudoRandom(i + 11) * 5}s`,
                duration: `${0.6 + pseudoRandom(i + 21) * 0.8}s`,
                height: `${8 + pseudoRandom(i + 31) * 16}px`,
                opacity: 0.3 + pseudoRandom(i + 41) * 0.7,
            })),
        [count]
    );

    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ opacity }}
        >
            <style>{`
        @keyframes rain {
          0%   { transform: translateY(-20px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
      `}</style>
            {drops.map((drop) => (
                <div
                    key={drop.id}
                    style={{
                        position: "absolute",
                        left: drop.left,
                        top: 0,
                        width: "1px",
                        height: drop.height,
                        background: "linear-gradient(to bottom, transparent, var(--mist))",
                        animation: `rain ${drop.duration} linear ${drop.delay} infinite`,
                        opacity: drop.opacity,
                    }}
                />
            ))}
        </div>
    );
}