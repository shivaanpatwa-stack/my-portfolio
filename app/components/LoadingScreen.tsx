"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const already = sessionStorage.getItem("sp-loaded");
    if (already) return;
    setVisible(true);

    // Fade in: 0–500ms
    // Hold: 500–1300ms (800ms hold)
    // Fade out: 1300–1700ms (400ms)
    const holdTimer = setTimeout(() => setPhase("out"), 1300);
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem("sp-loaded", "1");
      setVisible(false);
    }, 1700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap');

        @keyframes sp-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sp-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .sp-loading-overlay {
          position: fixed;
          inset: 0;
          background: #07090e;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sp-loading-text-in {
          animation: sp-fade-in 0.5s ease forwards;
        }
        .sp-loading-text-out {
          animation: sp-fade-out 0.4s ease forwards;
        }
      `}</style>
      <div className="sp-loading-overlay">
        <span
          className={phase === "out" ? "sp-loading-text-out" : "sp-loading-text-in"}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(4rem, 15vw, 8rem)",
            color: "#1a6fff",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          SP
        </span>
      </div>
    </>
  );
}
