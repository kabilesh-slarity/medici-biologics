"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VARIANTS = [
  {
    lead: "Distraction",
    tail: "the default.",
    pathway: "Semax · Focus & Executive Function",
  },
  {
    lead: "Anxiety",
    tail: "your future.",
    pathway: "Selank · Mood & Stress Resilience",
  },
  {
    lead: "Decline",
    tail: "inevitable.",
    pathway: "Dihexa · Neuroplasticity Pathway",
  },
];

const TRUST_ITEMS = ["503A Compounded", "Physician-Guided", "Licensed Clinicians", "Discreet Shipping"];

export function MindHero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % 3), 5200);
    return () => clearInterval(timer);
  }, []);

  const v = VARIANTS[idx];

  return (
    <section
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
      <OrbitalRings />

      <div
        className="mind-hero-container"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >

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
              marginBottom: 18,
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
              marginBottom: 24,
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
              }}
            />
            {v.pathway}
          </motion.div>
        </AnimatePresence>

        {/* Body — shorter/smaller on mobile */}
        <motion.p
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="mind-hero-body"
          style={{
            lineHeight: 1.6,
            maxWidth: 600,
            color: "rgba(247, 247, 243, 0.65)",
            marginBottom: 32,
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

        {/* CTAs */}
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          className="mind-hero-ctas"
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginBottom: 44,
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
              transition: "background 0.2s ease, transform 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#2BE5A6";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#1ECD92";
              el.style.transform = "translateY(0)";
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

        {/* Trust strip */}
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

      <style>{`
        /* Mobile base */
        .mind-hero-container {
          padding: 88px 20px 60px;
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
          width: 100%;
          justify-content: center;
        }
        .hero-cta-secondary {
          display: none;
        }

        .hero-meta-desktop { display: none; }
        .hero-meta-mobile { display: inline-flex; }

        /* Trust: 2×2 grid on smallest screens */
        .mind-hero-trust {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 0;
        }
        .mind-hero-trust-item {
          display: block;
        }

        .orbital-rings {
          display: none;
        }

        /* 480px+: CTAs in a row, trust in a row, body full */
        @media (min-width: 480px) {
          .mind-hero-ctas {
            flex-direction: row;
            align-items: center;
          }
          .hero-cta-primary {
            width: auto;
            justify-content: flex-start;
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

        /* 640px+: switch to desktop meta row, expand body */
        @media (min-width: 640px) {
          .mind-hero-container {
            padding: clamp(100px, 12vw, 140px) clamp(28px, 4vw, 48px) clamp(64px, 8vw, 80px);
          }
          .hero-meta-desktop { display: flex; }
          .hero-meta-mobile { display: none; }
          .mind-hero-body {
            font-size: 17px;
          }
          .orbital-rings {
            display: block;
            opacity: 0.14;
          }
        }

        @media (min-width: 900px) {
          .orbital-rings {
            opacity: 0.28;
          }
          .mind-hero-body {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
}

function OrbitalRings() {
  return (
    <svg
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden
      className="orbital-rings"
      style={{
        position: "absolute",
        top: "50%",
        right: "-160px",
        transform: "translateY(-50%)",
        width: 780,
        height: 780,
        pointerEvents: "none",
      }}
    >
      <circle cx="450" cy="450" r="420" stroke="#F7F7F3" strokeWidth="0.5" strokeDasharray="2 7" />
      <circle cx="450" cy="450" r="340" stroke="#F7F7F3" strokeWidth="0.5" opacity="0.65" />
      <circle cx="450" cy="450" r="250" stroke="#F7F7F3" strokeWidth="0.4" strokeDasharray="1 5" opacity="0.5" />
      <circle cx="450" cy="450" r="160" stroke="#F7F7F3" strokeWidth="0.4" opacity="0.35" />
      <circle cx="450" cy="30" r="3.5" fill="#1ECD92" />
      <circle cx="870" cy="450" r="2.5" fill="#1ECD92" opacity="0.7" />
      <circle cx="120" cy="560" r="2" fill="#F7F7F3" opacity="0.4" />
      <circle cx="700" cy="180" r="2" fill="#F7F7F3" opacity="0.3" />
    </svg>
  );
}
