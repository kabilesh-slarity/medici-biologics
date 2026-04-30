"use client";

import { useEffect, useRef, useState } from "react";

const MINI_QUOTES = [
  { quote: "Sharper recall, calmer days.", role: "Surgeon, 47" },
  { quote: "The fog lifted by week three.", role: "Founder, 52" },
  { quote: "Decision fatigue is gone.", role: "Litigator, 49" },
  { quote: "I sleep better. I think clearer.", role: "CIO, 56" },
  { quote: "Closest thing to a cognitive reserve.", role: "Researcher, 44" },
  { quote: "Steady focus, no jitters.", role: "Pilot, 51" },
];

export function MindTestimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-80px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
        color: "#F7F7F3",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* drifting ambient particles */}
      <FloatingParticles />

      {/* radial wash */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          background: "radial-gradient(circle, rgba(30,205,146,0.045) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <div
        style={{
          padding: "clamp(80px, 12vw, 160px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 80px)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 72,
              color: "#1ECD92",
              lineHeight: 0.7,
              marginBottom: 40,
              fontWeight: 700,
              fontStyle: "italic",
              userSelect: "none",
              opacity: inView ? 0.6 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden
          >
            &ldquo;
          </div>

          <blockquote>
            <p
              style={{
                fontSize: "clamp(24px, 3.2vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.38,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                color: "#F7F7F3",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              After 21 days on Medici Mind, my ability to stay in{" "}
              <em style={{ fontStyle: "italic", color: "#1ECD92" }}>deep work</em>{" "}
              has noticeably improved. The mental clarity is real, and I feel more resilient during
              high-pressure weeks.
            </p>

            <footer
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(247, 247, 243, 0.42)",
                fontWeight: 500,
                opacity: inView ? 1 : 0,
                transition: "opacity 0.9s ease 0.3s",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 1,
                  background: "rgba(30, 205, 146, 0.4)",
                }}
              />
              Verified Client &middot; Private Equity Partner &middot; Age 54
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 1,
                  background: "rgba(30, 205, 146, 0.4)",
                }}
              />
            </footer>
          </blockquote>
        </div>
      </div>

      {/* mini-quote marquee */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px 0 56px",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #0A0A0A 0%, transparent 8%, transparent 92%, #0A0A0A 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          className="testi-marquee"
          style={{
            display: "flex",
            gap: 0,
            width: "max-content",
          }}
        >
          {[...MINI_QUOTES, ...MINI_QUOTES].map((q, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 28px",
                fontSize: 14,
                color: "rgba(247, 247, 243, 0.5)",
                fontWeight: 400,
                whiteSpace: "nowrap",
                fontStyle: "italic",
              }}
            >
              <span style={{ color: "#1ECD92", fontStyle: "normal", opacity: 0.6 }}>&ldquo;</span>
              {q.quote}
              <span style={{ color: "#1ECD92", fontStyle: "normal", opacity: 0.6 }}>&rdquo;</span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(247, 247, 243, 0.32)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontStyle: "normal",
                  paddingLeft: 6,
                  borderLeft: "1px solid rgba(247, 247, 243, 0.1)",
                  marginLeft: 6,
                }}
              >
                {q.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testi-marquee {
          animation: testiScroll 56s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-marquee { animation: none; }
        }
        @keyframes testiScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function FloatingParticles() {
  // SSR-safe: positions are deterministic via index, only rendered after mount via state guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const particles = Array.from({ length: 20 }).map((_, i) => {
    const seed = i * 47.3;
    const x = Math.round((Math.abs(Math.sin(seed)) * 100) * 100) / 100;
    const y = Math.round((Math.abs(Math.cos(seed * 1.7)) * 100) * 100) / 100;
    const size = Math.round(((Math.abs(Math.sin(seed * 0.7)) * 2.4 + 0.8)) * 10) / 10;
    const dur = Math.round((Math.abs(Math.sin(seed * 0.3)) * 14 + 14)) * 1;
    const delay = Math.round((Math.abs(Math.cos(seed * 1.3)) * 12)) * -1;
    return { x, y, size, dur, delay, i };
  });

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <span
          key={p.i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#1ECD92",
            opacity: 0.32,
            boxShadow: "0 0 8px rgba(30, 205, 146, 0.6)",
            animation: `testiFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes testiFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(8px); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="testi"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
