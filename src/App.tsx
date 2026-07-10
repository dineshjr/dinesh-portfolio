import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    kind: "Full-stack product",
    title: "SoloDev",
    copy: "A dungeon-coded learning platform where developers clear challenges, earn XP, and grow a living skill tree.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    href: "https://github.com/dineshjr/SoloDev",
    visual: "dungeon",
  },
  {
    number: "02",
    kind: "Productivity system",
    title: "React Boards",
    copy: "A production-grade workflow board with fluid drag-and-drop, persistent state, and URL-synced filters.",
    tags: ["React", "Zustand", "dnd-kit", "CSS Modules"],
    href: "https://github.com/dineshjr/React-Boards",
    visual: "board",
  },
  {
    number: "03",
    kind: "Interactive portfolio",
    title: "Portfolio V1",
    copy: "A performance-first personal site refined from shader experiments into a silky, GPU-friendly experience.",
    tags: ["HTML", "CSS", "JavaScript", "GLSL"],
    href: "https://github.com/dineshjr/Dinesh-Site",
    visual: "signal",
  },
];

const capabilities = [
  ["Interface engineering", "Fast, responsive, accessible interfaces that feel as intentional as they look.", "React / TypeScript"],
  ["Motion & interaction", "Tactile feedback and transitions that pull people into the product story.", "GSAP / Framer Motion"],
  ["Creative development", "WebGL moments and visual systems that make a digital product hard to forget.", "Three.js / GLSL"],
];

const tools = ["React", "TypeScript", "Three.js", "GSAP", "Tailwind", "Redux", "Node.js", "Figma"];

function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={external ? "M8 16 16 8M9 8h7v7" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? scrollY / max : 0);
    };
    const onPointer = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      }
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    const frame = requestAnimationFrame(() => document.documentElement.classList.add("ready"));
    onScroll();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const tilt = (event: MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const box = visualRef.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    visualRef.current.style.setProperty("--x", `${x * 10}deg`);
    visualRef.current.style.setProperty("--y", `${y * -8}deg`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="cursor" ref={cursorRef} aria-hidden="true" />

      <header>
        <a className="brand" href="#top" onClick={closeMenu}>D<span>/</span>T</a>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <Arrow /></a>
        </nav>
        <button
          className="menu"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i /><i />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="available enter e1"><i /> Available for ambitious builds</div>
              <p className="eyebrow enter e2">Frontend engineer · Chennai, India</p>
              <h1 className="enter e3">I build digital <span>experiences that <em>hit.</em></span></h1>
              <p className="intro enter e4">
                Turning complex ideas into expressive, high-performance products with thoughtful code,
                strong visual taste, and just enough obsession.
              </p>
              <div className="actions enter e5">
                <a className="button primary" href="#work">See selected work <Arrow /></a>
                <a className="underlink" href="mailto:dineshkumar73717@gmail.com?subject=Let%27s%20build">
                  Let&apos;s make something wild ↗
                </a>
              </div>
            </div>

            <div
              className="hero-art enter e4"
              ref={visualRef}
              onMouseMove={tilt}
              onMouseLeave={() => {
                visualRef.current?.style.setProperty("--x", "0deg");
                visualRef.current?.style.setProperty("--y", "0deg");
              }}
            >
              <div className="art-grid" />
              <div className="orbit one"><b>TypeScript</b></div>
              <div className="orbit two"><b>Motion</b></div>
              <div className="core">
                <small>CREATIVE</small>
                <strong>DEV</strong>
                <small>Chennai · 13.08° N</small>
              </div>
              <div className="note note-a"><small>status</small>● shipping</div>
              <div className="note note-b"><small>target</small>60 fps</div>
            </div>
          </div>
          <div className="hero-foot enter e5"><span>Scroll to explore</span><i /><span>Design-minded. Performance-driven.</span></div>
        </section>

        <div className="marquee" aria-label="Core technologies">
          <div>{[...tools, ...tools].map((tool, index) => <span key={`${tool}-${index}`}>{tool} <i>✦</i></span>)}</div>
        </div>

        <section className="work section" id="work">
          <div className="section-head" data-reveal>
            <div><p className="eyebrow">Selected work / 2024—26</p><h2>Products with <em>a pulse.</em></h2></div>
            <p>Interfaces built to solve real problems without losing their personality.</p>
          </div>

          <div className="projects">
            {projects.map((project, index) => (
              <article className={`project project-${index + 1}`} key={project.title} data-reveal>
                <div className="project-copy">
                  <div className="project-meta"><span>{project.number}</span><span>{project.kind}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <a href={project.href} target="_blank" rel="noreferrer">View project <Arrow external /></a>
                </div>
                <div className={`project-art ${project.visual}`}>
                  {project.visual === "dungeon" && (
                    <div className="code-window">
                      <div className="window-bar"><i /><i /><i /><span>challenge.tsx</span></div>
                      <div className="code-lines"><i /><i /><i /><i /><i /></div>
                      <b><small>QUEST COMPLETE</small>+240 XP</b>
                    </div>
                  )}
                  {project.visual === "board" && (
                    <div className="board">
                      {["BACKLOG · 03", "IN PROGRESS · 02", "SHIPPED · 08"].map((label, i) => (
                        <div className={i === 1 ? "active" : ""} key={label}><small>{label}</small><i /><i /></div>
                      ))}
                    </div>
                  )}
                  {project.visual === "signal" && (
                    <div className="signal"><i /><i /><b>DK</b><small>rendering at the speed of thought</small></div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="work-end" data-reveal>
            <a className="button outline" href="https://github.com/dineshjr" target="_blank" rel="noreferrer">Dive into the code <Arrow external /></a>
            <span>More experiments live on GitHub</span>
          </div>
        </section>

        <section className="capabilities section" id="capabilities">
          <div className="cap-intro" data-reveal>
            <p className="eyebrow">How I create value</p>
            <h2>Sharp code.<br /><em>Loud ideas.</em></h2>
          </div>
          <div className="cap-list">
            {capabilities.map(([title, copy, tech], index) => (
              <article key={title} data-reveal>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <small>{tech}</small><b>↗</b>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-grid">
            <div data-reveal>
              <p className="eyebrow">Beyond the browser</p>
              <h2>Code. Lift.<br />Anime. <em>Repeat.</em></h2>
            </div>
            <div className="about-copy" data-reveal>
              <p>I&apos;m Dinesh, a frontend engineer who cares about the invisible details: the frame that never drops, the state that never surprises, and the interaction that feels obvious in hindsight.</p>
              <p>Away from the keyboard, you&apos;ll find me chasing a new PR at the gym, dissecting anime worlds, or building the next side project.</p>
              <div className="facts">
                <div><strong>13.08° N</strong><span>Chennai, India</span></div>
                <div><strong>730+</strong><span>Training days</span></div>
                <div><strong>∞</strong><span>Ideas in backlog</span></div>
              </div>
            </div>
          </div>
          <div className="tool-cloud" data-reveal>
            {tools.map((tool, index) => (
              <span style={{ "--i": index } as CSSProperties} key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-orb" />
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">Have a wild idea?</p>
            <h2>Good.<br /><em>Let&apos;s make it real.</em></h2>
            <a href="mailto:dineshkumar73717@gmail.com?subject=Let%27s%20build">
              dineshkumar73717@gmail.com <Arrow />
            </a>
          </div>
          <footer>
            <span>Dineshkumar Thangaraj © 2026</span>
            <div><a href="https://github.com/dineshjr">GitHub ↗</a><a href="#top">Back to top ↑</a></div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
