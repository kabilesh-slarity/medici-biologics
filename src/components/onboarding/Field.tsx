"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  label: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const Field = forwardRef<HTMLInputElement, Props>(function Field(
  { label, error, hint, prefix, suffix, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name ?? label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2"
      >
        {label}
      </label>
      <div
        className={cn(
          "relative flex items-center gap-2 px-4 h-14 rounded-2xl bg-[var(--surface)] border transition-colors",
          error ? "border-[var(--danger)]" : "border-[var(--border)] focus-within:border-[var(--ink)]",
        )}
      >
        {prefix && <span className="text-[14px] text-ink-muted shrink-0">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-ink-soft",
            className,
          )}
          {...rest}
        />
        {suffix && <span className="text-[12px] text-ink-soft shrink-0">{suffix}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-err`} role="alert" aria-live="polite" className="mt-2 text-[12px] text-[var(--danger)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-2 text-[12px] text-ink-soft">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
