"use client";
import { useState, useEffect, useRef } from "react";

// ─── CONFERENCE DATA ──────────────────────────────────────────────────────────
const DELEGATE_CONFERENCES = [
  { grade: 6, conference: "OISMUN", committee: "UNHRC", country: "Iraq", award: "Outstanding Delegate", agenda: "The Mahsa Amini crisis and the mistreatment of women in Iran", strategy: "Pushed for binding accountability mechanisms targeting the Iranian government, rallying developing nations around a shared human rights framework.", challenge: "Building consensus across nations with conflicting interests on state sovereignty vs. human rights intervention." },
  { grade: 7, conference: "OISMUN", committee: "WHO", country: "Colombia", award: "Verbal Mention", agenda: "The vaccine apartheid and the distribution of Covid-19 vaccines around the world", strategy: "Advocated for COVAX reform and patent waivers, positioning Colombia as a voice for the Global South.", challenge: "Countering pharmaceutical lobbying arguments from developed nations while maintaining diplomatic credibility." },
  { grade: 8, conference: "OISMUN", committee: "UNHRC", country: "Canada", award: "Verbal Mention", agenda: "The rehabilitation of ethnic minorities in South Asia", strategy: "Championed a multilateral rehabilitation framework with Canada as a model for multicultural integration.", challenge: "Navigating sensitivities around sovereignty while pushing for meaningful action on minority rights." },
  { grade: 8, conference: "Mumbai MUN", committee: "UNDP", country: "Germany", award: "Verbal Mention", agenda: "Strengthening inclusion of marginalised groups & Global Water Governance", strategy: "Led a dual-agenda bloc focusing on EU development models as replicable frameworks for emerging economies.", challenge: "Managing two separate agendas simultaneously while maintaining coalition coherence." },
  { grade: 8, conference: "DYPMUN", committee: "Lok Sabha", country: "PM Modi", award: "Best Delegate", agenda: "Discussing the abrogation of Article 370 and 35A", strategy: "Delivered a commanding opening speech asserting national sovereignty, built a parliamentary majority coalition early.", challenge: "Embodying a high-profile domestic political figure under intense scrutiny from opposition blocs." },
  { grade: 8, conference: "OISMUN", committee: "Indian Cabinet", country: "M. Kharge", award: "Honorable Mention", agenda: "Discussing the growth of Separatist movements in India", strategy: "Took a constitutionally-grounded opposition stance, forcing the cabinet to address democratic accountability.", challenge: "Articulating a credible opposition voice in a committee dominated by ruling party positions." },
  { grade: 8, conference: "EMUN", committee: "DISEC", country: "China", award: "Honorable Mention", agenda: "Rebel crisis in DRC", strategy: "Used China's non-interventionist doctrine to build a bloc of nations resisting Western military solutions.", challenge: "Defending a controversial geopolitical position while remaining diplomatically persuasive." },
  { grade: 8, conference: "JBCNMUN", committee: "DISEC", country: "USA", award: "Best Delegate", agenda: "Private Military Organisations as a threat to international peace", strategy: "Took an unexpected regulatory rather than defensive posture — proposed a US-led international PMC oversight body.", challenge: "Defending a position that required the USA to limit its own influence, a complex diplomatic balancing act." },
  { grade: 8, conference: "Brussels MUN", committee: "EUCOM", country: "Malta", award: "Honorable Mention", agenda: "Enhancing Cooperation with the Global South", strategy: "Used Malta's unique Mediterranean position to bridge EU-Africa relations, proposing a dedicated liaison framework.", challenge: "Maximising influence as a small nation state in a committee dominated by EU powerhouses." },
  { grade: 9, conference: "HMUN India", committee: "UNGA (Legal)", country: "Lebanon", award: "DQ", agenda: "Supply Chain Sourcing in Multinational Tech Companies", strategy: "Pushed hard on tech sovereignty — ultimately disqualified, but the arguments sparked significant floor debate.", challenge: "Walking the line between aggressive advocacy and procedural compliance in a high-stakes committee." },
  { grade: 9, conference: "JBCN Oshiwara", committee: "UNSC", country: "Iran", award: "Verbal Mention", agenda: "Transnational terrorism in Taliban-controlled Afghanistan", strategy: "Positioned Iran as a regional security stakeholder rather than a threat actor, shifting the committee's framing.", challenge: "Defending Iran's interests in a UNSC environment highly skeptical of Iranian motives." },
  { grade: 9, conference: "ABWAMUN", committee: "UNHRC", country: "France", award: "None", agenda: "Modern slavery and human trafficking in the 21st century", strategy: "Led a progressive European bloc pushing for enforceable supply chain transparency legislation.", challenge: "Translating moral clarity on human rights into politically viable operative clauses." },
  { grade: 9, conference: "Mumbai MUN (Open)", committee: "UNODC", country: "United Kingdom", award: "Verbal Mention", agenda: "Migrant Smuggling, Forced Labour & Transnational Organised Fraud", strategy: "Proposed a UK-led multilateral intelligence-sharing framework targeting transnational criminal networks.", challenge: "Separating migration policy from criminal enforcement in a politically charged committee environment." },
  { grade: 9, conference: "OISMUN", committee: "Lok Sabha", country: "Rajnath Singh", award: "Outstanding Delegate", agenda: "National Security in the wake of Operation Sindoor", strategy: "Delivered a decisive defence posture, rallied national security consensus, and preemptively addressed opposition critiques.", challenge: "Representing a high-profile minister on a live and politically sensitive national security topic." },
  { grade: 9, conference: "SpringMUN", committee: "UNHRC", country: "The Taliban", award: "Outstanding Delegate", agenda: "Rights to Privacy and Data Protection in a Digital Economy", strategy: "Reframed the Taliban's position around digital sovereignty rather than rights — a counterintuitive but debate-winning approach.", challenge: "Representing an internationally isolated position while maintaining committee credibility and winning the award." },
];

const CHAIR_CONFERENCES = [
  { conference: "WLCMUN", role: "Co-Director", committee: "UNODC", status: "Upcoming", color: "#1a6fff" },
  { conference: "EMUN", role: "Co-Director", committee: "DISEC", status: "Upcoming", color: "#1a6fff" },
  { conference: "OIS MSMUN", role: "Assistant Director", committee: "ECOSOC", status: "Upcoming", color: "#1a6fff" },
];

const TOOLKIT = [
  {
    title: "The Opening Speech",
    icon: "🎙️",
    desc: "Command the room in 60 seconds.",
    content: `The opening speech is your first and most powerful impression. Here's the framework:\n\n1. HOOK (5 seconds)\nStart with a provocative statement, a shocking statistic, or a historical parallel. Never start with "Honourable Chair, fellow delegates..."\n\n2. POSITION (15 seconds)\nState your nation's stance clearly and unapologetically. Ambiguity kills credibility.\n\n3. CONTEXT (20 seconds)\nConnect your position to global realities. Reference specific treaties, resolutions, or historical events.\n\n4. BLOC SIGNAL (10 seconds)\nSignal who you want to work with. Smart delegates listen for this.\n\n5. CLOSE (10 seconds)\nEnd with a memorable line. The delegates who get awards are the ones people remember.`,
  },
  {
    title: "Resolution Architecture",
    icon: "📋",
    desc: "Writing bulletproof clauses.",
    content: `A strong resolution is a legal document, not a wish list.\n\nPREAMBULATORY CLAUSES\n• Use past-tense verbs: Recalling, Recognising, Noting, Alarmed by\n• Each clause should establish factual or legal context\n• Reference UN Charter articles, previous resolutions, and treaties\n• Never use the word "should" — it signals weakness\n\nOPERATIVE CLAUSES\n• Use action verbs: Urges, Calls upon, Encourages, Demands, Establishes\n• Be specific — vague clauses get amended or killed\n• Structure: Verb → Actor → Action → Mechanism → Timeline\n• The strongest clause = one that can actually be implemented\n\nPRO TIPS\n• Write sub-clauses for every operative clause — they show depth\n• Anticipate amendments — build flexibility into your language\n• The best resolutions solve problems. The worst ones just describe them.`,
  },
  {
    title: "The 2-Minute Takedown",
    icon: "⚔️",
    desc: "Dismantling opposition resolutions.",
    content: `This is the most advanced skill in MUN. Here's how to destroy a resolution in 2 minutes:\n\nSTEP 1: IDENTIFY THE FATAL FLAW (30 seconds)\nEvery resolution has one. Look for:\n• Unrealistic funding mechanisms\n• Vague operative verbs ("encourages" instead of "demands")\n• Missing enforcement mechanisms\n• Contradictions with existing international law\n\nSTEP 2: FRAME YOUR ATTACK (15 seconds)\n"This resolution, while well-intentioned, fundamentally fails to address..."\nNever attack the delegates — attack the document.\n\nSTEP 3: DELIVER THE KILL (45 seconds)\nBe specific. Quote the exact clause number. Show why it fails logically, legally, or practically.\n\nSTEP 4: OFFER THE ALTERNATIVE (30 seconds)\nThe best takedowns end with a solution. This proves you're not just obstructing — you're building.\n\nGOLDEN RULE: Never takedown a resolution you can amend. Amending is more powerful — you shape the final document.`,
  },
];

const DOCUMENT_DRIVE_FOLDERS = [
  { label: "Mumbai MUN G9", href: "https://drive.google.com/drive/folders/1DS1pyeF9btyG7Y48mX0UpR-u3u3Yi2WA" },
  { label: "SpringMUN G9", href: "https://drive.google.com/drive/folders/1t_UrYQMbLMzaCJPIIor6zJeBnqOf99fD" },
  { label: "OISMUN G9", href: "https://drive.google.com/drive/folders/1r9-jU-y-UudZyB5k0uV5VA6_3QqKGb" },
  { label: "DYPMUN G8", href: "https://drive.google.com/drive/folders/14R-ZmxtjePkU1_6MWMqU_xGpuyBSYMWs" },
];

const FORMSPREE_RESOURCE_URL = "https://formspree.io/f/maqpzgba";

const AWARD_COLOR: Record<string, string> = {
  "Best Delegate": "#ffd700",
  "Outstanding Delegate": "#1a6fff",
  "Honorable Mention": "#aabbc8",
  "Verbal Mention": "#667788",
  "DQ": "#ff3d3d",
  "None": "#334455",
};

export default function MUNArena() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"archive" | "toolkit" | "docs" | "clauseChecker">("archive");
  const [expandedTool, setExpandedTool] = useState<number | null>(null);
  const [clauseText, setClauseText] = useState("");
  const [checklist, setChecklist] = useState<{ label: string; pass: boolean }[]>([]);
  const [resourceRequest, setResourceRequest] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [gavelActive, setGavelActive] = useState(false);
  const gavelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gPressTimes = useRef<number[]>([]);

  // Gavel easter egg
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isTextInput =
        tagName === "input" || tagName === "textarea" || tagName === "select" || !!(target as any)?.isContentEditable;
      if (isTextInput) return;

      if (e.key.toLowerCase() !== "g") return;

      const now = Date.now();
      gPressTimes.current = gPressTimes.current.filter((t) => now - t <= 1000);
      gPressTimes.current.push(now);

      if (gPressTimes.current.length >= 3) {
        gPressTimes.current = [];
        setGavelActive(true);
        if (gavelTimer.current) clearTimeout(gavelTimer.current);
        gavelTimer.current = setTimeout(() => setGavelActive(false), 3000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const analyseClause = () => {
    const text = clauseText.trim();
    const operativeVerbs = ["urges", "calls upon", "encourages", "demands", "establishes", "recommends", "decides", "requests", "invites", "affirms", "condemns", "deplores", "notes", "stresses"];
    const hasOperativeVerb = operativeVerbs.some(v => text.toLowerCase().startsWith(v));
    const hasActor = text.toLowerCase().includes("member states") || text.toLowerCase().includes("the secretary") || text.toLowerCase().includes("all states") || text.toLowerCase().includes("governments") || text.split(" ").length > 5;
    const isSpecific = text.split(" ").length >= 12;
    const hasAction = text.includes("to ") || text.includes("by ") || text.includes("through ");
    const notVague = !text.toLowerCase().includes("should") && !text.toLowerCase().includes("might") && !text.toLowerCase().includes("could consider");

    setChecklist([
      { label: "Starts with an operative verb", pass: hasOperativeVerb },
      { label: "Identifies a clear actor", pass: hasActor },
      { label: "Is specific (12+ words)", pass: isSpecific },
      { label: "Contains a clear action", pass: hasAction },
      { label: "Avoids weak language (should/might/could)", pass: notVague },
    ]);
  };

  const submitRequest = async () => {
    const message = resourceRequest.trim();
    if (!message || requestSubmitting) return;

    setRequestSubmitting(true);
    setRequestError(null);
    try {
      const res = await fetch(FORMSPREE_RESOURCE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          resourceRequest: message,
          _subject: "MUN Arena: template/advice request",
        }),
      });

      if (!res.ok) throw new Error(`Form submission failed (${res.status})`);

      setRequestSent(true);
      setResourceRequest("");
      setTimeout(() => setRequestSent(false), 4000);
    } catch {
      setRequestError("Could not send request. Please try again.");
    } finally {
      setRequestSubmitting(false);
    }
  };

  const outstanding = DELEGATE_CONFERENCES.filter(c => c.award === "Outstanding Delegate" || c.award === "Best Delegate").length;

  return (
    <main style={{ background: "#07090e", color: "#dde4ee", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1a6fff; border-radius: 2px; }

        .tab-btn {
          padding: 0.55rem 1.1rem;
          border-radius: 7px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
          background: transparent;
          color: #445566;
        }
        .tab-btn:hover { color: #dde4ee; border-color: #1a1e2e; }
        .tab-btn.active { background: #0f1520; color: #1a6fff; border-color: #1a6fff44; }

        .conf-row {
          display: grid;
          grid-template-columns: 60px 1fr 1fr 1fr 140px;
          gap: 0.75rem;
          align-items: center;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid #0d1117;
          cursor: pointer;
          transition: background 0.15s;
          border-radius: 6px;
        }
        .conf-row:hover { background: #0d1117; }

        .award-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .tool-card {
          background: #0d1117;
          border: 1px solid #111827;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tool-card:hover { border-color: #1a6fff44; transform: translateY(-2px); }

        .doc-card {
          background: #0d1117;
          border: 1px solid #111827;
          border-radius: 10px;
          padding: 1.25rem;
          transition: border-color 0.2s;
        }
        .doc-card:hover { border-color: #1a6fff33; }

        .input-field {
          background: #0d1117;
          border: 1px solid #1a1e2e;
          border-radius: 8px;
          color: #dde4ee;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          resize: vertical;
        }
        .input-field:focus { border-color: #1a6fff; }

        .cta-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-primary { background: #1a6fff; color: #fff; }
        .cta-primary:hover { background: #2d7dff; transform: translateY(-1px); }

        .section-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a6fff;
          display: block;
          margin-bottom: 0.4rem;
        }

        .stat-pill {
          background: #0d1117;
          border: 1px solid #111827;
          border-radius: 10px;
          padding: 1rem 1.25rem;
          text-align: center;
        }

        .ticker-bar {
          background: #0a0d14;
          border-bottom: 1px solid #0f1520;
          padding: 0.6rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          overflow: hidden;
        }

        .gavel-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          animation: overlayFadeIn 220ms ease-out both;
        }
        .gavel-emoji {
          font-size: 12rem;
          animation: gavelDrop 650ms cubic-bezier(0.2, 0.9, 0.2, 1.0) both;
        }
        .gavel-caption {
          margin-top: 1rem;
          text-align: center;
          color: #ffffff;
          font-family: 'DM Mono', monospace;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-shadow: 0 8px 22px rgba(0, 0, 0, 0.55);
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gavelDrop {
          0% { transform: translateY(-240px) scale(0.92) rotate(-12deg); opacity: 0; }
          55% { opacity: 1; }
          65% { transform: translateY(28px) scale(1.02) rotate(4deg); }
          80% { transform: translateY(-10px) scale(0.995) rotate(-2deg); }
          92% { transform: translateY(4px) scale(1.01) rotate(1deg); }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }

        .briefing-note {
          background: #070a10;
          border-left: 2px solid #1a6fff;
          padding: 1rem 1.25rem;
          margin-top: 0.5rem;
          border-radius: 0 8px 8px 0;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chair-card {
          background: #0d1117;
          border: 1px solid #1a6fff22;
          border-radius: 12px;
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .chair-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #1a6fff, transparent);
        }

        @media (max-width: 768px) {
          .conf-row {
            grid-template-columns: 1fr;
            gap: 0.4rem;
          }
          .conf-header { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }

          .tab-btn {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .cta-btn {
            min-height: 44px;
          }

          .ticker-bar {
            gap: 1rem;
            padding: 0.6rem 1rem;
            font-size: 0.68rem;
            overflow-x: auto;
          }

          .mun-header {
            padding: 1.25rem 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .mun-content {
            padding: 1.5rem 1rem !important;
          }

          .docs-grid {
            grid-template-columns: 1fr !important;
          }

          .resource-row {
            flex-direction: column !important;
          }
          .resource-row .cta-btn {
            width: 100%;
          }
          .resource-row .input-field {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .stat-pill {
            padding: 0.75rem 1rem;
          }
          .award-badge {
            font-size: 0.65rem;
          }
        }
      `}</style>

      {/* GAVEL EASTER EGG */}
      {gavelActive && (
        <div className="gavel-overlay">
          <div>
            <div className="gavel-emoji">⚖️</div>
            <div className="gavel-caption">ORDER IN THE COMMITTEE</div>
          </div>
        </div>
      )}

      {/* LIVE TICKER */}
      <div className="ticker-bar">
        <span style={{ color: "#1a6fff", fontWeight: 700, whiteSpace: "nowrap", fontSize: "0.7rem", letterSpacing: "0.12em" }}>⚡ LIVE STATUS</span>
        <span style={{ color: "#556677", whiteSpace: "nowrap" }}>Last Gavel: <span style={{ color: "#1a6fff" }}>SpringMUN — Outstanding Delegate, UNHRC</span></span>
        <span style={{ color: "#334455" }}>|</span>
        <span style={{ color: "#556677", whiteSpace: "nowrap" }}>Current Focus: <span style={{ color: "#ffffff" }}>Chairing DISEC @ École MUN</span></span>
        <span style={{ color: "#334455" }}>|</span>
        <span style={{ color: "#445566", whiteSpace: "nowrap", fontSize: "0.68rem" }}>Press G × 3 for a surprise</span>
      </div>

      {/* HEADER */}
      <div className="mun-header" style={{ borderBottom: "1px solid #0f1520", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <a href="/" style={{ color: "#445566", fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.08em" }}>← SP.</a>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 900, marginTop: "0.2rem", letterSpacing: "-0.02em" }}>
            The MUN <span style={{ color: "#1a6fff" }}>Arena</span>
          </h1>
          <p style={{ color: "#556677", fontSize: "0.85rem", marginTop: "0.25rem", fontStyle: "italic" }}>
            18 Conferences. 3 Chairs. 15 Delegations. Mastering the art of international negotiation.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {(["archive", "toolkit", "docs", "clauseChecker"] as const).map(t => (
            <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t === "archive" ? "📊 Archive" : t === "toolkit" ? "⚔️ Toolkit" : t === "docs" ? "📁 Docs" : "🔬 Clause Checker"}
            </button>
          ))}
        </div>
      </div>

      <div className="mun-content" style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>

        {/* STATS ROW */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            { value: "18", label: "Conferences" },
            { value: outstanding.toString(), label: "Top Awards" },
            { value: CHAIR_CONFERENCES.length.toString(), label: "Chair Roles" },
            { value: "15", label: "Delegations" },
          ].map((s, i) => (
            <div key={i} className="stat-pill">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#1a6fff", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.72rem", color: "#556677", marginTop: "0.3rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── ARCHIVE TAB ── */}
        {activeTab === "archive" && (
          <div>
            <span className="section-tag">Conference Archive</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem" }}>The Track Record</h2>
            <p style={{ color: "#556677", fontSize: "0.83rem", marginBottom: "1.5rem" }}>Click any row to expand the briefing note.</p>

            {/* Table header */}
            <div className="conf-header" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr 140px", gap: "0.75rem", padding: "0.5rem 1.25rem", marginBottom: "0.25rem" }}>
              {["Yr", "Conference", "Committee", "Country", "Award"].map(h => (
                <div key={h} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#334455" }}>{h}</div>
              ))}
            </div>

            {DELEGATE_CONFERENCES.map((c, i) => (
              <div key={i}>
                <div className="conf-row" onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#445566" }}>G{c.grade}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.conference}</div>
                  <div style={{ fontSize: "0.83rem", color: "#8899aa" }}>{c.committee}</div>
                  <div style={{ fontSize: "0.83rem", color: "#aabbc8" }}>{c.country}</div>
                  <div>
                    <span className="award-badge" style={{
                      background: `${AWARD_COLOR[c.award]}${c.award === "Best Delegate" || c.award === "Outstanding Delegate" ? "30" : "18"}`,
                      color: AWARD_COLOR[c.award],
                      border: `1px solid ${AWARD_COLOR[c.award]}${c.award === "Best Delegate" || c.award === "Outstanding Delegate" ? "66" : "33"}`,
                      fontWeight: c.award === "Best Delegate" || c.award === "Outstanding Delegate" ? 800 : 700,
                      fontSize: c.award === "Best Delegate" || c.award === "Outstanding Delegate" ? "0.75rem" : "0.7rem",
                    }}>
                      {c.award === "Best Delegate" ? "🥇" : c.award === "Outstanding Delegate" ? "🏆" : c.award === "Honorable Mention" ? "🎖️" : c.award === "Verbal Mention" ? "📣" : c.award === "DQ" ? "🚫" : "●"} {c.award}
                    </span>
                  </div>
                </div>
                {expandedRow === i && (
                  <div className="briefing-note" style={{ margin: "0 0.5rem 0.5rem" }}>
                    <div style={{ fontSize: "0.68rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Briefing Note — {c.conference}</div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.7rem", color: "#445566", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Agenda</div>
                      <div style={{ fontSize: "0.85rem", color: "#aabbc8" }}>{c.agenda}</div>
                    </div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.7rem", color: "#445566", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Core Challenge</div>
                      <div style={{ fontSize: "0.85rem", color: "#8899aa" }}>{c.challenge}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "#445566", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Strategy</div>
                      <div style={{ fontSize: "0.85rem", color: "#dde4ee" }}>{c.strategy}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Chair Portfolio */}
            <div style={{ marginTop: "2.5rem" }}>
              <span className="section-tag">Chair Portfolio</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>Upcoming Chair Roles</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                {CHAIR_CONFERENCES.map((c, i) => (
                  <div key={i} className="chair-card">
                    <div style={{ fontSize: "0.65rem", color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{c.role}</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{c.conference}</div>
                    <div style={{ fontSize: "0.83rem", color: "#fff", marginBottom: "0.75rem" }}>{c.committee}</div>
                    <span style={{ background: "#0f1a2e", color: "#fff", border: "1px solid #1a6fff33", borderRadius: "20px", padding: "0.15rem 0.6rem", fontSize: "0.68rem", fontWeight: 700 }}>
                      Upcoming
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Request */}
            <div style={{ marginTop: "2.5rem", background: "#0d1117", border: "1px solid #111827", borderRadius: "14px", padding: "1.75rem" }}>
              <span className="section-tag">Community</span>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>Request a Template or Advice</h3>
              <p style={{ color: "#556677", fontSize: "0.82rem", marginBottom: "1rem" }}>Younger delegates — ask for specific committee templates or preparation advice.</p>
              <div className="resource-row" style={{ display: "flex", gap: "0.75rem" }}>
                <input
                  className="input-field"
                  style={{ flex: 1 }}
                  placeholder="e.g. UNSC position paper template, DISEC clause writing help..."
                  value={resourceRequest}
                  onChange={e => setResourceRequest(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && void submitRequest()}
                />
                <button className="cta-btn cta-primary" onClick={() => void submitRequest()} disabled={requestSubmitting}>
                  {requestSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
              {requestSent && <p style={{ color: "#00c853", fontSize: "0.8rem", marginTop: "0.6rem" }}>✓ Request sent! Shivaan will get back to you.</p>}
              {requestError && <p style={{ color: "#ff3d3d", fontSize: "0.8rem", marginTop: "0.6rem" }}>{requestError}</p>}
            </div>
          </div>
        )}

        {/* ── TOOLKIT TAB ── */}
        {activeTab === "toolkit" && (
          <div>
            <span className="section-tag">Strategy Toolkit</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem" }}>The MUN Cheat Sheet</h2>
            <p style={{ color: "#556677", fontSize: "0.83rem", marginBottom: "1.5rem" }}>Distilled from 18 conferences. Click each section to expand.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {TOOLKIT.map((t, i) => (
                <div key={i} className="tool-card" onClick={() => setExpandedTool(expandedTool === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{t.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1rem" }}>{t.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#556677" }}>{t.desc}</div>
                      </div>
                    </div>
                    <span style={{ color: "#1a6fff", fontSize: "1.2rem", transition: "transform 0.2s", transform: expandedTool === i ? "rotate(90deg)" : "rotate(0deg)" }}>→</span>
                  </div>
                  {expandedTool === i && (
                    <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #111827", color: "#8899aa", fontSize: "0.87rem", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
                      {t.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DOCS TAB ── */}
        {activeTab === "docs" && (
          <div>
            <span className="section-tag">Document Library</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem" }}>Written Work</h2>
            <p style={{ color: "#556677", fontSize: "0.83rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              A compilation of my best MUN documents — position papers, resolutions and working papers.
            </p>

            <div className="docs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.875rem" }}>
              {DOCUMENT_DRIVE_FOLDERS.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-card"
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <div style={{ fontSize: "0.65rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Google Drive</div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.75rem" }}>{d.label}</div>
                  <span style={{ color: "#1a6fff", fontSize: "0.82rem", fontWeight: 600 }}>Open folder →</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── CLAUSE CHECKER TAB ── */}
        {activeTab === "clauseChecker" && (
          <div>
            <span className="section-tag">Resolution Sandbox</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.4rem" }}>Clause Analyser</h2>
            <p style={{ color: "#556677", fontSize: "0.83rem", marginBottom: "1.5rem" }}>Type an operative clause below and get instant feedback on its strength.</p>

            <div style={{ background: "#0d1117", border: "1px solid #111827", borderRadius: "14px", padding: "1.75rem", marginBottom: "1.25rem" }}>
              <textarea
                className="input-field"
                rows={4}
                placeholder="e.g. Urges all member states to establish national cybersecurity frameworks by 2026..."
                value={clauseText}
                onChange={e => setClauseText(e.target.value)}
              />
              <button className="cta-btn cta-primary" style={{ marginTop: "0.875rem" }} onClick={analyseClause}>Analyse Clause →</button>
            </div>

            {checklist.length > 0 && (
              <div style={{ background: "#0d1117", border: "1px solid #111827", borderRadius: "14px", padding: "1.75rem" }}>
                <div style={{ fontSize: "0.7rem", color: "#1a6fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Clause Checklist</div>
                {checklist.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: i < checklist.length - 1 ? "1px solid #0f1520" : "none" }}>
                    <span style={{ fontSize: "1rem" }}>{item.pass ? "✅" : "❌"}</span>
                    <span style={{ fontSize: "0.87rem", color: item.pass ? "#aabbc8" : "#556677" }}>{item.label}</span>
                  </div>
                ))}
                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#070a10", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.8rem", color: "#556677" }}>
                    Score: <span style={{ color: "#1a6fff", fontWeight: 700 }}>{checklist.filter(c => c.pass).length}/{checklist.length}</span>
                    {checklist.filter(c => c.pass).length === checklist.length ? " — Bulletproof clause! 🔨" :
                      checklist.filter(c => c.pass).length >= 3 ? " — Strong, minor improvements needed." :
                        " — Needs significant revision."}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
