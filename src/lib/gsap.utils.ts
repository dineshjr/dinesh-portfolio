import { gsap, ScrollTrigger } from "@/animations/gsap.config";

// Kill all ScrollTriggers safely
export function killAllTriggers() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
}

// Refresh ScrollTrigger after layout changes
export function refreshTriggers(delay = 100) {
    setTimeout(() => ScrollTrigger.refresh(), delay);
}

// Animate a number from 0 to target
export function countTo(
    element: HTMLElement | null,
    target: number,
    options: {
        duration?: number;
        suffix?: string;
        prefix?: string;
        decimals?: number;
        ease?: string;
    } = {}
) {
    if (!element) return;
    const {
        duration = 2,
        suffix = "",
        prefix = "",
        decimals = 0,
        ease = "power2.out",
    } = options;

    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration,
        ease,
        onUpdate: () => {
            element.textContent =
                prefix + obj.value.toFixed(decimals) + suffix;
        },
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
        },
    });
}

// Stagger animate children of a container
export function staggerChildren(
    container: HTMLElement | string,
    fromVars: gsap.TweenVars = { opacity: 0, y: 30 },
    options: {
        stagger?: number;
        duration?: number;
        ease?: string;
        delay?: number;
        scrollTrigger?: boolean;
    } = {}
) {
    const {
        stagger = 0.1,
        duration = 0.7,
        ease = "power3.out",
        delay = 0,
        scrollTrigger: withTrigger = true,
    } = options;

    const el = typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!el) return;

    return gsap.from(el.children, {
        ...fromVars,
        stagger,
        duration,
        ease,
        delay,
        ...(withTrigger && {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
        }),
    });
}

// Pin a section with a timeline scrub
export function createScrubTimeline(
    trigger: string | HTMLElement,
    endOffset = "+=150%"
) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger,
            start: "top top",
            end: endOffset,
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
        },
    });
    return tl;
}

// Animate element along a path (horizontal progress bar)
export function animateProgress(
    element: HTMLElement | null,
    progress: number,
    duration = 0.6
) {
    if (!element) return;
    gsap.to(element, {
        scaleX: progress,
        duration,
        ease: "power2.out",
        transformOrigin: "left",
    });
}

// Create a looping marquee tween
export function createMarquee(
    track: HTMLElement | null,
    duration = 30,
    direction: "left" | "right" = "left"
) {
    if (!track) return;

    const width = track.scrollWidth / 2;
    const x = direction === "left" ? -width : width;

    return gsap.to(track, {
        x,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: (val) => `${parseFloat(val) % width}px`,
        },
    });
}

// Smooth reveal with clip-path
export function clipReveal(
    element: HTMLElement | null,
    direction: "up" | "left" | "right" = "up",
    duration = 0.9,
    delay = 0
) {
    if (!element) return;

    const from =
        direction === "up"
            ? "inset(100% 0% 0% 0%)"
            : direction === "left"
                ? "inset(0% 100% 0% 0%)"
                : "inset(0% 0% 0% 100%)";

    const to = "inset(0% 0% 0% 0%)";

    gsap.fromTo(
        element,
        { clipPath: from },
        {
            clipPath: to,
            duration,
            delay,
            ease: "power4.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
            },
        }
    );
}