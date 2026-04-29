export function MindTestimonial() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        color: "#F7F7F3",
        padding: "160px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(30,205,146,0.035) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <div style={{ maxWidth: 920, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Opening quote mark */}
        <div
          style={{
            fontSize: 72,
            color: "#1ECD92",
            lineHeight: 0.7,
            marginBottom: 40,
            fontWeight: 700,
            fontStyle: "italic",
            userSelect: "none",
            opacity: 0.6,
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
    </section>
  );
}
