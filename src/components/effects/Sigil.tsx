"use client";

import { useEffect, useRef, useState } from "react";

export function Sigil({
  tone = "dark",
  label,
}: {
  tone?: "dark" | "light";
  label?: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
      { rootMargin: "-30px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const inkColor = tone === "dark" ? "rgba(247, 247, 243, 0.4)" : "rgba(10, 10, 10, 0.45)";
  const lineColor = tone === "dark" ? "rgba(247, 247, 243, 0.08)" : "rgba(10, 10, 10, 0.1)";
  const bg = tone === "dark" ? "#0A0A0A" : "#F7F7F3";

  return (
    <div
      ref={ref}
      style={{
        background: bg,
        padding: "48px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <span
        style={{
          height: 1,
          flex: 1,
          maxWidth: 160,
          background: `linear-gradient(90deg, transparent 0%, ${lineColor} 100%)`,
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "right center",
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="10" stroke={inkColor} strokeWidth="0.8" opacity="0.6" />
          <circle cx="11" cy="11" r="6" stroke={inkColor} strokeWidth="0.6" opacity="0.4" />
          <circle cx="11" cy="11" r="2.4" fill="#1ECD92" />
        </svg>
        {label && (
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: inkColor,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {label}
          </span>
        )}
      </span>

      <span
        style={{
          height: 1,
          flex: 1,
          maxWidth: 160,
          background: `linear-gradient(90deg, ${lineColor} 0%, transparent 100%)`,
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
