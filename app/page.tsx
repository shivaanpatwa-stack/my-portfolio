"use client";
import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";

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

const STAT_TARGETS = [18, 29, 10, 1];
const STAT_SUFFIXES = ["", "", "+", ""];

function generateResume() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const marginL = 18;
  const marginR = 18;
  const contentW = pageW - marginL - marginR;
  const navy = [26, 39, 68] as [number, number, number];
  const gray = [51, 51, 51] as [number, number, number];
  const lightGray = [120, 120, 120] as [number, number, number];

  let y = 18;

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...navy);
  doc.text("SHIVAAN PATWA", marginL, y);
  y += 7;

  // Contact line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text("shivaanpatwa@gmail.com  |  @sh1vaan_  |  Mumbai, India", marginL, y);
  y += 4;

  // Thin navy rule
  doc.setDrawColor(...navy);
  doc.setLineWidth(0.4);
  doc.line(marginL, y, pageW - marginR, y);
  y += 6;

  // Helper: section heading
  const sectionHeading = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...navy);
    doc.text(title, marginL, y);
    y += 1.5;
    doc.setDrawColor(...navy);
    doc.setLineWidth(0.25);
    doc.line(marginL, y, pageW - marginR, y);
    y += 4;
  };

  // Helper: body text with wrapping
  const bodyText = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    const lines = doc.splitTextToSize(text, contentW - indent);
    doc.text(lines, marginL + indent, y);
    y += lines.length * 4.5;
  };

  // Helper: bullet
  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text("•", marginL, y);
    const lines = doc.splitTextToSize(text, contentW - 5);
    doc.text(lines, marginL + 5, y);
    y += lines.length * 4.5;
  };

  // Helper: check page overflow and add new page if needed
  const checkPage = (needed = 10) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 18;
    }
  };

  // PROFILE
  sectionHeading("PROFILE");
  bodyText(
    "A 14-year-old finance enthusiast, Model UN delegate, and global citizen with a passion for understanding markets, international relations, and global affairs. Self-driven, intellectually curious, and always looking for the next challenge."
  );
  y += 2;

  // EDUCATION
  checkPage(14);
  sectionHeading("EDUCATION");
  bodyText("Oberoi International School, Goregaon — Grade 9 (Current)");
  y += 2;

  // EXPERIENCE & LEADERSHIP
  checkPage(14);
  sectionHeading("EXPERIENCE & LEADERSHIP");
  bullet(
    "Odyssey: The Mentor (Jan 2026) — Returned as a mentor and program leader, responsible for guiding the next cohort through the same leadership program that shaped my own development. Shifted from participant to leader, developing skills in reading a room, adapting on the fly, and making others feel seen."
  );
  checkPage(10);
  bullet(
    "CISV Step Up: Panheli (Jun–Jul 2025) — Participated in a 23-day international peace education camp with delegations from 10 countries including Italy, Spain, Mongolia, Vietnam, Sweden, Latvia and Mexico. Collaborated on Project Milaap, planning and executing activities rooted in cross-cultural exchange and global issues."
  );
  checkPage(10);
  bullet(
    "Rewilding: Marayoor (2024) — Participated in a nature immersion program, building a gate entirely from natural materials including clay and mud, and developing a deeper understanding of natural ecosystems."
  );
  y += 2;

  // MODEL UNITED NATIONS
  checkPage(14);
  sectionHeading("MODEL UNITED NATIONS");
  bodyText(
    "Active MUN delegate and chair with experience across multiple international and national conferences. Developed strong skills in public speaking, resolution drafting, negotiation, diplomacy, and crisis management."
  );
  y += 1;

  const munConferences = [
    { name: "OISMUN (Grade 6)", role: "Delegate — UNHRC — Iraq", award: "Outstanding Delegate" },
    { name: "OISMUN (Grade 7)", role: "Delegate — WHO — Colombia", award: "Verbal Mention" },
    { name: "OISMUN (Grade 8)", role: "Delegate — UNHRC — Canada", award: "Verbal Mention" },
    { name: "Mumbai MUN (Grade 8)", role: "Delegate — UNDP — Germany", award: "Verbal Mention" },
    { name: "DYPMUN (Grade 8)", role: "Delegate — Lok Sabha — PM Modi", award: "Best Delegate" },
    { name: "OISMUN (Grade 8)", role: "Delegate — Indian Cabinet — M. Kharge", award: "Honorable Mention" },
    { name: "EMUN (Grade 8)", role: "Delegate — DISEC — China", award: "Honorable Mention" },
    { name: "JBCNMUN (Grade 8)", role: "Delegate — DISEC — USA", award: "Best Delegate" },
    { name: "Brussels MUN (Grade 8)", role: "Delegate — EUCOM — Malta", award: "Honorable Mention" },
    { name: "HMUN India (Grade 9)", role: "Delegate — UNGA Legal — Lebanon", award: "DQ" },
    { name: "JBCN Oshiwara (Grade 9)", role: "Delegate — UNSC — Iran", award: "Verbal Mention" },
    { name: "ABWAMUN (Grade 9)", role: "Delegate — UNHRC — France", award: "None" },
    { name: "Mumbai MUN Open (Grade 9)", role: "Delegate — UNODC — United Kingdom", award: "Verbal Mention" },
    { name: "OISMUN (Grade 9)", role: "Delegate — Lok Sabha — Rajnath Singh", award: "Outstanding Delegate" },
    { name: "SpringMUN (Grade 9)", role: "Delegate — UNHRC — The Taliban", award: "Outstanding Delegate" },
    { name: "WLCMUN", role: "Co-Director — UNODC", award: "Upcoming" },
    { name: "EMUN", role: "Co-Director — DISEC", award: "Upcoming" },
    { name: "OIS MSMUN", role: "Assistant Director — ECOSOC", award: "Upcoming" },
  ];

  for (const conf of munConferences) {
    checkPage(8);
    const awardStr = conf.award && conf.award !== "None" ? ` — ${conf.award}` : "";
    bullet(`${conf.name} — ${conf.role}${awardStr}`);
  }
  y += 2;

  // ENTREPRENEURSHIP
  checkPage(14);
  sectionHeading("ENTREPRENEURSHIP");
  bullet(
    "The Stone Trading Project (2023) — Independently sourced and curated semi-precious stones, built a client base among friends and family, and managed the full sales cycle. Reinvested 100% of profits into the stock market and used the returns to self-fund a major purchase — demonstrating an end-to-end understanding of earn, invest, and compound from an early age."
  );
  y += 2;

  // FINANCE & INVESTING
  checkPage(14);
  sectionHeading("FINANCE & INVESTING");
  bodyText(
    "Developed an interest in investing at age 10. Built a deep understanding of markets, equity investing, macroeconomic trends, and global financial systems. Actively tracks NASDAQ, NSE, and Shanghai Stock Exchange. Author of the Weekly Finance Journal (WFJ) — a self-initiated series covering global finance topics, written and published consistently."
  );
  y += 2;

  // GLOBAL EXPOSURE
  checkPage(14);
  sectionHeading("GLOBAL EXPOSURE");
  bodyText(
    "29 countries across 4 continents. Lived experiences across Europe, Asia, Africa, and the Americas."
  );
  y += 2;

  // SKILLS
  checkPage(14);
  sectionHeading("SKILLS");
  bodyText(
    "Public Speaking  ·  Research & Analysis  ·  Resolution Drafting  ·  Negotiation  ·  Cross-Cultural Communication  ·  Leadership  ·  Entrepreneurial Thinking  ·  Financial Literacy  ·  Writing"
  );

  doc.save("Shivaan_Patwa_Resume.pdf");
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statCounts, setStatCounts] = useState([0, 0, 0, 0]);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
        });
      },
      { threshold: 0.05 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Particle / constellation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26,111,255,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26,111,255,0.65)";
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Dedicated observer for stats count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count-up via setInterval when stats section is visible
  useEffect(() => {
    if (!statsVisible) return;
    const targets = [18, 29, 10, 1];
    const current = [0, 0, 0, 0];
    const interval = setInterval(() => {
      let allDone = true;
      current.forEach((val, i) => {
        if (val < targets[i]) {
          current[i] = val + 1;
          allDone = false;
        }
      });
      setStatCounts([...current]);
      if (allDone) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [statsVisible]);

  const reg = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  const fadeStyle = (id: string, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
  });

  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=Playfair+Display:wght@700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg-card: var(--bg-elevated);
          --bg-card2: var(--bg-elevated2);
        }

        :root.light-theme {
          --bg-card: var(--bg-elevated);
          --bg-card2: var(--bg-elevated2);
        }

        :root.light-theme .quote-block {
          background: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #1a6fff; border-radius: 2px; }

        /* Noise texture overlay */
        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
        }

        /* Gradient mesh animation */
        @keyframes meshShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Patwa shimmer */
        @keyframes shimmerText {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        /* Button shimmer sweep */
        @keyframes btnShimmerSweep {
          0%   { left: -80%; }
          100% { left: 140%; }
        }

        /* Green pulsing dot */
        @keyframes greenPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.65); }
          70%  { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        /* Hero content fade-in */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Quote fade-in */
        @keyframes quoteFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-gradient-mesh {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #070a12, #0a0f1e, #060810, #0a0f1e, #070a12);
          background-size: 500% 500%;
          animation: meshShift 12s ease infinite;
          border-radius: 24px;
          z-index: 0;
          opacity: 0.12;
        }

        .patwa-shimmer {
          background: linear-gradient(90deg, #1a6fff 0%, #1a6fff 20%, #60a5fa 38%, #ffffff 50%, #60a5fa 62%, #1a6fff 80%, #1a6fff 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 2.8s linear infinite;
        }

        .hero-line-1 { animation: heroFadeUp 0.85s 0.05s ease-out both; }
        .hero-subtitle { animation: heroFadeUp 0.85s 0.25s ease-out both; }
        .quote-animated { animation: quoteFadeIn 1.1s 0.45s ease-out both; }
        .hero-body { animation: heroFadeUp 0.85s 0.65s ease-out both; }

        .nav-link {
          color: var(--text-sec);
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
        .nav-link:hover { color: var(--text); }
        .nav-link:hover::after { width: 100%; }

        .stat-card {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem 1.25rem;
          background: var(--bg-card);
          box-shadow: var(--card-shadow);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(26,111,255,0.45);
          transform: translateY(-6px);
          box-shadow: 0 14px 40px rgba(26,111,255,0.18), var(--card-shadow);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3.75rem;
          font-weight: 900;
          color: #1a6fff;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: transform 0.2s;
        }
        .stat-card:hover .stat-number {
          transform: scale(1.05);
        }

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
          position: relative;
          overflow: hidden;
        }
        .cta-primary {
          background: #1a6fff;
          color: #fff;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -80%;
          width: 55%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: skewX(-20deg);
          opacity: 0;
        }
        .cta-primary:hover {
          background: #2d7dff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26,111,255,0.45);
        }
        .cta-primary:hover::before {
          animation: btnShimmerSweep 0.65s ease forwards;
          opacity: 1;
        }
        .cta-secondary {
          background: transparent;
          color: var(--text-sec);
          border: 1px solid var(--border-2);
        }
        .cta-secondary:hover {
          border-color: #1a6fff44;
          color: var(--text);
          transform: translateY(-2px);
        }

        .now-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--card-shadow);
          border-radius: 16px;
          padding: 0.5rem 1.5rem;
        }

        .now-row {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: 0.75rem 0.75rem 0.75rem 0.75rem;
          border-bottom: 1px solid var(--border);
          border-left: 3px solid transparent;
          border-radius: 8px;
          margin: 0 -0.5rem;
          transition: background 0.2s, border-left-color 0.2s, padding-left 0.2s;
          cursor: default;
        }
        .now-row:last-child { border-bottom: none; }
        .now-row:hover {
          background: rgba(26,111,255,0.09);
          border-left-color: #1a6fff;
          padding-left: 1.1rem;
        }

        .now-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--bg-icon);
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

        .green-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          flex-shrink: 0;
          animation: greenPulse 2s infinite;
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

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
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

        .theme-btn {
          background: none;
          border: 1px solid var(--border-2);
          border-radius: 8px;
          color: var(--text-sec);
          font-size: 1rem;
          cursor: pointer;
          padding: 0.6rem 0.75rem;
          line-height: 1;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .theme-btn:hover {
          border-color: #1a6fff66;
          background: rgba(26,111,255,0.08);
          transform: rotate(15deg) scale(1.1);
        }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--bg-primary);
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 5rem;
          gap: 2rem;
        }
        .mobile-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #1a6fff; }

        .quote-big-mark {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 8vw, 5.5rem);
          line-height: 0.7;
          color: #1a6fff;
          opacity: 0.85;
          display: block;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .now-row { gap: 0.625rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .quote-block { padding: 1.75rem 1.25rem !important; }
          .now-widget { width: 100% !important; }
          .hero-section { padding: 5rem 1.25rem 1.5rem !important; }
          .resume-cta-inner { padding: 1.75rem 1.25rem !important; }
          .cta-btn { min-height: 44px; }
          .stat-number { font-size: 2.75rem !important; }
        }

        @media (max-width: 480px) {
          nav { padding: 0.75rem 1rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-card { padding: 1rem !important; }
          .section-padding { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>

      {/* Background effects */}
      <div className="grid-bg" />
      <div className="glow" />
      <div className="noise-overlay" />

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
          borderBottom: scrollY > 40 ? "1px solid var(--border)" : "1px solid transparent",
          background: scrollY > 40 ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
          transition: "all 0.3s",
        }}
      >
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}>SP.</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="/connect" className="cta-btn cta-primary" style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}>
            Contact
          </a>
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "1px solid var(--border-2)", borderRadius: 8, color: "var(--text-sec)", fontSize: "1rem", cursor: "pointer", padding: "0.6rem 0.75rem", lineHeight: 1 }}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: "var(--text)", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* HERO */}
        <section
          className="hero-section"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "7rem 2rem 2rem",
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: 24,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Gradient mesh layer */}
          <div className="hero-gradient-mesh" />

          {/* Hero content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1
              className="hero-line-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
                fontWeight: 900,
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
                marginBottom: "1.25rem",
              }}
            >
              Shivaan<br />
              <span className="patwa-shimmer">Patwa.</span>
            </h1>

            <p
              className="hero-subtitle"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "var(--text-sec)",
                maxWidth: 600,
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                fontWeight: 300,
              }}
            >
              A future in finance, a history in MUN, and an obsession with global change.
            </p>

            <div
              id="quote"
              ref={reg("quote")}
              className="quote-block"
              style={{
                background: theme === "light" ? "transparent" : "var(--quote-bg)",
                border: theme === "light" ? "none" : "1px solid var(--border-3)",
                boxShadow: theme === "light" ? "none" : undefined,
                borderRadius: "20px",
                padding: "2rem 2.5rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                marginBottom: "1.5rem",
                maxWidth: 680,
                ...fadeStyle("quote"),
              }}
            >
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "80%", height: "80%",
                background: "radial-gradient(ellipse, rgba(26,111,255,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ position: "relative" }}>
                <span className="quote-big-mark" style={{ textAlign: "left" }}>"</span>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                  fontWeight: 700,
                  color: "var(--text)",
                  lineHeight: 1.7,
                  maxWidth: 580,
                  margin: "0.25rem auto",
                  letterSpacing: "-0.01em",
                }}>
                  Wealth. Unforgettable experiences. Every country on the map. And the right people to share it with. That's all I want.
                </p>
                <span className="quote-big-mark" style={{ textAlign: "right", display: "block", maxWidth: 580, margin: "0 auto" }}>"</span>
                <div style={{ width: 40, height: 2, background: "#1a6fff", margin: "0.75rem auto 0", borderRadius: 2 }} />
                <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Shivaan Patwa</div>
              </div>
            </div>

            <p
              className="hero-body"
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                maxWidth: 560,
                lineHeight: 1.8,
              }}
            >
              I don&apos;t just observe global systems — I analyze them, debate them, and look for the cracks. Whether I&apos;m drafting a UN resolution or dissecting the risks of a cashless economy, I&apos;m driven by a singular goal: understanding the forces that shape our world.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section
          id="stats"
          ref={(el) => { refs.current["stats"] = el; statsRef.current = el; }}
          style={{ padding: "1.25rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div
            className="stats-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", ...fadeStyle("stats") }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="stat-card" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="stat-number">
                  {statCounts[i]}{STAT_SUFFIXES[i]}
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", marginTop: "0.5rem", color: "var(--text)" }}>{s.label}</div>
                <div style={{ fontSize: "0.73rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* THE NOW */}
        <section
          id="now"
          ref={reg("now")}
          style={{ padding: "1.5rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
          <div style={fadeStyle("now")}>
            <div className="section-tag">
              <span className="green-dot" /> Live Update
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "1.25rem" }}>The Now</h2>
            <div className="now-card">
              {[
                { icon: "📚", label: "Current Deep Dive", value: "Cambridge IGCSE Exam Prep", sub: "Ongoing · Exams 18th Apr" },
                { icon: "✍️", label: "Currently Writing", value: "WFJ — Next article coming soon", sub: "" },
                { icon: "🎙️", label: "Next MUN", value: "Chairing at Ecole MUN", sub: "17th–18th April 2026" },
                { icon: "✈️", label: "Latest Stamp", value: "Italy & Vatican City", sub: "Dec 2025" },
              ].map((row, i) => (
                <div key={i} className="now-row">
                  <div className="now-icon">{row.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{row.label}</div>
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>{row.value}</div>
                    {row.sub && <div style={{ fontSize: "0.82rem", color: "#1a6fff", marginTop: "0.15rem" }}>{row.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESUME CTA */}
        <section
          id="resume-cta"
          ref={reg("resume-cta")}
          style={{ padding: "1.5rem 2rem 3rem", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}
        >
          <div className="resume-cta-inner" style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--card-shadow)",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            ...fadeStyle("resume-cta"),
          }}>
            <span style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontVariant: "small-caps",
              fontWeight: 600,
            }}>
              Want the full picture?
            </span>
            <button
              className="cta-btn cta-primary"
              style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
              onClick={generateResume}
            >
              📄 Generate My Resume
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem 2rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.8rem" }}>
          © 2026 Shivaan Patwa. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
