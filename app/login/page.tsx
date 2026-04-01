"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError("Incorrect password");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080a0f; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        background: "#080a0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "3rem",
            fontWeight: 600,
            color: "#f0f4ff",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}>
            SP
          </div>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: "#8899bb",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            This site is private. Enter the password to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "#0e1117",
                border: "1px solid #1e2535",
                borderRadius: "6px",
                color: "#f0f4ff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1a6fff")}
              onBlur={(e) => (e.target.style.borderColor = "#1e2535")}
            />

            {error && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "#e05252",
                textAlign: "center",
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: loading ? "#1550cc" : "#1a6fff",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Checking..." : "Enter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
