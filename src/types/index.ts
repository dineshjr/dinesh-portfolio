/* ============================================
   TYPES — all shared TypeScript interfaces
   ============================================ */

// ── General ──────────────────────────────────

export type Theme = "light" | "dark";

export interface NavItem {
  label: string;
  href: string;
  emoji?: string;
}

// ── Movies & Series ───────────────────────────

export type Genre =
  | "Action"
  | "Drama"
  | "Thriller"
  | "Sci-Fi"
  | "Horror"
  | "Comedy"
  | "Fantasy"
  | "Animation"
  | "Crime"
  | "Romance"
  | "Mystery"
  | "Adventure";

export type WatchStatus = "watched" | "watching" | "plan-to-watch";

export interface Movie {
  id: number;
  title: string;
  year: number;
  genres: Genre[];
  rating: number;          // 1–10
  poster: string;          // path or URL
  description: string;
  director: string;
  status: WatchStatus;
  favorite: boolean;
  imdbUrl?: string;
  gridSpan?: "normal" | "wide" | "tall";
}

export interface Series {
  id: number;
  title: string;
  year: number;
  genres: Genre[];
  rating: number;
  poster: string;
  description: string;
  seasons: number;
  episodes: number;
  status: WatchStatus;
  favorite: boolean;
  imdbUrl?: string;
  gridSpan?: "normal" | "wide" | "tall";
}

// ── Anime ─────────────────────────────────────

export type AnimeStatus = "completed" | "watching" | "plan-to-watch" | "on-hold";

export interface Anime {
  id: number;
  title: string;
  titleJp: string;
  year: number;
  genres: string[];
  rating: number;
  cover: string;
  description: string;
  episodes: number;
  episodesWatched: number;
  status: AnimeStatus;
  favorite: boolean;
  studio: string;
  favoriteArc?: string;
  myalUrl?: string;
  gridSpan?: "normal" | "wide" | "tall";
}

// ── Playlist ──────────────────────────────────

export type SongMood = "focus" | "hype" | "chill" | "sad" | "energetic" | "lofi";

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  mood: SongMood;
  duration: string;         // "3:42"
  cover: string;
  appleMusicUrl: string;
  releaseYear: number;
  genre: string;
  isCurrentFavorite?: boolean;
}

// ── Gym Journey ───────────────────────────────

export type GymPhase = "beginner" | "intermediate" | "advanced";

export interface GymMilestone {
  id: number;
  date: string;             // "Jan 2023"
  phase: GymPhase;
  title: string;
  description: string;
  weight?: number;          // bodyweight in kg
  achievement?: string;
}

export interface PersonalRecord {
  id: number;
  lift: string;             // "Bench Press"
  weight: number;           // in kg
  reps: number;
  date: string;
  emoji: string;
}

export interface GymStats {
  daysTraining: number;     // total days since start
  currentWeight: number;    // kg
  startWeight: number;      // kg
  yearsTraining: number;
  favoriteDay: string;      // "Push Day"
  currentSplit: string;     // "PPL"
}

// ── Projects ──────────────────────────────────

export type ProjectStatus = "live" | "in-progress" | "archived";
export type ProjectType = "web-app" | "tool" | "library" | "game" | "portfolio";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: ProjectStatus;
  type: ProjectType;
  liveUrl?: string;
  githubUrl?: string;
  cover: string;
  featured: boolean;
  year: number;
  gridSpan?: "normal" | "wide" | "tall";
}

// ── Tech Stack ────────────────────────────────

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools"
  | "Learning";

export interface TechItem {
  id: number;
  name: string;
  icon: string;             // emoji or SVG path
  category: TechCategory;
  level: number;            // 1–5 proficiency
  yearsUsed: number;
  favorite?: boolean;
}

// ── KentoGrid ─────────────────────────────────

export type GridSpan = "normal" | "wide" | "tall" | "large";

export interface KentoCardProps {
  span?: GridSpan;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
}

// ── Three.js ──────────────────────────────────

export interface SceneProps {
  scrollProgress?: number;
  isVisible?: boolean;
}

export interface ParticleConfig {
  count: number;
  size: number;
  color: string;
  speed: number;
  spread: number;
}

// ── GSAP ──────────────────────────────────────

export interface ScrollRevealConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

export interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
}

// ── Audio ─────────────────────────────────────

export interface AmbientAudioState {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
}

// ── Section Refs ──────────────────────────────

export type SectionId =
  | "hero"
  | "about"
  | "projects"
  | "movies"
  | "anime"
  | "gym"
  | "playlist"
  | "contact";