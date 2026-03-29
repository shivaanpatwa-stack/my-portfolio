"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const EXPERIENCES = [
  {
    id: 1,
    year: "Jan 2026",
    title: "Odyssey: The Mentor",
    role: "Mentor & Program Leader",
    category: "Professional",
    summary: "Returned to Odyssey not as a student, but as a mentor — responsible for guiding the next cohort through the same program that shaped my own development.",
    insight: "The shift from participant to mentor forced a completely different kind of intelligence. It wasn't about performing anymore — it was about reading the room, adapting on the fly, and making others feel seen. That's a skill no classroom teaches.",
    skills: ["#Leadership", "#Mentorship", "#TeamDynamics"],
    photo: null,
    highlight: true,
  },
  {
    id: 2,
    year: "Jun–Jul 2025",
    title: "CISV Step Up: Panheli",
    role: "Participant",
    category: "Leadership",
    summary: "A 23-day international peace education camp where delegations from 10 countries — Italy, Spain, Mongolia, Vietnam, Sweden, Latvia, Mexico and more — came together to plan and run activities around a shared theme. Our camp's theme was Project Milaap. CISV Step Up is designed for teenagers to take a leading role in organising activities rooted in peace education, cross-cultural exchange, and global issues.",
    insight: "Being in a room with teenagers from Mongolia, Italy, Sweden, and Mexico — none of you sharing a first language — and still managing to build something together taught me that communication is mostly not words. You read body language, you find humour, you create shared context from scratch. The camp theme was peace, but the real lesson was that collaboration at its core is about choosing to understand someone before you need to.",
    skills: ["#PeaceEducation", "#CrossCultural", "#Leadership"],
    photo: null,
    highlight: false,
  },
  {
    id: 3,
    year: "2024–2025",
    title: "Odyssey: The Full Course",
    role: "Student Participant — Grade 7",
    category: "Leadership",
    summary: "Completed the full Odyssey leadership development program across the entire academic year, building communication, self-awareness, and teamwork from the ground up.",
    insight: "This was the foundation. Everything I learned about reading people, speaking with intention, and functioning in a team was built here. It's the reason I was invited back as a mentor.",
    skills: ["#CriticalThinking", "#Collaboration", "#PublicSpeaking"],
    photo: null,
    highlight: false,
  },
  {
    id: 4,
    year: "2024",
    title: "Rewilding: Marayoor",
    role: "Participant",
    category: "Environment",
    summary: "A nature immersion program in Marayoor where we disconnected from the modern world and lived in natural environments. We built a gate entirely from natural materials like clay and mud, explored local ecosystems, and developed a deeper connection with the natural world.",
    insight: "There's something quietly radical about spending a week without a screen and building something real with your hands. No notifications, no optimisation — just clay, effort, and a finished gate that stands because you willed it to. In an age where everything moves fast and nothing feels tangible, Marayoor reminded me that slowness isn't a weakness. Sometimes the most important work happens when you stop scrolling and start digging.",
    skills: ["#Environment", "#Sustainability", "#NatureImmersion"],
    photo: null,
    highlight: false,
  },
  {
    id: 5,
    year: "2023–2024",
    title: "The Stone Trading Project",
    role: "Founder & Sole Trader — Grade 6/7",
    category: "Professional",
    summary: "Bootstrapped a small business selling stones to classmates and peers. Used the profits to fund my first entries into the stock market.",
    insight: "This was the moment finance stopped being theoretical. I wasn't reading about markets — I was in them, with money I had actually earned. The PS5 at the end was the trophy, but the real win was figuring out that capital can be created from scratch.",
    skills: ["#Entrepreneurship", "#FinancialLiteracy", "#Initiative"],
    photo: null,
    highlight: false,
  },
];

const LEARNED_SKILLS: Record<number, string[]> = {
  1: ["Leadership", "Mentorship", "Emotional Intelligence", "Team Dynamics", "Program Management"],
  2: ["Cross-Cultural Communication", "Peace Education", "Collaboration", "Global Awareness", "Event Planning"],
  4: ["Sustainability", "Hands-on Building", "Nature Literacy", "Mindfulness", "Teamwork"],
};

const SKILLS = [
  { label: "Leadership", category: "Strategic", ids: [1, 2, 3] },
  { label: "Mentorship", category: "Strategic", ids: [1] },
  { label: "Project Management", category: "Strategic", ids: [2] },
  { label: "Entrepreneurship", category: "Strategic", ids: [5] },
  { label: "Financial Literacy", category: "Strategic", ids: [5] },
  { label: "Sustainability", category: "Strategic", ids: [4] },
  { label: "Cross-Cultural Communication", category: "Interpersonal", ids: [2, 3] },
  { label: "Conflict Resolution", category: "Interpersonal", ids: [2] },
  { label: "Collaboration", category: "Interpersonal", ids: [3] },
  { label: "Public Speaking", category: "Interpersonal", ids: [3] },
  { label: "Adaptability", category: "Interpersonal", ids: [4, 1] },
];

const FILTERS = ["All", "Professional", "Leadership", "Environment"];

const ODYSSEY_MENTOR_PHOTOS = [
  "/odyssey-mentor-photo-1.webp",
  "/odyssey-mentor-photo-2.webp",
  "/odyssey-mentor-photo-3.webp",
];
const ODYSSEY_ALBUM_URL = "https://drive.google.com/drive/u/0/folders/1dewYNAFuHRvArsHWRPgMNx6FP3ALL5lf";

const CISV_PHOTOS = [
  "/CISV-photo-1.jpg",
  "/CISV-photo-2.JPG",
  "/CISV-photo-3.JPG",
  "/CISV-photo-4.JPG",
];

const REWILDING_PHOTOS = [
  "/Rewilding-photo-1.jpg",
  "/Rewilding-photo-2.JPG",
  "/Rewilding-photo-3.JPG",
];

const CAROUSEL_DATA: Record<number, { photos: string[]; albumUrl?: string }> = {
  1: { photos: ODYSSEY_MENTOR_PHOTOS, albumUrl: ODYSSEY_ALBUM_URL },
  2: { photos: CISV_PHOTOS },
  4: { photos: REWILDING_PHOTOS },
};

const CATEGORY_COLOR: Record<string, string> = {
  Professional: "#1a6fff",
  Leadership: "#00c853",
  Environment: "#2d9e6b",
};

const PARALLAX_RATES = [0.015, -0.012, 0.018, -0.01, 0.012];

export default function ExperienceVault() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [filter, setFilter] = useState("All");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [carouselIndexes, setCarouselIndexes] = useState<Record<number, number>>({});
  const [scrollY, setScrollY] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = Number((e.target as HTMLElement).dataset.id);
          if (e.isIntersecting) setVisible((v) => ({ ...v, [id]: true }));
        });
      },
      { threshold: 0.1 }
    );
    Object.values(itemRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        if (timelineRef.current) {
          const rect = timelineRef.current.getBoundingClientRect();
          const progress = Math.min(100, Math.max(0,
            ((window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.4)) * 110
          ));
          setTimelineProgress(progress);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sp-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("sp-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const filtered = EXPERIENCES.filter((e) => filter === "All" || e.category === filter);
  const highlightedIds = activeSkill ? SKILLS.find((s) => s.label === activeSkill)?.ids || [] : [];

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1a6fff; border-radius: 2px; }

        .filter-btn {
          padding: 0.45rem 1rem;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          border: 1px solid var(--border-2);
          background: transparent;
          color: var(--text-muted);
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .filter-btn:hover { color: var(--text); border-color: var(--border-2); }
        .filter-btn.active { background: #1a6fff; color: #fff; border-color: #1a6fff; }

        /* Timeline track (dim background) */
        .timeline-track {
          position: absolute;
          left: 7px; top: 0; bottom: 0;
          width: 2px;
          background: var(--border-2);
          border-radius: 1px;
        }

        /* Animated progress line */
        .timeline-line {
          position: absolute;
          left: 7px; top: 0;
          width: 2px;
          background: linear-gradient(to bottom, #1a6fff, rgba(26,111,255,0.4), transparent);
          border-radius: 1px;
          transition: height 0.35s ease-out;
        }

        @keyframes dotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(26,111,255,0.8), 0 0 10px rgba(26,111,255,0.6); }
          60%  { box-shadow: 0 0 0 10px rgba(26,111,255,0), 0 0 20px rgba(26,111,255,0.2); }
          100% { box-shadow: 0 0 0 0 rgba(26,111,255,0), 0 0 8px rgba(26,111,255,0.5); }
        }

        .timeline-dot {
          position: absolute;
          left: 0; top: 1.6rem;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #6aaeff 0%, #1a6fff 55%, #0d4fd6 100%);
          border: 2px solid var(--bg);
          box-shadow: 0 0 8px rgba(26,111,255,0.55);
          z-index: 2;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .timeline-dot.pulsing { animation: dotPulse 1.6s ease-out; }
        .timeline-dot.highlighted {
          transform: scale(1.25);
          box-shadow: 0 0 0 5px rgba(26,111,255,0.25), 0 0 18px rgba(26,111,255,0.6);
        }

        /* Year label pinned just above each dot */
        .year-node-label {
          position: absolute;
          left: 0;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          font-weight: 700;
          color: rgba(26,111,255,0.7);
          letter-spacing: 0.06em;
          white-space: nowrap;
          pointer-events: none;
          line-height: 1;
        }

        .exp-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: transparent;
          transition: background 0.3s;
        }
        .exp-card:hover {
          border-color: rgba(26,111,255,0.4);
          transform: translateX(4px) translateY(-3px);
          box-shadow: 0 10px 36px rgba(26,111,255,0.18), 0 2px 8px rgba(0,0,0,0.18);
        }
        .exp-card:hover::before { background: #1a6fff; }
        .exp-card.highlighted { border-color: rgba(26,111,255,0.38); box-shadow: 0 0 24px rgba(26,111,255,0.12); }
        .exp-card.highlighted::before { background: #1a6fff; }
        .exp-card.dimmed { opacity: 0.3; }

        /* Image scale on card hover */
        .carousel-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transition: transform 0.45s ease;
        }
        .exp-card:hover .carousel-img-wrap { transform: scale(1.04); }

        .skill-chip {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          background: var(--bg-elevated2);
          color: var(--text-muted);
          border: 1px solid var(--border-2);
        }

        .learned-pill {
          display: inline-block;
          padding: 0.22rem 0.7rem;
          border-radius: 20px;
          font-size: 0.69rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #1a6fff;
          border: 1px solid rgba(26,111,255,0.38);
          background: rgba(26,111,255,0.06);
          transition: background 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .learned-pill:hover {
          background: rgba(26,111,255,0.13);
          box-shadow: 0 0 8px rgba(26,111,255,0.22);
        }

        .skill-grid-btn {
          padding: 0.45rem 0.9rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid var(--border-2);
          background: var(--bg-elevated);
          color: var(--text-muted);
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .skill-grid-btn:hover { border-color: rgba(26,111,255,0.3); color: var(--text-sec); }
        .skill-grid-btn.active { background: var(--bg-icon); color: #1a6fff; border-color: rgba(26,111,255,0.45); }

        .photo-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--bg-elevated2);
          border: 1px dashed var(--border-2);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.78rem;
          margin-top: 1rem;
        }

        .origin-card {
          background: linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-icon) 100%);
          border: 1px solid rgba(26,111,255,0.2);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .origin-card::after {
          content: '"';
          position: absolute;
          top: -1rem; right: 1.5rem;
          font-family: 'Playfair Display', serif;
          font-size: 8rem;
          color: rgba(26,111,255,0.07);
          line-height: 1;
        }

        .section-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a6fff;
          display: block;
          margin-bottom: 0.4rem;
        }

        .detail-expand {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .carousel-wrap { margin-top: 1rem; }
        .carousel-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--bg-elevated2);
          border-radius: 10px;
          overflow: hidden;
        }
        .carousel-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          width: 36px; height: 36px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.3rem;
          line-height: 1;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          z-index: 3;
        }
        .carousel-arrow:hover { background: rgba(26,111,255,0.65); border-color: #1a6fff; }
        .carousel-left { left: 0.625rem; }
        .carousel-right { right: 0.625rem; }
        .carousel-dots { display: flex; justify-content: center; gap: 0.5rem; margin-top: 0.625rem; }
        .carousel-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--border-2);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.2s;
        }
        .carousel-dot.active { background: #1a6fff; }

        .album-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.875rem;
          padding: 0.5rem 1.1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #8899aa;
          border: 1px solid var(--border-2);
          background: transparent;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }
        .album-btn:hover { border-color: rgba(26,111,255,0.3); color: var(--text); }

        .header-stat {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          border-radius: 20px;
          background: rgba(26,111,255,0.08);
          border: 1px solid rgba(26,111,255,0.2);
          font-size: 0.72rem;
          font-weight: 600;
          color: #1a6fff;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
        }

        @keyframes statFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .header-stat:nth-child(1) { animation: statFade 0.5s 0.2s ease-out both; }
        .header-stat:nth-child(2) { animation: statFade 0.5s 0.35s ease-out both; }
        .header-stat:nth-child(3) { animation: statFade 0.5s 0.5s ease-out both; }

        @media (max-width: 768px) {
          .exp-header { padding: 1.25rem 1rem !important; }
          .exp-main { padding: 1.5rem 1rem !important; }
          .exp-card { padding: 1.25rem !important; }
          .filter-btn { min-height: 44px; display: inline-flex; align-items: center; }
          .skill-grid-btn { min-height: 44px; display: inline-flex; align-items: center; }
          .carousel-arrow { width: 44px; height: 44px; }
          .origin-card { padding: 1.5rem !important; }
          .year-node-label { display: none; }
        }

        @media (max-width: 480px) {
          .exp-card { padding: 1rem !important; }
          .timeline-track, .timeline-line { display: none; }
        }

        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--bg-primary); z-index: 999;
          display: flex; flex-direction: column; align-items: center;
          justify-content: flex-start; padding-top: 5rem; gap: 2rem;
          backdrop-filter: blur(16px);
        }
        .mobile-nav-link {
          font-family: 'Playfair Display', serif; font-size: 2rem;
          color: var(--text); text-decoration: none; transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #1a6fff; }
      `}</style>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "var(--text)", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {[["Finance Lab", "/finance"], ["MUN Arena", "/mun"], ["Experience", "/experience"], ["The Passport", "/passport"], ["Connect", "/connect"]].map(([label, href]) => (
            <a key={label} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}

      {/* CINEMATIC HEADER */}
      <div
        className="exp-header"
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "2rem 2rem 1.75rem",
          background: "linear-gradient(135deg, rgba(26,111,255,0.07) 0%, rgba(26,111,255,0.02) 45%, transparent 70%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative radial glow */}
        <div style={{
          position: "absolute", top: -100, left: -80,
          width: 380, height: 380,
          background: "radial-gradient(ellipse, rgba(26,111,255,0.1) 0%, transparent 68%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
          <div>
            <a href="/" style={{ color: "var(--text-muted)", fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.08em" }}>
              ← SP.
            </a>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              fontWeight: 900,
              marginTop: "0.3rem",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}>
              Experience <span style={{ color: "#1a6fff" }}>Vault</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.4rem", fontStyle: "italic", maxWidth: 460 }}>
              From cultural immersion to strategic leadership — a timeline of adaptation and growth.
            </p>

            {/* Animated stats */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <span className="header-stat">5 Experiences</span>
              <span className="header-stat">2 Countries</span>
              <span className="header-stat">2023 – 2026</span>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {FILTERS.map((f) => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", flexShrink: 0 }}>
            <a href="/connect" style={{ display: "inline-flex", alignItems: "center", padding: "0.6rem 1.4rem", background: "#1a6fff", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Contact</a>
            <button onClick={toggleTheme} aria-label="Toggle theme" style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", transition: "all 0.2s" }}>{theme === "dark" ? "☀️" : "🌙"}</button>
            <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }} aria-label="Open menu">☰</button>
          </div>
        </div>
      </div>

      <div className="exp-main" style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* TIMELINE */}
        <div ref={timelineRef} style={{ position: "relative" }}>
          {/* Dim track */}
          <div className="timeline-track" />
          {/* Animated cobalt line */}
          <div className="timeline-line" style={{ height: `${timelineProgress}%` }} />

          {filtered.map((exp, i) => {
            const isHighlighted = highlightedIds.includes(exp.id);
            const isDimmed = activeSkill !== null && !isHighlighted;
            const isExpanded = expandedId === exp.id;
            const parallaxShift = Math.min(20, Math.max(-20, scrollY * PARALLAX_RATES[i % PARALLAX_RATES.length]));

            return (
              /* Entrance wrapper — handles fade + slide-in */
              <div
                key={exp.id}
                data-id={exp.id}
                ref={(el) => { itemRefs.current[exp.id] = el; }}
                style={{
                  opacity: visible[exp.id] ? 1 : 0,
                  transform: `translateX(${visible[exp.id] ? 0 : -20}px)`,
                  transition: `opacity 0.6s ease-out ${i * 0.1}s, transform 0.6s ease-out ${i * 0.1}s`,
                }}
              >
                {/* Parallax wrapper — handles scroll depth */}
                <div
                  style={{
                    position: "relative",
                    paddingLeft: "3.25rem",
                    transform: `translateY(${visible[exp.id] ? parallaxShift : 0}px)`,
                  }}
                >
                  {/* Year label above dot */}
                  <div className="year-node-label" style={{ top: "0.6rem" }}>
                    {exp.year}
                  </div>

                  {/* Glowing dot */}
                  <div className={`timeline-dot ${isHighlighted ? "highlighted" : ""} ${visible[exp.id] ? "pulsing" : ""}`} />

                  {/* Card */}
                  <div
                    className={`exp-card ${isHighlighted ? "highlighted" : ""} ${isDimmed ? "dimmed" : ""}`}
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#1a6fff", fontWeight: 700 }}>{exp.year}</span>
                        <span style={{ background: `${CATEGORY_COLOR[exp.category]}18`, color: CATEGORY_COLOR[exp.category], border: `1px solid ${CATEGORY_COLOR[exp.category]}33`, borderRadius: "20px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700 }}>
                          {exp.category}
                        </span>
                        {exp.highlight && (
                          <span style={{ background: "rgba(255,215,0,0.08)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "20px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700 }}>
                            ⭐ Latest
                          </span>
                        )}
                      </div>
                      <span style={{ color: "var(--text-muted)", transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "none", display: "inline-block" }}>
                        →
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem" }}>{exp.title}</h3>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.875rem" }}>{exp.role}</div>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.7, marginBottom: "0.875rem" }}>{exp.summary}</p>

                    {/* Hashtag skill chips */}
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {exp.skills.map((s) => (
                        <span key={s} className="skill-chip">{s}</span>
                      ))}
                    </div>

                    {/* What I Learned pills */}
                    {LEARNED_SKILLS[exp.id] && (
                      <div style={{ marginTop: "0.875rem", paddingTop: "0.875rem", borderTop: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                          What I Learned
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {LEARNED_SKILLS[exp.id].map((skill) => (
                            <span key={skill} className="learned-pill">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expanded section */}
                    {isExpanded && (
                      <div className="detail-expand">
                        <div style={{ fontSize: "0.68rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                          Key Insight
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-sec)", lineHeight: 1.8, marginBottom: "1rem" }}>{exp.insight}</p>
                        {(() => {
                          const carousel = CAROUSEL_DATA[exp.id];
                          if (!carousel) {
                            return (
                              <div className="photo-placeholder">
                                <span style={{ fontSize: "1.5rem" }}>📷</span>
                                <span>Photo placeholder — AirDrop to Mac, drop in /public folder</span>
                                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Recommended: 1200×675px</span>
                              </div>
                            );
                          }
                          const idx = carouselIndexes[exp.id] ?? 0;
                          const setIdx = (n: number) => setCarouselIndexes(prev => ({ ...prev, [exp.id]: n }));
                          return (
                            <div className="carousel-wrap" onClick={(e) => e.stopPropagation()}>
                              <div className="carousel-inner">
                                <div className="carousel-img-wrap">
                                  <Image
                                    src={carousel.photos[idx]}
                                    alt={`${exp.title} photo ${idx + 1}`}
                                    fill
                                    style={{
                                      objectFit: (exp.id === 1 && idx === 2) || exp.id === 4 ? "contain" : "cover",
                                      objectPosition: exp.id === 4 ? "center top" : "center",
                                      background: (exp.id === 1 && idx === 2) || exp.id === 4 ? "var(--bg-elevated2)" : "transparent",
                                    }}
                                    sizes="(max-width: 768px) 100vw, 700px"
                                  />
                                </div>
                                <button className="carousel-arrow carousel-left" onClick={() => setIdx((idx - 1 + carousel.photos.length) % carousel.photos.length)} aria-label="Previous photo">‹</button>
                                <button className="carousel-arrow carousel-right" onClick={() => setIdx((idx + 1) % carousel.photos.length)} aria-label="Next photo">›</button>
                              </div>
                              <div className="carousel-dots">
                                {carousel.photos.map((_, n) => (
                                  <button key={n} className={`carousel-dot ${n === idx ? "active" : ""}`} onClick={() => setIdx(n)} aria-label={`Photo ${n + 1}`} />
                                ))}
                              </div>
                              {carousel.albumUrl && (
                                <a href={carousel.albumUrl} target="_blank" rel="noopener noreferrer" className="album-btn">
                                  📁 View Full Album →
                                </a>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ORIGIN STORY */}
        <div style={{ marginBottom: "3rem", paddingLeft: "3.25rem" }}>
          <div className="origin-card">
            <span className="section-tag">Origin Story</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.6, color: "var(--text)", position: "relative", zIndex: 1 }}>
              "Bootstrapped a stone-trading project to fund my first stock market entries — then used the returns to buy my PS5."
            </p>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>The moment finance stopped being theoretical.</p>
          </div>
        </div>

        {/* SKILL STACK */}
        <div>
          <span className="section-tag">Skill Stack</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.4rem" }}>What I&apos;ve Built</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
            Click a skill to highlight related experiences.
            {activeSkill && (
              <span style={{ color: "#1a6fff", marginLeft: "0.5rem", cursor: "pointer" }} onClick={() => setActiveSkill(null)}>
                Clear ✕
              </span>
            )}
          </p>
          {["Strategic", "Interpersonal"].map((cat) => (
            <div key={cat} style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{cat}</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {SKILLS.filter((s) => s.category === cat).map((s) => (
                  <button
                    key={s.label}
                    className={`skill-grid-btn ${activeSkill === s.label ? "active" : ""}`}
                    onClick={() => setActiveSkill(activeSkill === s.label ? null : s.label)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
