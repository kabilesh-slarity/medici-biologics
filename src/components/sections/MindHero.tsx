"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NeuralLattice } from "@/components/effects/NeuralLattice";

const VARIANTS = [
  {
    roman: "I",
    lead: "Distraction",
    tail: "the default.",
    pathway: "Semax · Focus & Executive Function",
  },
  {
    roman: "II",
    lead: "Anxiety",
    tail: "your future.",
    pathway: "Selank · Mood & Stress Resilience",
  },
  {
    roman: "III",
    lead: "Decline",
    tail: "inevitable.",
    pathway: "Dihexa · Neuroplasticity Pathway",
  },
];

const TRUST_ITEMS = ["503A Compounded", "Physician-Guided", "Licensed Clinicians", "Discreet Shipping"];

export function MindHero() {
  const [idx, setIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % 3), 5200);
    return () => clearInterval(timer);
  }, []);

  const v = VARIANTS[idx];

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      style={{
        background: "#0A0A0A",
        color: "#F7F7F3",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <NeuralLattice />

      {/* Slow-drifting ambient orbs — atmospheric depth without distraction */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
      </div>

      {/* corner registry marks */}
      <CornerRegistry pos="tl" />
      <CornerRegistry pos="tr" />
      <CornerRegistry pos="bl" />
      <CornerRegistry pos="br" />

      <div
        className="mind-hero-container"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 3,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Roman numeral indicator */}
        <div
          className="mind-hero-roman"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
            color: "rgba(247, 247, 243, 0.42)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Protocol
          </span>
          <span
            style={{
              width: 24,
              height: 1,
              background: "rgba(247, 247, 243, 0.14)",
            }}
          />
          {VARIANTS.map((variant, i) => (
            <button
              key={variant.roman}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show ${variant.pathway}`}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: i === idx ? 600 : 400,
                fontStyle: "italic",
                letterSpacing: "0.06em",
                color: i === idx ? "#1ECD92" : "rgba(247, 247, 243, 0.36)",
                transition: "color 0.3s ease",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {variant.roman}
            </button>
          ))}
        </div>

        {/* Rotating headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={idx}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="mind-hero-headline"
            style={{
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: 24,
              marginTop: 0,
              maxWidth: 1100,
              color: "#F7F7F3",
            }}
          >
            {v.lead}{" "}
            <em style={{ fontStyle: "italic", color: "#1ECD92" }}>is not</em>
            <br />
            {v.tail}
          </motion.h1>
        </AnimatePresence>

        {/* Pathway chip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`chip-${idx}`}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
              padding: "6px 14px 6px 11px",
              background: "rgba(30, 205, 146, 0.08)",
              border: "1px solid rgba(30, 205, 146, 0.22)",
              borderRadius: 999,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(30, 205, 146, 0.9)",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                background: "#1ECD92",
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
                animation: "heroChipPulse 1.6s ease-in-out infinite",
              }}
            />
            {v.pathway}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mind-hero-body"
          style={{
            lineHeight: 1.6,
            maxWidth: 600,
            color: "rgba(247, 247, 243, 0.65)",
            marginBottom: 40,
            fontWeight: 400,
          }}
        >
          <span className="hero-body-full">
            Medici Mind is a precision-compounded protocol of Semax, Selank, and Dihexa, engineered
            for adults who have decided that what happens to the mind over time is a question of
            preparation, not fate.
          </span>
          <span className="hero-body-short">
            A precision-compounded cognitive protocol of Semax, Selank, and Dihexa. Preparation over
            fate.
          </span>
        </motion.p>

        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          className="mind-hero-ctas"
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 56,
          }}
        >
          <a
            href="#qualify"
            className="hero-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#1ECD92",
              color: "#0A0A0A",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 700,
              borderRadius: 999,
              transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.3s ease",
              whiteSpace: "nowrap",
              position: "relative",
              boxShadow: "0 0 0 0 rgba(30, 205, 146, 0)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#2BE5A6";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 8px 32px -8px rgba(30, 205, 146, 0.55)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#1ECD92";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 0 0 0 rgba(30, 205, 146, 0)";
            }}
          >
            Begin Qualification
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className="hero-cta-arrow"
              style={{ transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0 }}
            >
              <path
                d="M1 5h12m0 0L8.5 1M13 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#science"
            className="hero-cta-secondary"
            style={{
              color: "rgba(247, 247, 243, 0.72)",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              paddingBottom: 2,
              borderBottom: "1px solid rgba(247, 247, 243, 0.28)",
              transition: "color 0.18s ease, border-color 0.18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#F7F7F3";
              el.style.borderBottomColor = "rgba(247, 247, 243, 0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(247, 247, 243, 0.72)";
              el.style.borderBottomColor = "rgba(247, 247, 243, 0.28)";
            }}
          >
            Read the Science
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mind-hero-trust"
          style={{
            paddingTop: 20,
            borderTop: "1px solid rgba(247, 247, 243, 0.07)",
          }}
        >
          {TRUST_ITEMS.map((t) => (
            <span
              key={t}
              className="mind-hero-trust-item"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(247, 247, 243, 0.35)",
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <ScrollCue />

      <style>{`
        @keyframes heroChipPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }

        @keyframes heroOrbDrift1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(140px, 90px) scale(1.12); }
        }
        @keyframes heroOrbDrift2 {
          0%   { transform: translate(0px, 0px) scale(1.08); }
          100% { transform: translate(-90px, -70px) scale(1); }
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-orb-a {
          width: 720px;
          height: 720px;
          background: radial-gradient(circle, rgba(30,205,146,0.065) 0%, transparent 68%);
          top: -220px;
          left: -220px;
          filter: blur(60px);
          animation: heroOrbDrift1 22s ease-in-out infinite alternate;
        }
        .hero-orb-b {
          width: 540px;
          height: 540px;
          background: radial-gradient(circle, rgba(21,165,116,0.05) 0%, transparent 70%);
          bottom: -120px;
          right: -120px;
          filter: blur(60px);
          animation: heroOrbDrift2 28s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb-a, .hero-orb-b { animation: none; }
        }

        .mind-hero-container {
          padding: 104px 24px 72px;
        }
        .mind-hero-headline {
          font-size: clamp(38px, 11vw, 96px);
        }
        .mind-hero-body {
          font-size: 15px;
        }
        .hero-body-full { display: none; }
        .hero-body-short { display: inline; }

        .mind-hero-ctas {
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-cta-primary {
          padding: 14px 28px;
          width: auto;
        }
        .hero-cta-secondary {
          display: none;
        }

        .mind-hero-trust {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 0;
        }
        .mind-hero-trust-item {
          display: block;
        }

        @media (min-width: 480px) {
          .mind-hero-ctas {
            flex-direction: row;
            align-items: center;
          }
          .hero-cta-secondary {
            display: block;
          }
          .mind-hero-trust {
            display: flex;
            flex-wrap: wrap;
            gap: 0;
          }
          .mind-hero-trust-item {
            display: inline;
            padding-right: 18px;
            margin-right: 18px;
            border-right: 1px solid rgba(247, 247, 243, 0.08);
          }
          .mind-hero-trust-item:last-child {
            padding-right: 0;
            margin-right: 0;
            border-right: none;
          }
          .hero-body-full { display: inline; }
          .hero-body-short { display: none; }
        }

        @media (min-width: 640px) {
          .mind-hero-container {
            padding: clamp(100px, 12vw, 140px) clamp(28px, 4vw, 48px) clamp(64px, 8vw, 80px);
          }
          .mind-hero-body {
            font-size: 17px;
          }
        }

        @media (min-width: 900px) {
          .mind-hero-body {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
}

function CornerRegistry({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const offset = 24;
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: offset, left: offset },
    tr: { top: offset, right: offset },
    bl: { bottom: offset, left: offset },
    br: { bottom: offset, right: offset },
  };
  const rotations: Record<string, number> = { tl: 0, tr: 90, bl: 270, br: 180 };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      className="hero-corner"
      style={{
        position: "absolute",
        zIndex: 2,
        opacity: 0.32,
        transform: `rotate(${rotations[pos]}deg)`,
        ...positions[pos],
      }}
    >
      <path d="M2 8 V2 H8" stroke="rgba(247, 247, 243, 0.6)" strokeWidth="1" />
      <circle cx="2" cy="2" r="1" fill="#1ECD92" />
    </svg>
  );
}

function ScrollCue() {
  return (
    <div
      aria-hidden
      className="hero-scroll-cue"
      style={{
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        color: "rgba(247, 247, 243, 0.36)",
        fontSize: 10,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      <span>Scroll</span>
      <span
        style={{
          width: 1,
          height: 36,
          background: "linear-gradient(to bottom, rgba(247, 247, 243, 0.4), transparent)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 14,
            background: "#1ECD92",
            animation: "heroScrollTick 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          }}
        />
      </span>
      <style>{`
        @keyframes heroScrollTick {
          0% { transform: translateY(-14px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(36px); opacity: 0; }
        }
        @media (max-width: 640px) {
          .hero-scroll-cue { display: none; }
        }
      `}</style>
    </div>
  );
}
