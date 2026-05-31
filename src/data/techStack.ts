import type { TechItem } from "@/types";

export const techStack: TechItem[] = [
    // ── Frontend ──
    {
        id: 1,
        name: "React",
        icon: "⚛️",
        category: "Frontend",
        level: 5,
        yearsUsed: 2,
        favorite: true,
    },
    {
        id: 2,
        name: "TypeScript",
        icon: "🔷",
        category: "Frontend",
        level: 4,
        yearsUsed: 2,
        favorite: true,
    },
    {
        id: 3,
        name: "Tailwind CSS",
        icon: "🎨",
        category: "Frontend",
        level: 5,
        yearsUsed: 2,
        favorite: true,
    },
    {
        id: 4,
        name: "Three.js",
        icon: "🧊",
        category: "Frontend",
        level: 3,
        yearsUsed: 1,
        favorite: true,
    },
    {
        id: 5,
        name: "GSAP",
        icon: "✨",
        category: "Frontend",
        level: 3,
        yearsUsed: 1,
        favorite: true,
    },
    {
        id: 6,
        name: "Framer Motion",
        icon: "🎭",
        category: "Frontend",
        level: 4,
        yearsUsed: 1,
        favorite: false,
    },
    {
        id: 7,
        name: "Redux Toolkit",
        icon: "🔴",
        category: "Frontend",
        level: 4,
        yearsUsed: 1,
        favorite: true,
    },
    {
        id: 8,
        name: "Zustand",
        icon: "🐻",
        category: "Frontend",
        level: 4,
        yearsUsed: 1,
        favorite: true,
    },
    {
        id: 9,
        name: "HTML5",
        icon: "🌐",
        category: "Frontend",
        level: 5,
        yearsUsed: 4,
        favorite: false,
    },
    {
        id: 10,
        name: "CSS3",
        icon: "🎨",
        category: "Frontend",
        level: 5,
        yearsUsed: 4,
        favorite: false,
    },

    // ── Backend ──
    {
        id: 11,
        name: "Node.js",
        icon: "🟢",
        category: "Backend",
        level: 3,
        yearsUsed: 1,
        favorite: false,
    },
    {
        id: 12,
        name: "Express.js",
        icon: "🚂",
        category: "Backend",
        level: 3,
        yearsUsed: 1,
        favorite: false,
    },
    {
        id: 13,
        name: "GraphQL",
        icon: "🔗",
        category: "Backend",
        level: 3,
        yearsUsed: 1,
        favorite: false,
    },
    {
        id: 14,
        name: "REST APIs",
        icon: "📡",
        category: "Backend",
        level: 4,
        yearsUsed: 2,
        favorite: false,
    },

    // ── Database ──
    {
        id: 15,
        name: "MongoDB",
        icon: "🍃",
        category: "Database",
        level: 3,
        yearsUsed: 1,
        favorite: false,
    },

    // ── Tools ──
    {
        id: 16,
        name: "Git",
        icon: "🌿",
        category: "Tools",
        level: 4,
        yearsUsed: 3,
        favorite: false,
    },
    {
        id: 17,
        name: "Vite",
        icon: "⚡",
        category: "Tools",
        level: 4,
        yearsUsed: 2,
        favorite: true,
    },
    {
        id: 18,
        name: "VS Code",
        icon: "💙",
        category: "Tools",
        level: 5,
        yearsUsed: 4,
        favorite: true,
    },
    {
        id: 19,
        name: "Figma",
        icon: "🎯",
        category: "Tools",
        level: 3,
        yearsUsed: 2,
        favorite: false,
    },

    // ── Learning ──
    {
        id: 20,
        name: "React Native",
        icon: "📱",
        category: "Learning",
        level: 1,
        yearsUsed: 0,
        favorite: false,
    },
    {
        id: 21,
        name: "Next.js",
        icon: "▲",
        category: "Learning",
        level: 2,
        yearsUsed: 0,
        favorite: false,
    },
];

export const frontendStack = techStack.filter((t) => t.category === "Frontend");
export const backendStack = techStack.filter((t) => t.category === "Backend");
export const toolsStack = techStack.filter((t) => t.category === "Tools");
export const learningStack = techStack.filter((t) => t.category === "Learning");
export const favoriteTools = techStack.filter((t) => t.favorite);

export const techCategories = [
    "Frontend",
    "Backend",
    "Database",
    "Tools",
    "Learning",
] as const;