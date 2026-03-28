"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Finance Lab", href: "/finance" },
  { label: "MUN Arena", href: "/mun" },
  { label: "Experience", href: "/experience" },
  { label: "Passport", href: "/passport" },
  { label: "Connect", href: "/connect" },
];

const CONTACTS = [
  {
    platform: "Email",
    icon: "✉",
    handle: "shivaanpatwa@gmail.com",
    action: () => window.open("mailto:shivaanpatwa@gmail.com"),
    cta: "Send a message",
  },
  {
    platform: "Instagram",
    icon: "📸",
    handle: "@sh1vaan_",
    action: () => window.open("https://www.instagram.com/sh1vaan_", "_blank"),
    cta: "Open Instagram",
  },
  {
    platform: "Snapchat",
    icon: "👻",
    handle: "@patwaaaa13",
    action: () => navigator.clipboard.writeText("patwaaaa13"),
    cta: "Copy username",
  },
];

export default function ConnectPage() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("sp-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("sp-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContact = (c: typeof CONTACTS[0]) => {
    c.action();
    if (c.platform === "Snapchat") {
      setCopied("Snapchat username copied!");
      setTimeout(() => setCopied(null), 2500);
    }
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@1,400;1,600;1,700&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
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
        .nav-link.cur { color: #fff; }
        .nav-link.cur::after { width: 100%; }

        .contact-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-3);
          box-shadow: var(--card-shadow);
          border-radius: 18px;
          padding: 2rem 2.25rem;
          cursor: pointer;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          text-align: left;
          width: 100%;
        }
        .contact-card:hover {
          border-color: rgba(26,111,255,0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(26,111,255,0.12);
        }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(8,10,15,0.98);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 5rem;
          gap: 2rem;
        }
        .mobile-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          color: #fff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #1a6fff; }

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
          background: radial-gradient(ellipse, rgba(26,111,255,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .cards-grid { grid-template-columns: 1fr !important; }

          .contact-card {
            padding: 1.5rem !important;
            min-height: 44px;
          }

          nav {
            padding: 0.875rem 1.25rem !important;
          }

          .page-content {
            padding: 7rem 1.25rem 4rem !important;
          }
        }

        @media (max-width: 480px) {
          .page-content {
            padding: 6rem 1rem 3rem !important;
          }

          .contact-card {
            padding: 1.25rem !important;
          }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: scrollY > 40 ? "1px solid var(--border)" : "1px solid transparent",
        background: scrollY > 40 ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        transition: "all 0.3s",
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>SP.</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, transition: "all 0.2s" }}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: "8px", color: "var(--text-sec)", cursor: "pointer", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }} aria-label="Open menu">☰</button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      {/* PAGE CONTENT */}
      <div className="page-content" style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "9rem 2rem 6rem" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a6fff", marginBottom: "0.75rem", fontFamily: "'DM Mono', monospace" }}>
            — Get in touch
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--text)",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}>
            Connect.
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--text-sec)",
            maxWidth: 560,
            lineHeight: 1.75,
            fontWeight: 300,
          }}>
            Whether you're here to collaborate, connect, or just say hello — my inbox is always open.
          </p>
        </div>

        {/* DIVIDER */}
        <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, #1a6fff, transparent)", borderRadius: 2, marginBottom: "3rem" }} />

        {/* CONTACT CARDS */}
        <div
          className="cards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "4rem" }}
        >
          {CONTACTS.map((c) => (
            <button key={c.platform} className="contact-card" onClick={() => handleContact(c)}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{c.icon}</div>
              <div style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3a5080", marginBottom: "0.4rem" }}>
                {c.platform}
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "1rem", wordBreak: "break-all" }}>
                {c.handle}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#1a6fff", fontWeight: 500 }}>
                {c.cta} →
              </div>
            </button>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
          © 2026 Shivaan Patwa
        </div>
      </div>

      {/* COPY TOAST */}
      {copied && (
        <div style={{
          position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          background: "var(--bg-elevated)", border: "1px solid rgba(26,111,255,0.4)",
          borderRadius: "10px", padding: "0.75rem 1.5rem",
          color: "var(--text)", fontSize: "0.85rem", fontWeight: 500,
          zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          ✓ {copied}
        </div>
      )}
    </main>
  );
}
