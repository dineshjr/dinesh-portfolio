import { gsap } from "./gsap.config";

// Curtain wipe transition
export function pageEnter(onComplete?: () => void) {
    const tl = gsap.timeline({ onComplete });

    tl.set(".page-transition", { scaleY: 1, transformOrigin: "top" })
        .to(".page-transition", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power4.inOut",
        });

    return tl;
}

export function pageLeave(onComplete?: () => void) {
    const tl = gsap.timeline({ onComplete });

    tl.set(".page-transition", { scaleY: 0, transformOrigin: "bottom" })
        .to(".page-transition", {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 0.6,
            ease: "power4.inOut",
        });

    return tl;
}

// Loader exit animation
export function loaderExit(onComplete?: () => void) {
    const tl = gsap.timeline({ onComplete });

    tl.to(".page-loader__text", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
    })
        .to(".page-loader", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power4.inOut",
        });

    return tl;
}

// Hero entrance sequence
export function heroEntrance() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
    })
        .from(
            ".hero-title .word",
            {
                opacity: 0,
                y: 80,
                rotationX: -40,
                stagger: 0.08,
                duration: 0.9,
                ease: "power4.out",
            },
            "-=0.3"
        )
        .from(
            ".hero-subtitle",
            {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.4"
        )
        .from(
            ".hero-cta",
            {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
            },
            "-=0.3"
        )
        .from(
            ".hero-scroll-indicator",
            {
                opacity: 0,
                y: 10,
                duration: 0.5,
            },
            "-=0.2"
        );

    return tl;
}

// Smooth scroll to section
export function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    gsap.to(window, {
        scrollTo: { y: el, offsetY: 72 },
        duration: 1.2,
        ease: "power4.inOut",
    });
}

// Stagger reveal for grid cards
export function revealGrid(container: string, stagger = 0.1) {
    return gsap.from(`${container} .kento-card`, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
        },
    });
}

// Counter animation (for stats)
export function animateCounter(
    el: HTMLElement,
    target: number,
    duration = 2,
    suffix = ""
) {
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
        },
        onUpdate: () => {
            el.textContent = Math.round(obj.value) + suffix;
        },
    });
}