"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function StepShell({
  eyebrow,
  title,
  subtitle,
  back,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  back?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {back && (
        <Link
          href={back}
          className="inline-flex items-center gap-1.5 mb-8 text-[13px] text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back
        </Link>
      )}

      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h1 className="mt-3 text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.022em] font-semibold text-ink">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-[15px] leading-[1.55] text-ink-muted">{subtitle}</p>
      )}

      <div className="mt-9">{children}</div>
    </div>
  );
}
