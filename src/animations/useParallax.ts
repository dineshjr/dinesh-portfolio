import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap.config";

interface ParallaxOptions {
  speed?: number;      // 0.1 (slow) to 1.0 (fast)
  direction?: "y" | "x";
  scrub?: number;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.4, direction = "y", scrub = 1.5 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const distance = direction === "y" ? window.innerHeight * speed : window.innerWidth * speed;
    const moveVars = direction === "y" ? { y: -distance } : { x: -distance };

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...moveVars,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, direction, scrub]);

  return ref;
}

// Parallax for background layers (multiple layers at different speeds)
export function useLayeredParallax(layers: { selector: string; speed: number }[]) {
  useEffect(() => {
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    layers.forEach(({ selector, speed }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const distance = window.innerHeight * speed;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(el, { y: -distance * self.progress });
          },
        });
        triggers.push(trigger);
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, [layers]);
}