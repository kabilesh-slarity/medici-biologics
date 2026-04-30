"use client";

import { useEffect, useRef, useState } from "react";
import { MoleculeChain } from "@/components/effects/MoleculeChain";

const PEPTIDES = [
  {
    num: "i.",
    name: "Semax",
    pathway: "Focus, working memory\n& cognitive processing speed",
    variant: "semax" as const,
    formula: "C₆₅H₁₀₂N₂₀O₂₀",
  },
  {
    num: "ii.",
    name: "Selank",
    pathway: "Stress resilience\n& emotional regulation",
    variant: "selank" as const,
    formula: "C₃₃H₅₇N₁₁O₉",
  },
  {
    num: "iii.",
    name: "Dihexa",
    pathway: "Neuroplasticity\n& long-term brain health",
    variant: "dihexa" as const,
    formula: "C₃₈H₅₇N₇O₈",
  },
];

export function MindStrap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#111111", position: "relative", overflow: "hidden" }}>
      {/* faint blueprint grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(247, 247, 243, 0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(247, 247, 243, 0.018) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          position: "relative",
        }}
        className="mind-strap-grid"
      >
        {PEPTIDES.map((p, i) => (
          <div
            key={p.name}
            className="mind-strap-item"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "clamp(56px, 7vw, 80px) clamp(20px, 5vw, 48px)",
              borderRight: i < 2 ? "1px solid rgba(247, 247, 243, 0.07)" : "none",
              position: "relative",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s, background 0.4s ease`,
              background: hovered === i ? "rgba(30, 205, 146, 0.025)" : "transparent",
            }}
          >
            {/* top trace */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                width: hovered === i ? "100%" : "0%",
                background: "linear-gradient(90deg, transparent 0%, #1ECD92 30%, #1ECD92 70%, transparent 100%)",
                transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />

            {/* molecular signature */}
            <div style={{ marginBottom: 28, height: 56 }}>
              <MoleculeChain variant={p.variant} active={hovered === i} />
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#1ECD92",
                marginBottom: 16,
                letterSpacing: "0.12em",
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              {p.num}
            </div>

            <h3
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: "#F7F7F3",
                marginBottom: 8,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {p.name}
            </h3>

            <div
              style={{
                fontSize: 11,
                color: "rgba(30, 205, 146, 0.55)",
                marginBottom: 18,
                letterSpacing: "0.04em",
                fontWeight: 400,
                fontVariantNumeric: "tabular-nums",
                opacity: hovered === i ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            >
              {p.formula}
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: "rgba(247, 247, 243, 0.5)",
                fontWeight: 400,
                whiteSpace: "pre-line",
              }}
            >
              {p.pathway}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .mind-strap-item {
          will-change: transform, background;
        }
        @media (max-width: 900px) {
          .mind-strap-grid {
            grid-template-columns: 1fr !important;
          }
          .mind-strap-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(247, 247, 243, 0.07) !important;
            padding: clamp(40px, 6vw, 56px) clamp(20px, 5vw, 40px) !important;
          }
        }
      `}</style>
    </section>
  );
}
