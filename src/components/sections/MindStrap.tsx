const PEPTIDES = [
  {
    num: "i.",
    name: "Semax",
    pathway: "Focus, working memory\n& cognitive processing speed",
  },
  {
    num: "ii.",
    name: "Selank",
    pathway: "Stress resilience\n& emotional regulation",
  },
  {
    num: "iii.",
    name: "Dihexa",
    pathway: "Neuroplasticity\n& long-term brain health",
  },
];

export function MindStrap() {
  return (
    <section style={{ background: "#111111" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
        className="mind-strap-grid"
      >
        {PEPTIDES.map((p, i) => (
          <div
            key={p.name}
            className="mind-strap-item"
            style={{
              padding: "64px 48px",
              borderRight: i < 2 ? "1px solid rgba(247, 247, 243, 0.07)" : "none",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 2,
                width: 0,
                background: "#1ECD92",
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="mind-strap-trace"
            />

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
                marginBottom: 14,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {p.name}
            </h3>

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
        .mind-strap-item:hover .mind-strap-trace {
          width: 100%;
        }
        @media (max-width: 900px) {
          .mind-strap-grid {
            grid-template-columns: 1fr !important;
          }
          .mind-strap-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(247, 247, 243, 0.07) !important;
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
