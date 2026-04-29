export function MindClinical() {
  return (
    <section style={{ background: "#F7F7F3" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "140px 48px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: 96,
            alignItems: "start",
          }}
          className="mind-clinical-grid"
        >
          {/* Left */}
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#15A574",
                fontWeight: 600,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "#1ECD92",
                }}
              />
              The Standard
            </span>

            <h2
              style={{
                fontSize: "clamp(38px, 5vw, 62px)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: "#0A0A0A",
              }}
            >
              Not a supplement.
              <br />
              <em style={{ fontStyle: "italic", color: "#15A574" }}>A protocol.</em>
            </h2>
          </div>

          {/* Right */}
          <div>
            <p
              style={{
                fontSize: 21,
                lineHeight: 1.58,
                color: "#0A0A0A",
                fontWeight: 400,
                letterSpacing: "-0.005em",
                marginBottom: 20,
              }}
            >
              Medici Mind is compounded under strict 503A standards and reviewed by licensed
              clinicians.
            </p>
            <p
              style={{
                fontSize: 21,
                lineHeight: 1.58,
                color: "#4F4F4F",
                fontWeight: 400,
                letterSpacing: "-0.005em",
                marginBottom: 40,
              }}
            >
              It is intended for individuals who maintain disciplined sleep, nutrition, and exercise
              habits, seeking evidence-based support for age-related cognitive optimization.
            </p>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                background: "rgba(30, 205, 146, 0.06)",
                border: "1px solid rgba(30, 205, 146, 0.3)",
                borderRadius: 999,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#15A574",
                fontWeight: 600,
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
              503A Compounded &middot; Physician-Guided
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mind-clinical-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
