import { useEffect, useRef } from "react";
import { gsap } from "./gsap.config";

type SplitType = "chars" | "words" | "lines";

interface TextSplitOptions {
    type?: SplitType;
    duration?: number;
    stagger?: number;
    ease?: string;
    delay?: number;
    trigger?: "scroll" | "immediate";
    start?: string;
}

// Manual splitter — splits text into spans without SplitText plugin
function splitText(el: HTMLElement, type: SplitType) {
    const original = el.innerHTML;
    let html = "";

    if (type === "chars") {
        const text = el.textContent || "";
        html = text
            .split("")
            .map((char) =>
                char === " "
                    ? '<span class="split-space"> </span>'
                    : `<span class="split-char" style="display:inline-block">${char}</span>`
            )
            .join("");
    } else if (type === "words") {
        const text = el.textContent || "";
        html = text
            .split(" ")
            .map(
                (word) =>
                    `<span class="split-word" style="display:inline-block; overflow:hidden"><span style="display:inline-block">${word}</span></span>`
            )
            .join('<span class="split-space"> </span>');
    } else if (type === "lines") {
        const words = (el.textContent || "").split(" ");
        html = words
            .map(
                (word) =>
                    `<span class="split-word" style="display:inline-block">${word}</span>`
            )
            .join(" ");
    }

    el.innerHTML = html;
    return { original };
}

export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
    options: TextSplitOptions = {}
) {
    const ref = useRef<T>(null);
    const {
        type = "words",
        duration = 0.8,
        stagger = 0.04,
        ease = "power4.out",
        delay = 0,
        trigger = "scroll",
        start = "top 85%",
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const { original } = splitText(el, type);

        const targets =
            type === "chars"
                ? el.querySelectorAll(".split-char")
                : el.querySelectorAll(".split-word span, .split-word");

        const fromVars =
            type === "words" || type === "lines"
                ? { opacity: 0, y: "110%", rotationX: -40 }
                : { opacity: 0, y: "100%", rotationZ: 5 };

        const ctx = gsap.context(() => {
            if (trigger === "scroll") {
                gsap.from(targets, {
                    ...fromVars,
                    duration,
                    stagger,
                    ease,
                    delay,
                    scrollTrigger: {
                        trigger: el,
                        start,
                        toggleActions: "play none none none",
                    },
                });
            } else {
                gsap.from(targets, {
                    ...fromVars,
                    duration,
                    stagger,
                    ease,
                    delay,
                });
            }
        }, el);

        return () => {
            ctx.revert();
            if (el) el.innerHTML = original;
        };
    }, [type, duration, stagger, ease, delay, trigger, start]);

    return ref;
}

// Typewriter effect hook
export function useTypewriter(
    texts: string[],
    options: { speed?: number; deleteSpeed?: number; pauseTime?: number } = {}
) {
    const ref = useRef<HTMLSpanElement>(null);
    const { speed = 80, deleteSpeed = 40, pauseTime = 2000 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let currentIndex = 0;
        let currentText = "";
        let isDeleting = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const type = () => {
            const fullText = texts[currentIndex];

            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
            }

            el.textContent = currentText;

            let typeSpeed = isDeleting ? deleteSpeed : speed;

            if (!isDeleting && currentText === fullText) {
                typeSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeSpeed = 300;
            }

            timeoutId = setTimeout(type, typeSpeed);
        };

        timeoutId = setTimeout(type, 500);

        return () => clearTimeout(timeoutId);
    }, [texts, speed, deleteSpeed, pauseTime]);

    return ref;
}

// Scramble text on hover
export function useTextScramble<T extends HTMLElement = HTMLElement>() {
    const ref = useRef<T>(null);
    const chars = "!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz";

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const original = el.textContent || "";
        let frame = 0;
        let rafId: number;

        const scramble = () => {
            let output = "";
            for (let i = 0; i < original.length; i++) {
                if (Math.random() < frame / 20) {
                    output += original[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            el.textContent = output;
            frame++;
            if (frame < 20) {
                rafId = requestAnimationFrame(scramble);
            } else {
                el.textContent = original;
            }
        };

        const handleMouseEnter = () => {
            frame = 0;
            cancelAnimationFrame(rafId);
            scramble();
        };

        el.addEventListener("mouseenter", handleMouseEnter);
        return () => {
            el.removeEventListener("mouseenter", handleMouseEnter);
            cancelAnimationFrame(rafId);
        };
    }, [chars]);

    return ref;
}