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
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "140px 48px 80px",
          position: "relative",
          zIndex: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Protocol meta */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(247, 247, 243, 0.08)",
            paddingBottom: 20,
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(247, 247, 243, 0.45)",
              fontWeight: 500,
            }}
          >
            A Medici Peptides Protocol &middot;{" "}
            <strong style={{ color: "rgba(247, 247, 243, 0.7)", fontWeight: 600 }}>
              No. 01
            </strong>
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(247, 247, 243, 0.45)",
              fontWeight: 500,
            }}
          >
            Founding Series &middot; 30-Day Supply
          </span>
        </motion.div>

        {/* Rotating headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontWeight: 700,
              fontSize: "clamp(52px, 8vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              marginBottom: 28,
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 36,
              padding: "7px 16px 7px 12px",
              background: "rgba(30, 205, 146, 0.08)",
              border: "1px solid rgba(30, 205, 146, 0.22)",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(30, 205, 146, 0.9)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: "#1ECD92",
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {v.pathway}
          </motion.div>
        </AnimatePresence>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{
            fontSize: 19,
            lineHeight: 1.62,
            maxWidth: 600,
            color: "rgba(247, 247, 243, 0.68)",
            marginBottom: 52,
            fontWeight: 400,
          }}
        >
          Medici Mind is a precision-compounded protocol of Semax, Selank, and Dihexa, engineered for
          adults who have decided that what happens to the mind over time is a question of preparation,
          not fate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 56,
          }}
        >
          <a
            href="#qualify"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
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
              style={{ transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)" }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: "flex",
            gap: 0,
            paddingTop: 24,
            borderTop: "1px solid rgba(247, 247, 243, 0.07)",
            flexWrap: "wrap",
            rowGap: 12,
          }}
        >
          {["503A Compounded", "Physician-Guided", "Licensed Clinicians", "Discreet Shipping"].map(
            (t, i) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(247, 247, 243, 0.35)",
                  fontWeight: 500,
                  paddingRight: i < 3 ? 24 : 0,
                  marginRight: i < 3 ? 24 : 0,
                  borderRight: i < 3 ? "1px solid rgba(247, 247, 243, 0.08)" : "none",
                }}
              >
                {t}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

function OrbitalRings() {
  return (
    <svg
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        right: "-160px",
        transform: "translateY(-50%)",
        width: 780,
        height: 780,
        opacity: 0.28,
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
