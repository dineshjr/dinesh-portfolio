import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";

// Register all plugins once at app entry
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, Flip);

// Default ease for the whole project
gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
});

// ScrollTrigger global defaults
ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    start: "top 85%",
});

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, Flip };