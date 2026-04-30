"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoleculeChain } from "@/components/effects/MoleculeChain";

type CompoundId = "semax" | "selank" | "dihexa";

const COMPOUNDS: {
  id: CompoundId;
  roman: string;
  index: string;
  name: string;
  formula: string;
  weight: string;
  pathway: string;
  desc: string;
  receptor: string;
  delivery: string;
}[] = [
  {
    id: "semax",
    roman: "i.",
    index: "01 / 03",
    name: "Semax",
    formula: "Heptapeptide · ACTH(4-7) analog",
    weight: "813.93 g/mol",
    pathway: "Focus & Working Memory",
    desc: "Modulates dopamine and serotonin signaling. Studied for attention, working memory, and rapid cognitive processing under load. Administered intranasally for rapid central uptake.",
    receptor: "D2 / 5-HT pathway",
    delivery: "Intranasal · 1 spray AM",
  },
  {
    id: "selank",
    roman: "ii.",
    index: "02 / 03",
    name: "Selank",
    formula: "Heptapeptide · Tuftsin analog",
    weight: "751.86 g/mol",
    pathway: "Mood & Stress Resilience",
    desc: "Modulates GABAergic activity and BDNF expression. Reduces anxiety-related cognitive interference without sedation. Supports emotional regulation under sustained cognitive demand.",
    receptor: "GABA-A · BDNF",
    delivery: "Intranasal · 2 sprays daily",
  },
  {
    id: "dihexa",
    roman: "iii.",
    index: "03 / 03",
    name: "Dihexa",
    formula: "Hexapeptide · Angiotensin IV analog",
    weight: "748.92 g/mol",
    pathway: "Neuroplasticity",
    desc: "Promotes hepatocyte growth factor activity and synaptogenesis. Supports neuroplasticity and structural brain resilience. The neurogenic compound in the protocol.",
    receptor: "HGF / c-Met",
    delivery: "Oral capsule · 1 daily",
  },
];

export function MindMechanism() {
  const [activeIdx, setActiveIdx] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdxRef = useRef(0);
  const scrollLocked = useRef(false);

  // Keep ref in sync for use inside event handlers
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // IntersectionObserver — updates which compound is active as user scrolls
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && e.intersectionRatio > 0.5) {
              setActiveIdx(i);
            }
          }
        },
        { threshold: [0.5, 0.6, 0.7], rootMargin: "-20% 0px -30% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Wheel interceptor — advances compounds one-at-a-time on desktop
  useEffect(() => {
    const isMobile = () => window.innerWidth <= 900;
    let timer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      if (isMobile()) return;

      const first = rowRefs.current[0];
      const last = rowRefs.current[COMPOUNDS.length - 1];
      if (!first || !last) return;

      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only intercept while the scrollytelling rows are in the viewport
      const inZone = firstRect.top < vh * 0.55 && lastRect.bottom > vh * 0.45;
      if (!inZone) return;

      const goingDown = e.deltaY > 0;
      const cur = activeIdxRef.current;

      // Let scroll pass through naturally at the edges
      if (goingDown && cur === COMPOUNDS.length - 1) return;
      if (!goingDown && cur === 0) return;

      const nextIdx = goingDown
        ? Math.min(cur + 1, COMPOUNDS.length - 1)
        : Math.max(cur - 1, 0);

      if (nextIdx === cur) return;

      e.preventDefault();
      if (scrollLocked.current) return;
      scrollLocked.current = true;

      const target = rowRefs.current[nextIdx];
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        scrollLocked.current = false;
      }, 950);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, []);

  const active = COMPOUNDS[activeIdx];

  return (
    <section id="protocol" style={{ background: "#F7F7F3", position: "relative" }}>
      {/* Header band */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(72px, 11vw, 140px) clamp(20px, 4vw, 48px) clamp(40px, 6vw, 64px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
          className="mind-mech-header"
        >
          <div>
            <span
              style={{
                fontSize: 11,
                color: "#15A574",
                display: "block",
                marginBottom: 20,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              No. 03
            </span>
            <h2
              style={{
                fontSize: "clamp(38px, 5.2vw, 68px)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "#0A0A0A",
              }}
            >
              Three peptides.
              <br />
              <em style={{ fontStyle: "italic", color: "#15A574" }}>Three pathways.</em>
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#5A5A5A",
              fontWeight: 400,
              paddingBottom: 8,
            }}
          >
            Each compound was selected for its distinct mechanism. Combined, they create a synergistic
            effect across focus, mood, and structural brain health. This is not a stack. It is a
            designed protocol.
          </p>
        </div>
      </div>

      {/* Scrollytelling grid */}
      <div
        ref={containerRef}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px) clamp(72px, 11vw, 140px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
          }}
          className="mind-mech-scrolly"
        >
          {/* LEFT — scrolling content rows */}
          <div>
            {COMPOUNDS.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="mind-mech-row-scrolly"
                style={{
                  minHeight: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingTop: 24,
                  paddingBottom: 24,
                  borderTop: i === 0 ? "none" : "1px solid rgba(10, 10, 10, 0.07)",
                  position: "relative",
                }}
              >
                {/* progress dot indicator */}
                <span
                  style={{
                    position: "absolute",
                    top: i === 0 ? 0 : -5,
                    left: 0,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#F7F7F3",
                    border: `1.5px solid ${activeIdx === i ? "#1ECD92" : "rgba(10, 10, 10, 0.15)"}`,
                    transition: "border-color 0.4s ease, transform 0.4s ease",
                    transform: activeIdx === i ? "scale(1.2)" : "scale(1)",
                    display: i === 0 ? "none" : "block",
                  }}
                  aria-hidden
                />

                <span
                  style={{
                    fontSize: 11,
                    color: "#15A574",
                    display: "inline-block",
                    marginBottom: 18,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontStyle: "italic",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {c.index}
                </span>
                <h3
                  className="mind-mech-name"
                  style={{
                    fontSize: "clamp(48px, 7vw, 96px)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "#0A0A0A",
                    marginBottom: 14,
                  }}
                >
                  {c.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#15A574",
                    letterSpacing: "0.06em",
                    fontStyle: "italic",
                    fontWeight: 500,
                    marginBottom: 24,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {c.formula}
                </p>

                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#15A574",
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  Pathway: {c.pathway}
                </div>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.72,
                    color: "#3A3A3A",
                    fontWeight: 400,
                    marginBottom: 32,
                    maxWidth: 520,
                  }}
                >
                  {c.desc}
                </p>

                {/* meta grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(10, 10, 10, 0.07)",
                    maxWidth: 480,
                  }}
                >
                  <MetaCell label="Receptor target" value={c.receptor} />
                  <MetaCell label="Delivery" value={c.delivery} />
                  <MetaCell label="Molecular weight" value={c.weight} />
                  <MetaCell label="Class" value="Bioregulatory peptide" />
                </div>

                {/* mobile-only inline molecule */}
                <div className="mind-mech-mobile-mol" style={{ marginTop: 36, display: "none" }}>
                  <MoleculeChain variant={c.id} active={true} width={220} height={80} />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky visualization */}
          <div className="mind-mech-sticky-col">
            <div
              className="mind-mech-sticky-inner"
              style={{
                position: "sticky",
                top: 92,
                height: "min(86vh, 720px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MoleculeStage active={active} index={activeIdx} total={COMPOUNDS.length} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mind-mech-header {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .mind-mech-scrolly {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .mind-mech-row-scrolly {
            min-height: 88vh !important;
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
          .mind-mech-sticky-col {
            display: none;
          }
          .mind-mech-mobile-mol {
            display: block !important;
          }
          .mind-mech-name {
            font-size: clamp(40px, 12vw, 64px) !important;
          }
        }
      `}</style>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8C8C8C",
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#0A0A0A",
          fontWeight: 500,
          letterSpacing: "0.01em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MoleculeStage({
  active,
  index,
  total,
}: {
  active: { id: CompoundId; name: string; pathway: string; weight: string };
  index: number;
  total: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* concentric ring backdrop */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
      >
        <circle cx="300" cy="300" r="280" stroke="#0A0A0A" strokeOpacity="0.07" strokeWidth="0.5" />
        <circle
          cx="300"
          cy="300"
          r="220"
          stroke="#0A0A0A"
          strokeOpacity="0.1"
          strokeWidth="0.5"
          strokeDasharray="2 7"
        />
        <circle cx="300" cy="300" r="160" stroke="#0A0A0A" strokeOpacity="0.08" strokeWidth="0.5" />
        <circle
          cx="300"
          cy="300"
          r="100"
          stroke="#1ECD92"
          strokeOpacity="0.16"
          strokeWidth="0.6"
          strokeDasharray="1 5"
        />
        {/* small markers */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.round(300 + Math.cos(angle) * 280);
            const y = Math.round(300 + Math.sin(angle) * 280);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 3 === 0 ? 1.6 : 0.8}
                fill={i % 3 === 0 ? "#1ECD92" : "#0A0A0A"}
                fillOpacity={i % 3 === 0 ? 0.5 : 0.2}
              />
            );
          })}
        </g>
      </svg>

      {/* compound name overlay (top) */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(10, 10, 10, 0.5)",
          fontWeight: 500,
        }}
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span>Live Diagram</span>
      </div>

      {/* compound molecule (animated swap) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ transform: "scale(2.2)", padding: "40px 0" }}>
            <MoleculeChain variant={active.id} active width={156} height={56} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#15A574",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {active.pathway}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(10, 10, 10, 0.55)",
                fontVariantNumeric: "tabular-nums",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              MW {active.weight}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* progress rail (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        aria-hidden
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              flex: i === index ? 4 : 1,
              height: 2,
              borderRadius: 1,
              background:
                i === index ? "#1ECD92" : i < index ? "rgba(30, 205, 146, 0.32)" : "rgba(10, 10, 10, 0.1)",
              transition: "flex 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
