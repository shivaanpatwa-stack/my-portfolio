"use client";
import { useEffect, useState } from "react";

export default function GlobalUI() {
  const [scrollPct,   setScrollPct]   = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  // Scroll progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackTop(scrolled > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <>
      {/* Scroll progress bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: `${scrollPct}%`,
        height: "3px",
        background: "linear-gradient(90deg, #1a6fff, #60a5fa)",
        zIndex: 99998,
        pointerEvents: "none",
        transition: "width 0.1s linear",
      }} />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "5.5rem",
          width: 48, height: 48,
          borderRadius: "50%",
          background: "#1a6fff",
          border: "none",
          color: "#fff",
          fontSize: "1.2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 99997,
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? "auto" : "none",
          transform: showBackTop ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s, transform 0.3s",
          boxShadow: "0 4px 18px rgba(26,111,255,0.4)",
        }}
      >
        ↑
      </button>
    </>
  );
}
