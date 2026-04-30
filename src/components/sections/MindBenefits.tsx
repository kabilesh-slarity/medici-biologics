const BENEFITS = [
  {
    num: "01",
    title: "Enhanced Executive Function",
    desc: "Semax supports dopaminergic and serotonergic pathways associated with improved attention, working memory, and cognitive processing speed.",
  },
  {
    num: "02",
    title: "Stress Resilience & Emotional Balance",
    desc: "Selank modulates GABA and BDNF activity, helping reduce anxiety-related cognitive interference while preserving mental clarity.",
  },
  {
    num: "03",
    title: "Neuroplasticity & Long-Term Brain Health",
    desc: "Dihexa promotes neurotrophic activity and synapse formation, supporting structural brain resilience that may decline with age.",
  },
  {
    num: "04",
    title: "Sustained Mental Energy Without Stimulation",
    desc: "Users commonly report improved focus and reduced mental fatigue without the jitteriness or crash associated with traditional stimulants.",
  },
  {
    num: "05",
    title: "Measurable Protocol Support",
    desc: "Designed to work synergistically with lifestyle optimization. Proper sleep, resistance training, and omega-3 intake have been shown to amplify peptide efficacy in related studies.",
  },
];

export function MindBenefits() {
  return (
    <section id="science" style={{ background: "#0A0A0A", color: "#F7F7F3" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(72px, 11vw, 140px) clamp(20px, 4vw, 48px)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span
            style={{
              fontSize: 11,
              color: "#1ECD92",
              display: "block",
              marginBottom: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            No. 02
          </span>
          <h2
            style={{
              fontSize: "clamp(38px, 5.2vw, 68px)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#F7F7F3",
              marginBottom: 24,
            }}
          >
            What Medici Mind
            <br />
            <em style={{ fontStyle: "italic", color: "#1ECD92" }}>delivers.</em>
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "rgba(247, 247, 243, 0.6)",
              maxWidth: 600,
              fontWeight: 400,
            }}
          >
            Each peptide in the Medici Mind protocol targets a distinct neurological pathway.
            Together, they support cognition across the dimensions that matter most.
          </p>
        </div>

        {/* Benefit list */}
        <div>
          {BENEFITS.map((b, i) => (
            <div
              key={b.num}
              className="mind-benefit"
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr 2fr",
                gap: "0 48px",
                padding: "36px 0",
                borderTop: "1px solid rgba(247, 247, 243, 0.07)",
                alignItems: "start",
                cursor: "default",
                borderBottom: i === BENEFITS.length - 1 ? "1px solid rgba(247, 247, 243, 0.07)" : "none",
              }}
            >
              <div
                className="mind-benefit-num"
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "rgba(30, 205, 146, 0.2)",
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {b.num}
              </div>
              <h3
                className="mind-benefit-title"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#F7F7F3",
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  paddingTop: 2,
                }}
              >
                {b.title}
              </h3>
              <p
                className="mind-benefit-desc"
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "rgba(247, 247, 243, 0.6)",
                  fontWeight: 400,
                  paddingTop: 2,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mind-benefit {
            grid-template-columns: 1fr !important;
            gap: 8px 0 !important;
            padding: 28px 0 !important;
          }
          .mind-benefit-num {
            font-size: 22px !important;
            margin-bottom: 2px;
          }
          .mind-benefit-title {
            font-size: 19px !important;
          }
          .mind-benefit-desc {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
}
