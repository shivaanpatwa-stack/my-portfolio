"use client";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Finance Lab", href: "/finance" },
  { label: "MUN Arena", href: "/mun" },
  { label: "Experience", href: "/experience" },
  { label: "Passport", href: "/passport" },
  { label: "Connect", href: "/connect" },
];

const STATS = [
  { value: "18", label: "MUN Conferences", sub: "15 Delegate · 3 Chair" },
  { value: "29", label: "Countries Explored", sub: "& counting" },
  { value: "10+", label: "Sports Played", sub: "always competing" },
  { value: "1", label: "Vision", sub: "for a Digital Future" },
];

const FACTS = [
  "Executed my first investment at 10 years old and have been tracking markets ever since.",
  "29 countries stamped in the passport — the mission is to see them all.",
  "Started a project selling semi-precious stones, invested the cash into stocks, and bought my PS5 with the profits.",
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reg = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  const fade = (id: string, delay = 0) =>
    `transition-all duration-700 ease-out ${delay ? `delay-[${delay}ms]` : ""} ${
      visible[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <main
      style={{
        background: "#080a0f",
        color: "#e8eaf0",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=Playfair+Display:wght@700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080a0f; }
        ::-webkit-scrollbar-thumb { background: #1a6fff; border-radius: 2px; }

        .nav-link {
          color: #8899aa;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #1a6fff;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        .stat-card {
          border: 1px solid #111827;
          border-radius: 12px;
          padding: 1.25rem;
          background: #0d1117;
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          border-color: #1a6fff44;
          transform: translateY(-4px);
        }

        .fact-item {
          border-left: 2px solid #1a1e2e;
          padding: 0.75rem 1.25rem;
          transition: border-color 0.3s;
        }
        .fact-item:hover { border-color: #1a6fff; }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-decoration: none;
        }
        .cta-primary {
          background: #1a6fff;
          color: #fff;
        }
        .cta-primary:hover {
          background: #2d7dff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px #1a6fff44;
        }
        .cta-secondary {
          background: transparent;
          color: #8899aa;
          border: 1px solid #1a1e2e;
        }
        .cta-secondary:hover {
          border-color: #1a6fff44;
          color: #fff;
          transform: translateY(-2px);
        }

        .now-card {
          background: #0d1117;
          border: 1px solid #111827;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
        }

        .now-row {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid #111827;
        }
        .now-row:last-child { border-bottom: none; }

        .now-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: #0f1a2e;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .blue-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #1a6fff;
          animation: pulse 2s infinite;
          display: inline-block;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a6fff;
          margin-bottom: 0.5rem;
        }

        .social-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          border: 1px solid #1a1e2e;
          display: flex; align-items: center; justify-content: center;
          color: #8899aa;
          text-decoration: none;
          font-size: 1.1rem;
          transition: all 0.2s;
        }
        .social-icon:hover {
          border-color: #1a6fff;
          color: #1a6fff;
          transform: translateY(-2px);
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(26,111,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,111,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .glow {
          position: fixed;
          top: -20vh; left: 50%;
          transform: translateX(-50%);
          width: 70vw; height: 60vh;
          background: radial-gradient(ellipse, rgba(26,111,255,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(8,10,15,0.98);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }
        .mobile-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #1a6fff; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }

          .hero-cta-group {
            flex-direction: column;
          }
          .hero-cta-group .cta-btn {
            width: 100%;
            justify-content: center;
          }

          .now-row { gap: 0.625rem; }
        }

        @media (max-width: 480px) {
          nav { padding: 0.75rem 1rem !important; }
        }
      `}</style>

      {/* Background effects */}
      <div className="grid-bg" />
      <div className="glow" />

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrollY > 40 ? "1px solid #111827" : "1px solid transparent",
          background: scrollY > 40 ? "rgba(8,10,15,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
          transition: "all 0.3s",
        }}
      >
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}>SP.</span>
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="mailto:shivaanpatwa@gmail.com" className="cta-btn cta-primary" style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}>
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "1px solid #1a1e2e", borderRadius: 8, color: "#8899aa", fontSize: "1.2rem", cursor: "pointer", padding: "0.4rem 0.6rem", lineHeight: 1 }}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem 2rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
            Shivaan<br />
            <span style={{ color: "#1a6fff" }}>Patwa.</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#8899aa", maxWidth: 600, lineHeight: 1.7, marginBottom: "0.75rem", fontWeight: 300 }}>
            A future in finance, a history in MUN, and an obsession with global change.
          </p>

          <p style={{ fontSize: "0.95rem", color: "#556677", maxWidth: 560, lineHeight: 1.8, marginBottom: "2rem" }}>
            I don't just observe global systems — I analyze them, debate them, and look for the cracks. Whether I'm drafting a UN resolution or dissecting the risks of a cashless economy, I'm driven by a singular goal: understanding the forces that shape our world.
          </p>

          <div className="hero-cta-group" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/finance" className="cta-btn cta-primary">The Finance Lab →</a>
            <a href="/mun" className="cta-btn cta-secondary">The MUN Arena →</a>
            <a href="/experience" className="cta-btn cta-secondary">Experience →</a>
            <a href="/passport" className="cta-btn cta-secondary">The Passport →</a>
          </div>
        </section>

        {/* STATS */}
        <section
          id="stats"
          ref={reg("stats")}
          style={{ padding: "2rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div className={fade("stats")} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.75rem", fontWeight: 900, color: "#1a6fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", marginTop: "0.4rem", color: "#e8eaf0" }}>{s.label}</div>
                <div style={{ fontSize: "0.73rem", color: "#556677", marginTop: "0.2rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONAL QUOTE */}
        <section
          id="quote"
          ref={reg("quote")}
          style={{ padding: "2.5rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div className={fade("quote")} style={{
            background: "linear-gradient(135deg, #0d1117 0%, #0a0f1a 100%)",
            border: "1px solid #1a2235",
            borderRadius: "20px",
            padding: "3rem 3.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* subtle glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80%", height: "80%", background: "radial-gradient(ellipse, rgba(26,111,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 0.8, color: "#1a6fff", marginBottom: "0.5rem", opacity: 0.9 }}>"</div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.15rem, 3vw, 1.6rem)",
                fontWeight: 700,
                color: "#e8eaf0",
                lineHeight: 1.65,
                maxWidth: 720,
                margin: "0 auto",
                letterSpacing: "-0.01em",
              }}>
                Wealth. Unforgettable experiences. Every country on the map. And the right people to share it with. That's all I want.
              </p>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 0.8, color: "#1a6fff", marginTop: "0.5rem", opacity: 0.9, textAlign: "right", maxWidth: 720, margin: "0.5rem auto 0" }}>"</div>
              <div style={{ marginTop: "1.5rem", width: 40, height: 2, background: "#1a6fff", margin: "1.5rem auto 0", borderRadius: 2 }} />
              <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#334455", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Shivaan Patwa</div>
            </div>
          </div>
        </section>

        {/* THE NOW */}
        <section
          id="now"
          ref={reg("now")}
          style={{ padding: "2.5rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div className={fade("now")}>
            <div className="section-tag"><span className="blue-dot" /> Live Update</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "1.25rem" }}>The Now</h2>
            <div className="now-card">
              {[
                { icon: "📄", label: "Current Deep Dive", value: "Researching for the 2026 John Locke Essay", sub: '"Should we fear a cashless society?"' },
                { icon: "📖", label: "On the Nightstand", value: "The Inheritance Games", sub: "by Jennifer Lynn Barnes" },
                { icon: "🎵", label: "On Repeat", value: "Signs", sub: "Drake" },
                { icon: "📍", label: "Current Location", value: "Mumbai, India", sub: "" },
              ].map((row, i) => (
                <div key={i} className="now-row">
                  <div className="now-icon">{row.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#556677", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{row.label}</div>
                    <div style={{ fontWeight: 600, color: "#e8eaf0" }}>{row.value}</div>
                    {row.sub && <div style={{ fontSize: "0.82rem", color: "#1a6fff", marginTop: "0.15rem" }}>{row.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FACT SHEET */}
        <section
          id="facts"
          ref={reg("facts")}
          style={{ padding: "2.5rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div className={fade("facts")}>
            <div className="section-tag">⚡ Quick Facts</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "1.25rem" }}>The Fact Sheet</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FACTS.map((f, i) => (
                <div key={i} className="fact-item" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span style={{ color: "#1a6fff", fontWeight: 700, fontSize: "0.8rem", marginRight: "1rem", fontFamily: "monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "#aabbc0", fontSize: "0.95rem" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          ref={reg("contact")}
          style={{ padding: "3rem 2rem 4rem", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}
        >
          <div className={fade("contact")}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Get in Touch</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
              Let's talk <span style={{ color: "#1a6fff" }}>strategy.</span>
            </h2>
            <p style={{ color: "#556677", marginBottom: "1.75rem", fontSize: "0.95rem" }}>Open to collaborations, debates, and interesting conversations.</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.75rem" }}>
              <a href="https://linkedin.com" className="social-icon" title="LinkedIn">in</a>
              <a href="https://www.instagram.com/sh1vaan_" className="social-icon" title="Instagram">ig</a>
              <a href="mailto:shivaanpatwa@gmail.com" className="social-icon" title="Email">✉</a>
            </div>

            <button className="cta-btn cta-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
              onClick={() => alert("Resume generator coming soon!")}>
              📄 Generate My Resume
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid #111827", padding: "1.5rem 2rem", textAlign: "center", color: "#334455", fontSize: "0.8rem" }}>
          © 2026 Shivaan Patwa. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
