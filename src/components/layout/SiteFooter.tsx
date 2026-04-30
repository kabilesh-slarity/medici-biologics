"use client";

import { Logo } from "@/components/layout/Logo";

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
  { label: "HIPAA", href: "#" },
];

const DISCLAIMER =
  "Medici Mind is a compounded preparation prepared under 503A standards by a licensed compounding pharmacy. These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease. All orders require clinical review and approval.";

export function SiteFooter() {
  return (
    <footer style={{ background: "#080808", color: "rgba(247, 247, 243, 0.6)" }}>

      {/* Pre-footer: editorial statement + CTA */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Accent gradient line at top of footer */}
        <div
          aria-hidden
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(30,205,146,0.5) 50%, transparent 100%)",
          }}
        />
        {/* Ambient green bloom */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(30,205,146,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="footer-statement-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding:
              "clamp(56px, 8vw, 96px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40,
          }}
        >
          <p
            className="footer-statement"
            style={{
              fontSize: "clamp(26px, 4vw, 52px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "#F7F7F3",
              margin: 0,
            }}
          >
            Precision begins with
            <br />
            <em style={{ fontStyle: "italic", color: "#1ECD92" }}>a single protocol.</em>
          </p>

          <a
            href="#qualify"
            className="footer-cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "1.5px solid rgba(247, 247, 243, 0.18)",
              color: "#F7F7F3",
              padding: "15px 28px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "border-color 0.22s ease, color 0.22s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#1ECD92";
              el.style.color = "#1ECD92";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(247, 247, 243, 0.18)";
              el.style.color = "#F7F7F3";
            }}
          >
            Begin Qualification
            <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path
                d="M1 4.5h11m0 0L8 1m4 3.5L8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(247, 247, 243, 0.07)",
        }}
      />

      {/* Main grid: brand + links */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(40px, 6vw, 64px) clamp(20px, 4vw, 48px) 0",
          boxSizing: "border-box",
        }}
      >
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Logo className="footer-logo" width={72} height={36} style={{ marginBottom: 14 }} />
            <p className="footer-tagline">
              Building the world&rsquo;s healthiest community. The AI-first peptide platform from
              the team behind Medici.
            </p>
            {/* Small trust marks */}
            <div className="footer-trust-row">
              <span className="footer-trust-chip">503A Compounded</span>
              <span className="footer-trust-chip">Physician-Guided</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <h4 className="footer-col-label">{col.label}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label} className="footer-link-item">
                    <a href={l.href} className="footer-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          style={{
            height: 1,
            background: "rgba(247, 247, 243, 0.06)",
            margin: "clamp(28px, 4vw, 48px) 0 0",
          }}
        />

        {/* Bottom row */}
        <div className="footer-bottom">
          <p className="footer-disclaimer">{DISCLAIMER}</p>
          <div className="footer-legal-row">
            <span style={{ fontSize: 12, color: "rgba(247, 247, 243, 0.25)" }}>
              &copy; 2026 Medici Peptides
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {LEGAL.map((l) => (
                <a key={l.label} href={l.href} className="footer-legal-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-logo .logo-wordmark { font-size: 18px; }
        .footer-logo .logo-dot { width: 5px; height: 5px; margin-top: 2px; }
        .footer-logo .logo-sub { font-size: 7.5px; }

        .footer-col-label {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(247, 247, 243, 0.28);
          margin-bottom: 16px;
          font-weight: 600;
        }
        .footer-link-item {
          margin-bottom: 10px;
        }
        .footer-link {
          color: rgba(247, 247, 243, 0.5);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.18s ease;
        }
        .footer-link:hover { color: #F7F7F3; }

        .footer-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 16px;
        }
        .footer-trust-chip {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(30, 205, 146, 0.7);
          border: 1px solid rgba(30, 205, 146, 0.2);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .footer-bottom {
          padding: 24px 0 36px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-disclaimer {
          font-size: 11px;
          line-height: 1.7;
          color: rgba(247, 247, 243, 0.25);
          font-weight: 400;
          max-width: 820px;
        }
        .footer-legal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-legal-link {
          font-size: 12px;
          color: rgba(247, 247, 243, 0.28);
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .footer-legal-link:hover { color: rgba(247, 247, 243, 0.6); }

        /* Desktop */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }
        .footer-brand { max-width: none; }
        .footer-tagline {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(247, 247, 243, 0.38);
          font-weight: 400;
          max-width: 280px;
          margin: 0;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            gap: 20px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(247, 247, 243, 0.06);
          }
          .footer-logo { margin-bottom: 0 !important; }
          .footer-tagline {
            font-size: 13px;
            max-width: none;
            flex: 1;
          }
          .footer-trust-row { display: none; }
        }

        /* Mobile statement layout */
        @media (max-width: 640px) {
          .footer-statement-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 28px !important;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 32px 16px;
          }
          .footer-brand {
            grid-column: 1 / -1;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding-bottom: 32px;
            margin-bottom: 0;
          }
          .footer-logo { margin-bottom: 4px !important; }
          .footer-tagline {
            font-size: 13px;
            line-height: 1.6;
            color: rgba(247, 247, 243, 0.38) !important;
            max-width: 300px;
          }
          .footer-trust-row { display: flex; }
          .footer-col-label {
            font-size: 10px;
            margin-bottom: 14px;
          }
          .footer-link-item {
            margin-bottom: 16px;
          }
          .footer-link {
            font-size: 14px;
          }
          .footer-bottom {
            padding: 28px 0 40px;
            gap: 16px;
          }
          .footer-disclaimer {
            font-size: 11px;
            line-height: 1.75;
          }
          .footer-legal-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
