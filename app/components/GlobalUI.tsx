"use client";
import { useEffect, useRef, useState } from "react";

export default function GlobalUI() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -200, y: -200 });
  const ring     = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const rafRef   = useRef<number>(0);

  const [scrollPct,    setScrollPct]    = useState(0);
  const [showBackTop,  setShowBackTop]  = useState(false);
  const [isTouch,      setIsTouch]      = useState(false);

  // Detect touch device — hide custom cursor on touch
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
  }, []);

  // Scroll progress + back-to-top visibility
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

  // Custom cursor — track mouse + lerp ring
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering.current = !!(el.closest("a, button, [role='button'], .exp-card, .contact-card, .stat-card, .now-card"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    // Inject cursor: none on body
    document.body.style.cursor = "none";

    const animate = () => {
      const dot  = dotRef.current;
      const rng  = ringRef.current;
      if (!dot || !rng) { rafRef.current = requestAnimationFrame(animate); return; }

      // Dot follows instantly
      dot.style.left = `${mouse.current.x}px`;
      dot.style.top  = `${mouse.current.y}px`;

      // Ring lerps toward mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      rng.style.left = `${ring.current.x}px`;
      rng.style.top  = `${ring.current.y}px`;

      // Hover state
      if (hovering.current) {
        rng.style.width  = "48px";
        rng.style.height = "48px";
        rng.style.marginLeft = "-24px";
        rng.style.marginTop  = "-24px";
        rng.style.background = "rgba(26,111,255,0.15)";
        rng.style.borderColor = "#1a6fff";
      } else {
        rng.style.width  = "32px";
        rng.style.height = "32px";
        rng.style.marginLeft = "-16px";
        rng.style.marginTop  = "-16px";
        rng.style.background = "transparent";
        rng.style.borderColor = "rgba(26,111,255,0.7)";
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, [isTouch]);

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
          right: "5.5rem",   // offset so it clears any fixed widget on the right
          width: 48, height: 48,
          borderRadius: "50%",
          background: "#1a6fff",
          border: "none",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
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

      {/* Custom cursor — hidden on touch */}
      {!isTouch && (
        <>
          {/* Dot */}
          <div
            ref={dotRef}
            style={{
              position: "fixed",
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#1a6fff",
              marginLeft: -4, marginTop: -4,
              pointerEvents: "none",
              zIndex: 99999,
              top: 0, left: 0,
            }}
          />
          {/* Ring */}
          <div
            ref={ringRef}
            style={{
              position: "fixed",
              width: 32, height: 32,
              borderRadius: "50%",
              border: "1.5px solid rgba(26,111,255,0.7)",
              background: "transparent",
              marginLeft: -16, marginTop: -16,
              pointerEvents: "none",
              zIndex: 99999,
              top: 0, left: 0,
              transition: "width 0.15s ease, height 0.15s ease, background 0.15s ease, margin 0.15s ease",
            }}
          />
        </>
      )}
    </>
  );
}
