"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createElement } from "react";

export type RecordTab = "bloodwork" | "reports" | "documents";

export type RecordItem = {
  id: string;
  tab: RecordTab;
  name: string;
  fileType: string; // mime
  size: number;
  dataUrl: string;
  createdAt: string;
};

const STORAGE_KEY = "medici.records";

type Ctx = {
  records: RecordItem[];
  hydrated: boolean;
  add: (tab: RecordTab, file: File) => Promise<void>;
  remove: (id: string) => void;
};

const RecordsCtx = createContext<Ctx | null>(null);

export function RecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecords(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      /* ignore quota errors silently */
    }
  }, [records, hydrated]);

  const add = async (tab: RecordTab, file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(file);
    });
    setRecords((rs) => [
      {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        tab,
        name: file.name,
        fileType: file.type || "application/octet-stream",
        size: file.size,
        dataUrl,
        createdAt: new Date().toISOString(),
      },
      ...rs,
    ]);
  };

  const remove = (id: string) => setRecords((rs) => rs.filter((r) => r.id !== id));

  return createElement(RecordsCtx.Provider, { value: { records, hydrated, add, remove } }, children);
}

export function useRecords(): Ctx {
  const ctx = useContext(RecordsCtx);
  if (!ctx) throw new Error("useRecords must be used within RecordsProvider");
  return ctx;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
