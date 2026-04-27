"use client";

import { cn } from "@/lib/cn";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,box-shadow] duration-200 ease-out hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--ink)] text-[var(--bg)] hover:bg-[var(--primary)] shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_20px_-8px_rgba(10,14,13,0.25)]",
  secondary:
    "bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:border-[var(--ink)]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-elev)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & CommonProps>(
  function Button({ variant = "primary", size = "md", className, ...rest }, ref) {
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
  },
);

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}
