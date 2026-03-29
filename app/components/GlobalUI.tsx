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

  // Custom cursor — DOM-appended, bypasses React render timing
  useEffect(() => {
    // Only on fine-pointer (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Create dot
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: #1a6fff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      top: -100px;
      left: -100px;
      will-change: top, left;
    `;

    // Create ring
    const ring = document.createElement("div");
    ring.style.cssText = `
      position: fixed;
      width: 32px;
      height: 32px;
      border: 2px solid rgba(26,111,255,0.75);
      border-radius: 50%;
      background: transparent;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      top: -100px;
      left: -100px;
      transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      will-change: top, left;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const hovering = !!(el.closest("a, button, [role='button']"));
      if (hovering) {
        ring.style.width  = "48px";
        ring.style.height = "48px";
        ring.style.background = "rgba(26,111,255,0.12)";
        ring.style.borderColor = "#1a6fff";
      } else {
        ring.style.width  = "32px";
        ring.style.height = "32px";
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(26,111,255,0.75)";
      }
    };

    const animate = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(animId);
      dot.remove();
      ring.remove();
    };
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
