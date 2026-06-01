import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { KentoCard } from "@/components/ui/KentoCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TechStack } from "./TechStack";
// import styles from "./About.module.css";
import styles from "../About/About.module.css"

const currently = [
  {
    emoji: "⚡",
    text: "<strong>Building</strong> Solo Dev Coding App — gamified dungeon-based coding platform",
  },
  {
    emoji: "🎙️",
    text: "<strong>Planning</strong> VoiceScroll AI — voice-controlled teleprompter with Web Audio API",
  },
  {
    emoji: "📚",
    text: "<strong>Learning</strong> Namaste React by Akshay Saini — deepening React fundamentals",
  },
  {
    emoji: "💼",
    text: "<strong>Working</strong> at Comcast as a Frontend Engineer",
  },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <ScrollReveal direction="up">
        <div className={styles.header}>
          <span className="section-eyebrow">Who I am</span>
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {/* Bio card — wide */}
        <KentoCard span="wide" delay={0}>
          <div className={styles.bioCard}>
            <div className={styles.bioTop}>
              <div className={styles.avatar}>👨‍💻</div>
              <div>
                <p className={styles.bioName}>Dineshkumar Thangaraj</p>
                <p className={styles.bioRole}>Frontend Engineer · Chennai, India</p>
              </div>
            </div>
            <p className={styles.bioText}>
              I'm a frontend engineer who loves crafting pixel-perfect, performant
              web experiences. My stack is React + TypeScript with a deep love for
              animation — GSAP, Framer Motion, and Three.js are my playgrounds.
              When I'm not coding, I'm either at the gym, watching anime, or
              discovering new music on Apple Music.
            </p>
            <TechStack />
          </div>
        </KentoCard>

        {/* Stat cards */}
        {[
          { value: "2+",  desc: "Years of\nFrontend Dev",    emoji: "📅" },
          { value: "10+", desc: "Projects\nShipped",         emoji: "🚀" },
          { value: "730", desc: "Days in\nthe Gym",          emoji: "💪" },
          { value: "500", desc: "Naruto\nEpisodes Watched",  emoji: "🍥" },
        ].map((s, i) => (
          <KentoCard key={s.value} span="normal" delay={i * 80}>
            <div className={styles.statCard}>
              <span style={{ fontSize: "1.75rem" }}>{s.emoji}</span>
              <div>
                <p className={styles.statNum}>{s.value}</p>
                <p className={styles.statDesc} style={{ whiteSpace: "pre-line" }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </KentoCard>
        ))}

        {/* Currently working on */}
        <KentoCard span="wide" delay={200}>
          <p className={styles.techTitle} style={{ marginBottom: "1rem" }}>
            Currently
          </p>
          <div className={styles.currentCard}>
            {currently.map((item, i) => (
              <div key={i} className={styles.currentItem}>
                <span className={styles.currentEmoji}>{item.emoji}</span>
                <p
                  className={styles.currentText}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        </KentoCard>
      </div>
    </SectionWrapper>
  );
}