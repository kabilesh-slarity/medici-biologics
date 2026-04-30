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
    <footer style={{ background: "#000000", color: "rgba(247, 247, 243, 0.6)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(44px, 7vw, 80px) clamp(20px, 4vw, 48px) 0",
          boxSizing: "border-box",
        }}
      >
        {/* Top grid: brand + link columns */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Logo className="footer-logo" width={72} height={36} style={{ marginBottom: 12 }} />
            <p className="footer-tagline">
              Building the world&rsquo;s healthiest community. The AI-first peptide platform from
              the team behind Medici.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <h4 className="footer-col-label">{col.label}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label} style={{ marginBottom: 10 }}>
                    <a
                      href={l.href}
                      className="footer-link"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(247, 247, 243, 0.07)",
            margin: "clamp(28px, 4vw, 48px) 0 0",
          }}
        />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-disclaimer">{DISCLAIMER}</p>
          <div className="footer-legal-row">
            <span style={{ fontSize: 12, color: "rgba(247, 247, 243, 0.3)" }}>
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
        /* Shared */
        .footer-logo .logo-wordmark { font-size: 18px; }
        .footer-logo .logo-dot { width: 5px; height: 5px; margin-top: 2px; }
        .footer-logo .logo-sub { font-size: 7.5px; }

        .footer-col-label {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(247, 247, 243, 0.32);
          margin-bottom: 14px;
          font-weight: 600;
        }
        .footer-link {
          color: rgba(247, 247, 243, 0.55);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.18s ease;
        }
        .footer-link:hover { color: #F7F7F3; }

        .footer-bottom {
          padding: 24px 0 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-disclaimer {
          font-size: 11px;
          line-height: 1.7;
          color: rgba(247, 247, 243, 0.28);
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
          color: rgba(247, 247, 243, 0.3);
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .footer-legal-link:hover { color: rgba(247, 247, 243, 0.65); }

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
          color: rgba(247, 247, 243, 0.42);
          font-weight: 400;
          max-width: 280px;
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
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(247, 247, 243, 0.06);
          }
          .footer-logo { margin-bottom: 0 !important; }
          .footer-tagline {
            font-size: 13px;
            max-width: none;
            flex: 1;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0 12px;
          }
          /* Brand spans full width, compact row */
          .footer-brand {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: flex-start;
            gap: 12px;
            padding-bottom: 20px;
            margin-bottom: 4px;
            flex-wrap: nowrap;
          }
          .footer-logo { margin-bottom: 0 !important; }
          .footer-tagline {
            font-size: 12px;
            line-height: 1.55;
            color: rgba(247, 247, 243, 0.35) !important;
          }
          /* Link columns: all three side-by-side, smaller text */
          .footer-col-label {
            font-size: 9px;
            margin-bottom: 10px;
          }
          .footer-link {
            font-size: 12.5px;
          }
          /* Tighter bottom */
          .footer-bottom {
            padding: 20px 0 24px;
            gap: 12px;
          }
          .footer-disclaimer {
            font-size: 10.5px;
            line-height: 1.65;
          }
          .footer-legal-row {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </footer>
  );
}
