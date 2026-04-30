const COMPOUNDS = [
  {
    roman: "i.",
    name: "Semax",
    formula: "Heptapeptide · ACTH(4-7) analog",
    pathway: "Focus & Working Memory",
    desc: "Modulates dopamine and serotonin signaling. Studied for attention, working memory, and rapid cognitive processing under load. Administered intranasally for rapid central uptake.",
  },
  {
    roman: "ii.",
    name: "Selank",
    formula: "Heptapeptide · Tuftsin analog",
    pathway: "Mood & Stress Resilience",
    desc: "Modulates GABAergic activity and BDNF expression. Reduces anxiety-related cognitive interference without sedation. Supports emotional regulation under sustained cognitive demand.",
  },
  {
    roman: "iii.",
    name: "Dihexa",
    formula: "Hexapeptide · Angiotensin IV analog",
    pathway: "Neuroplasticity",
    desc: "Promotes hepatocyte growth factor activity and synaptogenesis. Supports neuroplasticity and structural brain resilience. The neurogenic compound in the protocol.",
  },
];

export function MindMechanism() {
  return (
    <section id="protocol" style={{ background: "#F7F7F3" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(72px, 11vw, 140px) clamp(20px, 4vw, 48px)",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            marginBottom: 80,
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

        {/* Compound entries */}
        <div>
          {COMPOUNDS.map((c, i) => (
            <div
              key={c.name}
              className="mind-mech-entry"
              style={{
                borderTop: "1px solid #E8E8E2",
                paddingTop: 52,
                paddingBottom: 52,
                borderBottom: i === COMPOUNDS.length - 1 ? "1px solid #E8E8E2" : "none",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr 1.6fr",
                  gap: "0 56px",
                  alignItems: "start",
                }}
                className="mind-mech-row"
              >
                {/* Roman numeral */}
                <div
                  style={{
                    fontSize: 16,
                    color: "#1ECD92",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    fontStyle: "italic",
                    paddingTop: 14,
                  }}
                >
                  {c.roman}
                </div>

                {/* Name + formula */}
                <div>
                  <h3
                    className="mind-mech-name"
                    style={{
                      fontSize: "clamp(48px, 6vw, 80px)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "#0A0A0A",
                      marginBottom: 12,
                    }}
                  >
                    {c.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#15A574",
                      letterSpacing: "0.04em",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {c.formula}
                  </p>
                </div>

                {/* Pathway + description */}
                <div style={{ paddingTop: 10 }}>
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
                      fontSize: 16,
                      lineHeight: 1.72,
                      color: "#5A5A5A",
                      fontWeight: 400,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mind-mech-row {
            grid-template-columns: 40px 1fr !important;
            gap: 0 24px !important;
          }
          .mind-mech-row > :last-child {
            grid-column: 2 / -1;
            margin-top: 20px;
          }
        }
        @media (max-width: 900px) {
          .mind-mech-header {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 48px !important;
          }
          .mind-mech-row {
            grid-template-columns: 28px 1fr !important;
            gap: 0 16px !important;
          }
          .mind-mech-entry {
            padding-top: 36px !important;
            padding-bottom: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .mind-mech-name {
            font-size: clamp(36px, 11vw, 56px) !important;
          }
          .mind-mech-row {
            grid-template-columns: 24px 1fr !important;
            gap: 0 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
