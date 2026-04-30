"use client";

const CREDENTIALS = [
  "503A Compounded",
  "USP <797> Standards",
  "NABP Accredited",
  "LegitScript Certified",
  "HIPAA Compliant",
  "cGMP Manufacturing",
  "Licensed Clinicians",
  "21 CFR Part 211",
  "Pharmacist Verified",
  "Cold-Chain Shipped",
];

function Pill() {
  return (
    <span
      aria-hidden
      style={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "#1ECD92",
        flexShrink: 0,
        opacity: 0.9,
      }}
    />
  );
}

export function MindCredentials() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        color: "#F7F7F3",
        padding: "clamp(40px, 5vw, 64px) 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(247, 247, 243, 0.06)",
        borderBottom: "1px solid rgba(247, 247, 243, 0.06)",
      }}
    >
      {/* edge fades */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 120,
          background: "linear-gradient(to right, #0A0A0A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 120,
          background: "linear-gradient(to left, #0A0A0A, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(247, 247, 243, 0.32)",
          fontWeight: 500,
          marginBottom: 20,
        }}
      >
        Standards · Accreditations · Compliance
      </div>

      <div
        className="cred-marquee"
        style={{
          display: "flex",
          gap: 0,
          width: "max-content",
        }}
      >
        {/* doubled list for seamless loop */}
        {[...CREDENTIALS, ...CREDENTIALS].map((c, i) => (
          <div
            key={`${c}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "0 32px",
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "rgba(247, 247, 243, 0.62)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <Pill />
            {c}
          </div>
        ))}
      </div>

      <style>{`
        .cred-marquee {
          animation: credScroll 38s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cred-marquee { animation: none; }
        }
        @keyframes credScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
