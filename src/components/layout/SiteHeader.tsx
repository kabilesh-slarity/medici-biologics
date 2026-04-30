"use client";

import { useEffect, useState } from "react";
import { Settings2, Menu, X } from "lucide-react";
import { SettingsDrawer } from "@/components/settings/SettingsDrawer";
import { Logo } from "@/components/layout/Logo";

const NAV_LINKS = [
  { href: "#protocol", label: "Protocol" },
  { href: "#science", label: "Science" },
  { href: "#pricing", label: "Pricing" },
  { href: "#qualify", label: "Qualify" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const close = () => setMobileMenuOpen(false);
      window.addEventListener("scroll", close, { once: true, passive: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(10,10,10,0.96)" : "#0A0A0A",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(247, 247, 243, 0.07)",
          transition: "background 0.3s ease",
        }}
      >
        <div
          className="header-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            gap: 24,
          }}
        >
          {/* Logo — left */}
          <a
            href="#"
            aria-label="Medici Peptides home"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", flexShrink: 0 }}
          >
            <Logo className="header-logo" width={80} height={40} />
          </a>

          {/* Desktop nav — centered */}
          <nav
            aria-label="Primary"
            className="header-nav"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: 40,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{
                  fontSize: 13,
                  letterSpacing: "0.01em",
                  color: "rgba(247, 247, 243, 0.65)",
                  textDecoration: "none",
                  transition: "color 0.18s ease",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F7F7F3")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.65)")
                }
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Settings gear */}
            <button
              aria-label="Open customization settings"
              onClick={() => setSettingsOpen(true)}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                color: "rgba(247, 247, 243, 0.45)",
                cursor: "pointer",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "#F7F7F3";
                el.style.background = "rgba(247, 247, 243, 0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "rgba(247, 247, 243, 0.45)";
                el.style.background = "transparent";
              }}
            >
              <Settings2 style={{ width: 16, height: 16 }} strokeWidth={1.5} />
            </button>

            {/* Desktop CTA */}
            <a
              href="#qualify"
              className="header-cta"
              style={{
                padding: "9px 20px",
                background: "#1ECD92",
                color: "#0A0A0A",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                borderRadius: 999,
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2BE5A6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1ECD92")}
            >
              Begin Intake
            </a>

            {/* Mobile hamburger */}
            <button
              className="header-hamburger"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((o) => !o)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                color: "rgba(247, 247, 243, 0.72)",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(247, 247, 243, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {mobileMenuOpen ? (
                <X style={{ width: 18, height: 18 }} strokeWidth={1.5} />
              ) : (
                <Menu style={{ width: 18, height: 18 }} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: "1px solid rgba(247, 247, 243, 0.07)",
              background: "#0A0A0A",
            }}
          >
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "17px 24px",
                  color: "rgba(247, 247, 243, 0.72)",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  borderBottom: "1px solid rgba(247, 247, 243, 0.05)",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F7F7F3")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(247, 247, 243, 0.72)")
                }
              >
                {n.label}
              </a>
            ))}
            <div style={{ padding: "16px 24px 20px" }}>
              <a
                href="#qualify"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "15px",
                  textAlign: "center",
                  background: "#1ECD92",
                  color: "#0A0A0A",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Begin Intake
              </a>
            </div>
          </nav>
        )}
      </header>

      <style>{`
        .header-inner {
          padding: 0 20px;
        }
        .header-nav {
          display: none;
        }
        .header-cta {
          display: none !important;
        }
        .header-hamburger {
          display: flex;
        }
        @media (min-width: 768px) {
          .header-inner {
            padding: 0 48px;
          }
          .header-nav {
            display: flex;
          }
          .header-cta {
            display: inline-flex !important;
          }
          .header-hamburger {
            display: none !important;
          }
        }
      `}</style>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
