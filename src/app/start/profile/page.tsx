"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepShell } from "@/components/onboarding/StepShell";
import { Field } from "@/components/onboarding/Field";
import { Button } from "@/components/ui/Button";
import { useOnboarding } from "@/lib/onboarding";

type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { state, updateProfile, hydrated } = useOnboarding();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.phone || !state.otp) {
      router.replace("/start");
      return;
    }
    setFirstName(state.profile.firstName);
    setLastName(state.profile.lastName);
    setEmail(state.profile.email);
    setMonth(state.profile.dob.month);
    setDay(state.profile.dob.day);
    setYear(state.profile.dob.year);
  }, [hydrated, state, router]);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = "Required";
    if (!lastName.trim()) next.lastName = "Required";
    if (!email.includes("@") || !email.includes(".")) next.email = "Enter a valid email";
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);
    if (!m || m < 1 || m > 12 || !d || d < 1 || d > 31 || !y || y < 1900 || y > 2010) {
      next.dob = "Enter a valid date";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    updateProfile({ firstName, lastName, email, dob: { month, day, year } });
    router.push("/start/consents");
  };

  return (
    <OnboardingShell step={3}>
      <StepShell
        eyebrow="Step 3 of 5"
        title="Tell us about yourself."
        subtitle="A few quick details so Dr. Gabi can address you correctly."
        back="/start/verify"
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="First name"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.firstName}
            />
            <Field
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
            />
          </div>

          <Field
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          {/* DOB segmented */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2">Date of birth</div>
            <div className="grid grid-cols-[72px_72px_104px] gap-2">
              <SegmentInput ref={monthRef} placeholder="MM" max={2} value={month} onChange={setMonth}
                onComplete={() => dayRef.current?.focus()} aria-label="Birth month" />
              <SegmentInput ref={dayRef} placeholder="DD" max={2} value={day} onChange={setDay}
                onComplete={() => yearRef.current?.focus()} aria-label="Birth day" />
              <SegmentInput ref={yearRef} placeholder="YYYY" max={4} value={year} onChange={setYear} aria-label="Birth year" />
            </div>
            {errors.dob && (
              <p role="alert" aria-live="polite" className="mt-2 text-[12px] text-[var(--danger)]">
                {errors.dob}
              </p>
            )}
          </div>

          <Button type="submit" size="lg" variant="primary" className="w-full h-14 text-[15px] mt-3">
            Continue
          </Button>
        </form>
      </StepShell>
    </OnboardingShell>
  );
}

const SegmentInput = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (v: string) => void;
  onComplete?: () => void;
  max: number;
  placeholder: string;
  "aria-label"?: string;
}>(function SegmentInput({ value, onChange, onComplete, max, placeholder, ...rest }, ref) {
  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={max}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, max);
        onChange(v);
        if (v.length === max && onComplete) onComplete();
      }}
      className="h-14 px-3 text-center text-[16px] tabular text-ink bg-[var(--surface)] border border-[var(--border)] rounded-2xl focus:border-[var(--ink)] focus:outline-none transition-colors"
      {...rest}
    />
  );
});
