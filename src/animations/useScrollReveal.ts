import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap.config";

interface ScrollRevealOptions {
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  scrub?: boolean;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    direction = "up",
    duration = 0.9,
    delay = 0,
    stagger = 0.1,
    ease = "power3.out",
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getFromVars = () => {
      switch (direction) {
        case "up":    return { opacity: 0, y: 50 };
        case "down":  return { opacity: 0, y: -50 };
        case "left":  return { opacity: 0, x: -60 };
        case "right": return { opacity: 0, x: 60 };
        case "scale": return { opacity: 0, scale: 0.85 };
        case "fade":  return { opacity: 0 };
        default:      return { opacity: 0, y: 50 };
      }
    };

    const children = el.querySelectorAll(".reveal-item");
    const targets = children.length > 0 ? children : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...getFromVars(),
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, duration, delay, stagger, ease, start, once]);

  return ref;
}

// Hook for pinned scroll sections
export function useScrollPin<T extends HTMLElement = HTMLDivElement>(
  endOffset = "+=200%"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: endOffset,
        pin: true,
        pinSpacing: true,
      });
    }, el);

    return () => ctx.revert();
  }, [endOffset]);

  return ref;
}

// Hook for batch-revealing a list of items
export function useScrollBatch(selector: string, options: ScrollRevealOptions = {}) {
  useEffect(() => {
    const { stagger = 0.15, ease = "power3.out" } = options;

    ScrollTrigger.batch(selector, {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger,
          ease,
        });
      },
      start: "top 88%",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [selector, options]);
}