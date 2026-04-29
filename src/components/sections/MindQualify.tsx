"use client";

import { useState, type FormEvent } from "react";

const GOALS = [
  { value: "focus", label: "Sharper focus and mental stamina for work" },
  { value: "memory", label: "Improved memory and recall" },
  { value: "stress", label: "Stress resilience and reduced mental fatigue" },
  { value: "protection", label: "Long-term cognitive protection" },
];

const LIFESTYLE = [
  { value: "yes", label: "Yes, most days" },
  { value: "somewhat", label: "Somewhat" },
  { value: "working", label: "Working on it" },
];

const COMMITMENT = [
  { value: "yes", label: "Yes, I'm ready" },
  { value: "guidance", label: "I'd like more guidance" },
];

export function MindQualify() {
  const [submitted, setSubmitted] = useState(false);
  const [goal, setGoal] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [medical, setMedical] = useState("");
  const [commitment, setCommitment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("qualify-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <section id="qualify" style={{ background: "#0A0A0A", color: "#F7F7F3" }}>
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
          className="mind-qualify-grid"
        >
          {/* Left: header */}
          <div style={{ position: "sticky", top: 100 }}>
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
              No. 05
            </span>
            <h2
              style={{
                fontSize: "clamp(36px, 4.8vw, 62px)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "#F7F7F3",
                marginBottom: 24,
              }}
            >
              A brief clinical
              <br />
              <em style={{ fontStyle: "italic", color: "#1ECD92" }}>intake.</em>
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(247, 247, 243, 0.58)",
                fontWeight: 400,
                marginBottom: 32,
              }}
            >
              Four questions, reviewed by our medical team. We&rsquo;ll respond within 24 hours with
              approval and personalized guidance before any order is processed.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                "No payment until approved",
                "24-hour clinical review",
                "Personalized guidance included",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13,
                    color: "rgba(247, 247, 243, 0.55)",
                    fontWeight: 400,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      background: "#1ECD92",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <Question
                  num="i."
                  label="What is your primary cognitive goal?"
                  help="Select the outcome that best reflects your motivation."
                >
                  <RadioGroup
                    name="goal"
                    options={GOALS}
                    value={goal}
                    onChange={setGoal}
                  />
                </Question>

                <Question
                  num="ii."
                  label="Current lifestyle factors"
                  help="Do you consistently maintain 7+ hours of sleep, regular exercise, and a nutrient-dense diet?"
                >
                  <RadioGroup
                    name="lifestyle"
                    options={LIFESTYLE}
                    value={lifestyle}
                    onChange={setLifestyle}
                  />
                </Question>

                <Question
                  num="iii."
                  label="Medical history screening"
                  help="Have you been diagnosed with any neurological conditions, or are you currently taking prescription medications for mood, attention, or blood pressure?"
                >
                  <textarea
                    value={medical}
                    onChange={(e) => setMedical(e.target.value)}
                    placeholder="Please describe any relevant conditions or medications. If none, leave blank."
                    style={{
                      width: "100%",
                      background: "rgba(247, 247, 243, 0.04)",
                      border: "1px solid rgba(247, 247, 243, 0.1)",
                      borderRadius: 12,
                      padding: "16px 18px",
                      fontFamily: "inherit",
                      color: "#F7F7F3",
                      fontSize: 15,
                      lineHeight: 1.55,
                      resize: "vertical",
                      minHeight: 96,
                      fontWeight: 400,
                      transition: "border-color 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(30, 205, 146, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(247, 247, 243, 0.1)")}
                  />
                </Question>

                <Question
                  num="iv."
                  label="Commitment level"
                  help="Are you prepared to follow basic lifestyle recommendations while using Medici Mind?"
                  noBorder
                >
                  <RadioGroup
                    name="commitment"
                    options={COMMITMENT}
                    value={commitment}
                    onChange={setCommitment}
                  />
                </Question>

                {/* Submit */}
                <div
                  style={{
                    marginTop: 32,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      background: "#1ECD92",
                      color: "#0A0A0A",
                      padding: "16px 36px",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      border: "none",
                      borderRadius: 999,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "#2BE5A6";
                      el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "#1ECD92";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    Submit for Review
                  </button>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(247, 247, 243, 0.42)",
                      maxWidth: 280,
                      lineHeight: 1.55,
                      fontWeight: 400,
                      paddingTop: 4,
                    }}
                  >
                    Reviewed by our licensed medical team within 24 hours. No payment processed until approval.
                  </p>
                </div>
              </form>
            ) : (
              <div
                id="qualify-success"
                style={{
                  padding: "56px 48px",
                  background: "rgba(30, 205, 146, 0.05)",
                  border: "1px solid rgba(30, 205, 146, 0.25)",
                  borderRadius: 20,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(30, 205, 146, 0.12)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10.5l4.5 4.5 7.5-9" stroke="#1ECD92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 600,
                    color: "#F7F7F3",
                    marginBottom: 14,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Thank you.
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "rgba(247, 247, 243, 0.72)",
                    fontWeight: 400,
                    maxWidth: 480,
                    margin: "0 auto",
                  }}
                >
                  Your responses have been sent to our clinical team. You will receive approval and
                  personalized guidance within 24 hours before your order is processed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mind-qualify-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Question({
  num,
  label,
  help,
  children,
  noBorder,
}: {
  num: string;
  label: string;
  help: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        marginBottom: noBorder ? 0 : 52,
        paddingBottom: noBorder ? 0 : 52,
        borderBottom: noBorder ? "none" : "1px solid rgba(247, 247, 243, 0.07)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "#1ECD92",
          display: "block",
          marginBottom: 10,
          fontStyle: "italic",
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
      >
        Question {num}
      </span>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "#F7F7F3",
          marginBottom: 8,
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
        }}
      >
        {label}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "rgba(247, 247, 243, 0.5)",
          marginBottom: 24,
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {help}
      </p>
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((o) => (
        <label
          key={o.value}
          className="mind-option"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            background: value === o.value ? "rgba(30, 205, 146, 0.07)" : "rgba(247, 247, 243, 0.03)",
            border: value === o.value ? "1px solid rgba(30, 205, 146, 0.4)" : "1px solid rgba(247, 247, 243, 0.08)",
            borderRadius: 10,
            fontSize: 15,
            color: value === o.value ? "#F7F7F3" : "rgba(247, 247, 243, 0.75)",
            fontWeight: 400,
            gap: 14,
            transition: "background 0.15s ease, border-color 0.15s ease",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            style={{ display: "none" }}
          />
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: value === o.value ? "1.5px solid #1ECD92" : "1.5px solid rgba(247, 247, 243, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.15s ease",
            }}
          >
            {value === o.value && (
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#1ECD92",
                }}
              />
            )}
          </span>
          {o.label}
        </label>
      ))}
    </div>
  );
}
