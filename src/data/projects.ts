import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Solo Dev Coding App",
    description:
      "Gamified dungeon-based coding platform with XP systems, skill trees, and a full coding environment.",
    longDescription:
      "A full-stack gamified coding platform inspired by dungeon RPGs. Features include XP-based progression, skill trees, dungeon-themed coding challenges, real-time code execution, and a leaderboard. Built with a focus on developer experience and engagement.",
    tech: ["React", "Redux Toolkit", "RTK Query", "Node.js", "Express", "MongoDB", "TypeScript"],
    status: "in-progress",
    type: "web-app",
    cover: "/covers/solo-dev.jpg",
    featured: true,
    year: 2024,
    gridSpan: "wide",
  },
  {
    id: 2,
    title: "VoiceScroll AI",
    description:
      "Voice-controlled teleprompter web app with auto-scroll, Web Audio API voice detection, and JWT auth.",
    longDescription:
      "A voice-controlled teleprompter application that uses the Web Audio API to detect speech and automatically scroll scripts. Features script CRUD, fullscreen mode, dark mode, and JWT-based authentication.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "Web Audio API"],
    status: "in-progress",
    type: "web-app",
    cover: "/covers/voicescroll.jpg",
    featured: true,
    year: 2025,
    gridSpan: "normal",
  },
  {
    id: 3,
    title: "Team Workflow Board",
    description:
      "Production-grade Kanban board with drag-and-drop, URL-synced filters, and localStorage persistence.",
    longDescription:
      "A production-grade team workflow board built with React, TypeScript, Zustand, and @dnd-kit. Features drag-and-drop task management, URL-synced filters, localStorage persistence, and CSS Modules styling.",
    tech: ["React", "TypeScript", "Zustand", "@dnd-kit", "CSS Modules", "Vite"],
    status: "live",
    type: "web-app",
    liveUrl: "https://team-workflow-board.vercel.app",
    cover: "/covers/workflow-board.jpg",
    featured: true,
    year: 2024,
    gridSpan: "normal",
  },
  {
    id: 4,
    title: "Dinesh Portfolio v1",
    description:
      "Single-file HTML/CSS/JS personal resume website with 60fps GPU-accelerated animations.",
    longDescription:
      "Personal portfolio website focused on 60fps performance optimization. Iteratively refined from GLSL shaders to CSS blob animations to static radial gradients for zero repaint overhead.",
    tech: ["HTML", "CSS", "JavaScript", "GLSL"],
    status: "live",
    type: "portfolio",
    cover: "/covers/portfolio-v1.jpg",
    featured: false,
    year: 2024,
    gridSpan: "normal",
  },
  {
    id: 5,
    title: "Crunchyroll Clone UI",
    description:
      "Anime streaming platform UI built while learning Redux Toolkit and GraphQL with Apollo Client.",
    longDescription:
      "A faithful Crunchyroll-inspired UI built as a learning project for Redux Toolkit, RTK Query, GraphQL, and Apollo Client. Features anime browsing, episode listings, and user watchlist management.",
    tech: ["React", "Redux Toolkit", "GraphQL", "Apollo Client", "TypeScript"],
    status: "archived",
    type: "web-app",
    cover: "/covers/crunchyroll-clone.jpg",
    featured: false,
    year: 2024,
    gridSpan: "normal",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const liveProjects = projects.filter((p) => p.status === "live");