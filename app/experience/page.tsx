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
    role: "Project Milaap — Global Leadership Camp",
    category: "Leadership",
    summary: "Selected for an intensive global leadership camp focused on peace-building and cross-cultural collaboration with international delegations.",
    insight: "Working with delegates from across the world on Project Milaap taught me that negotiation isn't about winning arguments — it's about finding the shared story underneath conflicting positions. A skill that directly sharpened my MUN game.",
    skills: ["#ConflictResolution", "#GlobalCitizenship", "#ProjectManagement"],
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
    role: "Sustainability & Wilderness Participant",
    category: "Leadership",
    summary: "Spent several days in the forests of Marayoor on an immersive rewilding course — building structures from earth, living close to nature, and learning sustainability from the ground up.",
    insight: "Building a house out of dirt with your hands resets your perspective on what problem-solving actually means. No spreadsheets, no strategy decks — just raw materials and resourcefulness. The kind of thinking that transfers everywhere.",
    skills: ["#Sustainability", "#ResourcefulThinking", "#Adaptability"],
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

const FILTERS = ["All", "Professional", "Leadership"];

const ODYSSEY_MENTOR_PHOTOS = [
  "/odyssey-mentor-photo-1.webp",
  "/odyssey-mentor-photo-2.webp",
  "/odyssey-mentor-photo-3.webp",
];
const ODYSSEY_ALBUM_URL = "https://drive.google.com/drive/u/0/folders/1dewYNAFuHRvArsHWRPgMNx6FP3ALL5lf";

const CATEGORY_COLOR: Record<string, string> = {
  Professional: "#1a6fff",
  Leadership: "#00c853",
};

export default function ExperienceVault() {
  const [filter, setFilter] = useState("All");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const filtered = EXPERIENCES.filter((e) => filter === "All" || e.category === filter);

  const highlightedIds = activeSkill ? SKILLS.find((s) => s.label === activeSkill)?.ids || [] : [];

  return (
    <main
      style={{
        background: "#07090e",
        color: "#dde4ee",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
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
          border: 1px solid #1a1e2e;
          background: transparent;
          color: #445566;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .filter-btn:hover { color: #dde4ee; border-color: #334455; }
        .filter-btn.active { background: #1a6fff; color: #fff; border-color: #1a6fff; }

        .timeline-line {
          position: absolute;
          left: 5px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #1a6fff44, #1a1e2e00);
        }

        .timeline-dot {
          position: absolute;
          left: 0; top: 1.6rem;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #1a6fff;
          border: 2px solid #07090e;
          box-shadow: 0 0 0 3px #1a6fff33;
          z-index: 2;
          transition: box-shadow 0.3s;
        }
        .timeline-dot.highlighted { box-shadow: 0 0 0 6px #1a6fff55; }

        .exp-card {
          background: #0d1117;
          border: 1px solid #111827;
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: all 0.25s;
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
        .exp-card:hover { border-color: #1a6fff33; transform: translateX(4px); }
        .exp-card:hover::before { background: #1a6fff; }
        .exp-card.highlighted { border-color: #1a6fff55; box-shadow: 0 0 20px #1a6fff15; }
        .exp-card.highlighted::before { background: #1a6fff; }
        .exp-card.dimmed { opacity: 0.3; }

        .skill-chip {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          background: #0f1520;
          color: #445566;
          border: 1px solid #1a1e2e;
        }

        .skill-grid-btn {
          padding: 0.45rem 0.9rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #1a1e2e;
          background: #0d1117;
          color: #556677;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .skill-grid-btn:hover { border-color: #1a6fff44; color: #aabbc8; }
        .skill-grid-btn.active { background: #0f1a2e; color: #1a6fff; border-color: #1a6fff66; }

        .photo-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: #0a0d14;
          border: 1px dashed #1a1e2e;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #334455;
          font-size: 0.78rem;
          margin-top: 1rem;
        }

        .origin-card {
          background: linear-gradient(135deg, #0d1117 0%, #0f1a2e 100%);
          border: 1px solid #1a6fff33;
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
          color: #1a6fff11;
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
          border-top: 1px solid #111827;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .carousel-wrap { margin-top: 1rem; }
        .carousel-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #0a0d14;
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
          z-index: 2;
        }
        .carousel-arrow:hover { background: rgba(26,111,255,0.65); border-color: #1a6fff; }
        .carousel-left { left: 0.625rem; }
        .carousel-right { right: 0.625rem; }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.625rem;
        }
        .carousel-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #1a1e2e;
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
          border: 1px solid #1a1e2e;
          background: transparent;
          text-decoration: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }
        .album-btn:hover { border-color: #1a6fff44; color: #dde4ee; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #0f1520", padding: "1.5rem 2rem" }}>
        <a href="/" style={{ color: "#445566", fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.08em" }}>
          ← SP.
        </a>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 900, marginTop: "0.2rem", letterSpacing: "-0.02em" }}>
          The Experience <span style={{ color: "#1a6fff" }}>Vault</span>
        </h1>
        <p style={{ color: "#556677", fontSize: "0.85rem", marginTop: "0.25rem", fontStyle: "italic" }}>
          From cultural immersion to strategic leadership. A timeline of adaptation and growth.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* TIMELINE */}
        <div style={{ position: "relative" }}>
          <div className="timeline-line" />
          {filtered.map((exp, i) => {
            const isHighlighted = highlightedIds.includes(exp.id);
            const isDimmed = activeSkill !== null && !isHighlighted;
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                data-id={exp.id}
                ref={(el) => {
                  itemRefs.current[exp.id] = el;
                }}
                style={{
                  position: "relative",
                  paddingLeft: "2.5rem",
                  opacity: visible[exp.id] ? 1 : 0,
                  transform: visible[exp.id] ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.6s ease-out ${i * 0.1}s`,
                }}
              >
                <div className={`timeline-dot ${isHighlighted ? "highlighted" : ""}`} />
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
                        <span style={{ background: "#ffd70018", color: "#ffd700", border: "1px solid #ffd70033", borderRadius: "20px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700 }}>
                          ⭐ Latest
                        </span>
                      )}
                    </div>
                    <span style={{ color: "#334455", transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "none", display: "inline-block" }}>
                      →
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem" }}>{exp.title}</h3>
                  <div style={{ fontSize: "0.8rem", color: "#556677", marginBottom: "0.875rem" }}>{exp.role}</div>
                  <p style={{ fontSize: "0.875rem", color: "#8899aa", lineHeight: 1.7, marginBottom: "0.875rem" }}>{exp.summary}</p>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {exp.skills.map((s) => (
                      <span key={s} className="skill-chip">
                        {s}
                      </span>
                    ))}
                  </div>

                  {isExpanded && (
                    <div className="detail-expand">
                      <div style={{ fontSize: "0.68rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Key Insight
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "#aabbc8", lineHeight: 1.8, marginBottom: "1rem" }}>{exp.insight}</p>
                      {exp.id === 1 ? (
                        <div className="carousel-wrap" onClick={(e) => e.stopPropagation()}>
                          <div className="carousel-inner">
                            <Image
                              src={ODYSSEY_MENTOR_PHOTOS[carouselIndex]}
                              alt={`Odyssey Mentor photo ${carouselIndex + 1}`}
                              fill
                              style={{ objectFit: carouselIndex === 2 ? "contain" : "cover", objectPosition: carouselIndex === 2 ? "center" : "center", background: carouselIndex === 2 ? "#0a0d14" : "transparent" }}
                              sizes="(max-width: 768px) 100vw, 700px"
                            />
                            <button
                              className="carousel-arrow carousel-left"
                              onClick={() => setCarouselIndex((carouselIndex - 1 + ODYSSEY_MENTOR_PHOTOS.length) % ODYSSEY_MENTOR_PHOTOS.length)}
                              aria-label="Previous photo"
                            >‹</button>
                            <button
                              className="carousel-arrow carousel-right"
                              onClick={() => setCarouselIndex((carouselIndex + 1) % ODYSSEY_MENTOR_PHOTOS.length)}
                              aria-label="Next photo"
                            >›</button>
                          </div>
                          <div className="carousel-dots">
                            {ODYSSEY_MENTOR_PHOTOS.map((_, i) => (
                              <button
                                key={i}
                                className={`carousel-dot ${i === carouselIndex ? "active" : ""}`}
                                onClick={() => setCarouselIndex(i)}
                                aria-label={`Photo ${i + 1}`}
                              />
                            ))}
                          </div>
                          <a
                            href={ODYSSEY_ALBUM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="album-btn"
                          >
                            📁 View Full Album →
                          </a>
                        </div>
                      ) : (
                        <div className="photo-placeholder">
                          <span style={{ fontSize: "1.5rem" }}>📷</span>
                          <span>Photo placeholder — AirDrop to Mac, drop in /public folder</span>
                          <span style={{ fontSize: "0.68rem", color: "#223344" }}>Recommended: 1200×675px</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ORIGIN STORY */}
        <div style={{ marginBottom: "3rem", paddingLeft: "2.5rem" }}>
          <div className="origin-card">
            <span className="section-tag">Origin Story</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.6, color: "#dde4ee", position: "relative", zIndex: 1 }}>
              "Bootstrapped a stone-trading project to fund my first stock market entries — then used the returns to buy my PS5."
            </p>
            <p style={{ fontSize: "0.78rem", color: "#445566", marginTop: "0.75rem" }}>The moment finance stopped being theoretical.</p>
          </div>
        </div>

        {/* SKILL STACK */}
        <div>
          <span className="section-tag">Skill Stack</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.4rem" }}>What I've Built</h2>
          <p style={{ color: "#556677", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
            Click a skill to highlight related experiences.
            {activeSkill && (
              <span
                style={{ color: "#1a6fff", marginLeft: "0.5rem", cursor: "pointer" }}
                onClick={() => setActiveSkill(null)}
              >
                Clear ✕
              </span>
            )}
          </p>
          {["Strategic", "Interpersonal"].map((cat) => (
            <div key={cat} style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.68rem", color: "#334455", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{cat}</div>
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

