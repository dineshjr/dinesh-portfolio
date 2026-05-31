import type { GymMilestone, PersonalRecord, GymStats } from "@/types";

export const gymStats: GymStats = {
  daysTraining: 730,
  currentWeight: 72,
  startWeight: 62,
  yearsTraining: 2,
  favoriteDay: "Push Day",
  currentSplit: "PPL (Push Pull Legs)",
};

export const gymMilestones: GymMilestone[] = [
  {
    id: 1,
    date: "Jan 2023",
    phase: "beginner",
    title: "Day One 💪",
    description:
      "Walked into the gym for the first time. Had no clue what I was doing — just picked up dumbbells and hoped for the best. Started at 62kg, felt completely lost but loved the atmosphere.",
    weight: 62,
    achievement: "First gym session ever",
  },
  {
    id: 2,
    date: "Mar 2023",
    phase: "beginner",
    title: "First Noticeable Pump",
    description:
      "After 2 months of consistency, finally started seeing changes. Veins showing on forearms after workouts. The addiction begins. Switched to a structured PPL split.",
    weight: 64,
    achievement: "Consistent 4x per week",
  },
  {
    id: 3,
    date: "Jun 2023",
    phase: "beginner",
    title: "Bench Press Milestone",
    description:
      "Hit my first 60kg bench press. Sounds small but felt monumental. Proper form finally clicking, starting to understand progressive overload.",
    weight: 65,
    achievement: "60kg Bench Press",
  },
  {
    id: 4,
    date: "Sep 2023",
    phase: "intermediate",
    title: "Physique Transformation Visible",
    description:
      "6 months in and the mirror doesn't lie. Shoulders getting broader, chest fuller, arms noticeably bigger. Friends and family starting to notice. Motivation through the roof.",
    weight: 67,
    achievement: "Visible physique change",
  },
  {
    id: 5,
    date: "Jan 2024",
    phase: "intermediate",
    title: "One Year Mark 🔥",
    description:
      "One full year of training. +5kg of muscle mass. PRs on every major lift. Gym is no longer just exercise — it's therapy, discipline, and a daily non-negotiable.",
    weight: 68,
    achievement: "1 Year Anniversary",
  },
  {
    id: 6,
    date: "Apr 2024",
    phase: "intermediate",
    title: "100kg Deadlift",
    description:
      "Pulled 100kg for the first time. The 3-plate deadlift has always been a mental goal. Proper hip hinge form, leg drive, breathing locked in. Felt like a warrior.",
    weight: 70,
    achievement: "100kg Deadlift",
  },
  {
    id: 7,
    date: "Aug 2024",
    phase: "intermediate",
    title: "Diet Overhaul",
    description:
      "Started tracking macros seriously. 2800 calories, 160g protein daily. The gym results compounded significantly once nutrition was dialed in. Sleep, protein, progressive overload — the holy trinity.",
    weight: 71,
    achievement: "Nutrition mastery",
  },
  {
    id: 8,
    date: "Jan 2025",
    phase: "advanced",
    title: "Two Years Strong 🏆",
    description:
      "Two years in. 72kg, leaner than ever. The journey has taught me more about discipline, patience, and consistency than anything else in life. The gym is my dojo.",
    weight: 72,
    achievement: "2 Year Journey",
  },
];

export const personalRecords: PersonalRecord[] = [
  {
    id: 1,
    lift: "Bench Press",
    weight: 90,
    reps: 1,
    date: "Dec 2024",
    emoji: "🏋️",
  },
  {
    id: 2,
    lift: "Deadlift",
    weight: 120,
    reps: 1,
    date: "Nov 2024",
    emoji: "💀",
  },
  {
    id: 3,
    lift: "Squat",
    weight: 100,
    reps: 1,
    date: "Oct 2024",
    emoji: "🦵",
  },
  {
    id: 4,
    lift: "Overhead Press",
    weight: 60,
    reps: 1,
    date: "Jan 2025",
    emoji: "🔝",
  },
  {
    id: 5,
    lift: "Barbell Row",
    weight: 80,
    reps: 5,
    date: "Nov 2024",
    emoji: "🔙",
  },
  {
    id: 6,
    lift: "Pull-ups",
    weight: 0,
    reps: 15,
    date: "Dec 2024",
    emoji: "⬆️",
  },
];

export const gymPhilosophy = [
  "Consistency > Intensity",
  "Progressive overload is everything",
  "Sleep is the real anabolic",
  "Ego lifts get you injured, not big",
  "The pump is temporary, the discipline is permanent",
];

export const currentRoutine = {
  split: "PPL 6x/week",
  days: [
    { day: "Monday",    focus: "Push (Chest / Shoulders / Triceps)" },
    { day: "Tuesday",   focus: "Pull (Back / Biceps / Rear Delts)" },
    { day: "Wednesday", focus: "Legs (Quads / Hamstrings / Calves)" },
    { day: "Thursday",  focus: "Push (Variation)" },
    { day: "Friday",    focus: "Pull (Variation)" },
    { day: "Saturday",  focus: "Legs (Variation)" },
    { day: "Sunday",    focus: "Rest / Active Recovery" },
  ],
};