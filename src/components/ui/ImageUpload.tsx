"use client";

import { useEffect, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { ImagePlus, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  storageKey: string;
  className?: string;
  rounded?: "lg" | "xl" | "2xl" | "3xl" | "full";
  aspect?: string;
  fallback?: React.ReactNode;
  label?: string;
  hint?: string;
  cover?: boolean;
};

const ROUND: Record<NonNullable<Props["rounded"]>, string> = {
  lg: "rounded-xl",
  xl: "rounded-2xl",
  "2xl": "rounded-[20px]",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const STORE_PREFIX = "medici.image.";

export function ImageUpload({
  storageKey,
  className,
  rounded = "2xl",
  aspect = "aspect-[4/3]",
  fallback,
  label = "Upload image",
  hint = "PNG or JPG, drag-and-drop or click",
  cover = true,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHydrated(true);
    try {
      const stored = localStorage.getItem(STORE_PREFIX + storageKey);
      if (stored) setSrc(stored);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const persist = (dataUrl: string | null) => {
    setSrc(dataUrl);
    try {
      if (dataUrl) localStorage.setItem(STORE_PREFIX + storageKey, dataUrl);
      else localStorage.removeItem(STORE_PREFIX + storageKey);
    } catch {
      /* ignore quota/private mode */
    }
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") persist(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(true);
  };

  const trigger = () => inputRef.current?.click();
  const clear = () => persist(null);

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[var(--surface-elev)] border border-[var(--border)]",
        ROUND[rounded],
        aspect,
        hover && "ring-2 ring-[var(--primary-soft)]",
        className,
      )}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={() => setHover(false)}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="sr-only"
        aria-label={label}
      />

      {hydrated && src ? (
        <>
          <img
            src={src}
            alt=""
            className={cn("absolute inset-0 h-full w-full", cover ? "object-cover" : "object-contain")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/30 group-hover:via-transparent group-hover:to-transparent transition-colors" />
          <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={trigger}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/95 text-ink shadow-card backdrop-blur"
              aria-label="Replace image"
            >
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={clear}
              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/95 text-ink shadow-card backdrop-blur"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={trigger}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6 transition-colors hover:bg-[color-mix(in_oklch,var(--primary)_4%,var(--surface-elev))]"
        >
          {fallback ?? (
            <>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--primary)]">
                <ImagePlus className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
              <span className="text-[13px] font-medium text-ink">{label}</span>
              <span className="text-[11px] text-ink-muted max-w-[20ch]">{hint}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
