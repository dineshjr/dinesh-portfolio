import { useState } from "react";
import { techStack, techCategories } from "@/data/techStack";
import { LofiTag } from "@/components/ui/LofiTag";
// import styles from "./About.module.css";
import styles from "./About.module.css";

export function TechStack() {
    const [activeCategory, setActiveCategory] = useState<string>("Frontend");

    const filtered = techStack.filter((t) => t.category === activeCategory);

    return (
        <div className={styles.techSection}>
            <p className={styles.techTitle}>Tech Stack</p>

            {/* Category filters */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {techCategories.map((cat) => (
                    <LofiTag
                        key={cat}
                        active={activeCategory === cat}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </LofiTag>
                ))}
            </div>

            <div className={styles.techGrid}>
                {filtered.map((tech) => (
                    <div key={tech.id} className={styles.techItem}>
                        <span>{tech.icon}</span>
                        <span>{tech.name}</span>
                        <span className={styles.levelDots}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.dot} ${i < tech.level ? styles.dotFilled : ""}`}
                                />
                            ))}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}