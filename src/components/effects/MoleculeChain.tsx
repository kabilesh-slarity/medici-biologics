"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "semax" | "selank" | "dihexa";

const SHAPES: Record<Variant, { x: number; y: number; r: number; ring?: boolean }[]> = {
  // Heptapeptide-inspired: 7 nodes arranged like an active site fold
  semax: [
    { x: 14, y: 38, r: 4 },
    { x: 36, y: 24, r: 5 },
    { x: 60, y: 30, r: 4 },
    { x: 78, y: 16, r: 5, ring: true },
    { x: 100, y: 28, r: 4 },
    { x: 122, y: 18, r: 5 },
    { x: 142, y: 36, r: 4 },
  ],
  // Tuftsin analog: tighter coil, GABA modulation aesthetic
  selank: [
    { x: 14, y: 30, r: 4 },
    { x: 32, y: 42, r: 5 },
    { x: 56, y: 24, r: 4, ring: true },
    { x: 78, y: 36, r: 5 },
    { x: 98, y: 22, r: 4 },
    { x: 120, y: 34, r: 5 },
    { x: 142, y: 22, r: 4 },
  ],
  // Hexapeptide angiotensin IV analog: linear with terminal ring
  dihexa: [
    { x: 14, y: 32, r: 4 },
    { x: 38, y: 24, r: 4 },
    { x: 62, y: 36, r: 5 },
    { x: 88, y: 22, r: 4 },
    { x: 114, y: 32, r: 5, ring: true },
    { x: 142, y: 26, r: 5 },
  ],
};

export function MoleculeChain({
  variant,
  active = false,
  width = 156,
  height = 56,
}: {
  variant: Variant;
  active?: boolean;
  width?: number;
  height?: number;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const nodes = SHAPES[variant];
  const draw = inView || active;

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 156 56`}
      fill="none"
      aria-hidden
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <filter id={`mol-glow-${variant}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* bonds (drawn as a single path so we can stroke-dash animate) */}
      <path
        d={nodes
          .map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`)
          .join(" ")}
        stroke="rgba(247, 247, 243, 0.32)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={400}
        strokeDashoffset={draw ? 0 : 400}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "0.15s",
        }}
      />

      {/* emerald accent stroke that brightens when active */}
      <path
        d={nodes
          .map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`)
          .join(" ")}
        stroke="#1ECD92"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={400}
        strokeDashoffset={400}
        opacity={active ? 0.85 : 0.18}
        style={{
          transition: "opacity 0.4s ease, stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          strokeDashoffset: draw ? 0 : 400,
          transitionDelay: "0.4s, 0.4s",
          filter: active ? `url(#mol-glow-${variant})` : "none",
        }}
      />

      {/* nodes */}
      {nodes.map((n, i) => (
        <g
          key={i}
          style={{
            opacity: draw ? 1 : 0,
            transform: draw ? "scale(1)" : "scale(0.4)",
            transformOrigin: `${n.x}px ${n.y}px`,
            transition: `opacity 0.5s ease ${0.5 + i * 0.07}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.07}s`,
          }}
        >
          {n.ring && (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 4}
              stroke="#1ECD92"
              strokeWidth={0.8}
              opacity={active ? 0.6 : 0.25}
              fill="none"
            />
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.ring ? "#1ECD92" : "rgba(247, 247, 243, 0.85)"}
            opacity={n.ring ? 1 : 0.85}
          />
          {n.ring && (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="#1ECD92"
              opacity={active ? 0.5 : 0}
              style={{
                transformOrigin: `${n.x}px ${n.y}px`,
                animation: active ? "molPulse 1.8s ease-in-out infinite" : "none",
              }}
            />
          )}
        </g>
      ))}

      <style>{`
        @keyframes molPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
