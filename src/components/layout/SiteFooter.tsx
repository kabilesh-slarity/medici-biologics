"use client";

const FOOTER_COLS = [
  {
    label: "Protocols",
    links: [
      { label: "Medici Mind", href: "#" },
      { label: "Coming Soon", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Medici", href: "https://medi.ci" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    label: "Care",
    links: [
      { label: "Dr. Gabi", href: "#" },
      { label: "Concierge", href: "#" },
      { label: "Member Login", href: "/start" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "HIPAA Notice", href: "#" },
];

const DISCLAIMER =
  "Medici Mind is a compounded preparation prepared under 503A standards by a licensed compounding pharmacy. These statements have not been evaluated by the FDA. Medici Mind is not intended to diagnose, treat, cure, or prevent any disease. All orders require clinical review and approval. This product is not appropriate for individuals under 18, those who are pregnant or nursing, or those with certain medical conditions.";

export function SiteFooter() {
  return (
    <footer style={{ background: "#000000", color: "rgba(247, 247, 243, 0.6)", paddingBottom: 40 }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 48px 0",
          boxSizing: "border-box",
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(247, 247, 243, 0.07)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  color: "#F7F7F3",
                  textTransform: "lowercase",
                  display: "inline-flex",
                  alignItems: "center",
                  lineHeight: 1,
                }}
              >
                medi
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    background: "#1ECD92",
                    borderRadius: "50%",
                    margin: "0 1px",
                    transform: "translateY(-3px)",
                  }}
                />
                ci
              </span>
              <span
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 9,
                  letterSpacing: "0.4em",
                  color: "rgba(247, 247, 243, 0.55)",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Peptides
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: "rgba(247, 247, 243, 0.45)",
                maxWidth: 300,
                fontWeight: 400,
              }}
            >
              Building the world&rsquo;s healthiest community. Medici Peptides is the AI-first peptide
              platform from the team behind Medici.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <h4
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(247, 247, 243, 0.35)",
                  marginBottom: 20,
                  fontWeight: 600,
                }}
              >
                {col.label}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 12 }}>
                    <a
                      href={l.href}
                      style={{
                        color: "rgba(247, 247, 243, 0.58)",
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 400,
                        transition: "color 0.18s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#F7F7F3")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.58)")
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            marginTop: 32,
            fontSize: 11,
            lineHeight: 1.72,
            color: "rgba(247, 247, 243, 0.3)",
            fontWeight: 400,
            maxWidth: 880,
          }}
        >
          {DISCLAIMER}
        </p>

        {/* Bottom */}
        <div
          style={{
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(247, 247, 243, 0.32)" }}>
            &copy; 2026 Medici Peptides. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {LEGAL.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontSize: 12,
                  color: "rgba(247, 247, 243, 0.32)",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.65)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.32)")
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
