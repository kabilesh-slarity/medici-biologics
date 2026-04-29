"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import {
  Upload,
  FileText,
  ImageIcon,
  X,
  ExternalLink,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import { Topbar } from "@/components/dashboard/Topbar";
import {
  RecordsProvider,
  useRecords,
  formatBytes,
  formatDate,
  type RecordTab,
  type RecordItem,
} from "@/lib/records";
import { cn } from "@/lib/cn";

const TABS: { id: RecordTab; label: string; emptyHint: string }[] = [
  { id: "bloodwork", label: "Bloodwork", emptyHint: "Drop a PDF or photo of your latest panel." },
  { id: "reports", label: "Reports", emptyHint: "Imaging, physician notes, or specialist reports." },
  { id: "documents", label: "Documents", emptyHint: "ID, insurance, intake forms, anything else." },
];

const SAMPLE_RECORDS: RecordItem[] = [
  {
    id: "sample-1",
    tab: "bloodwork",
    name: "CBC Panel · January 2026.pdf",
    fileType: "application/pdf",
    size: 284600,
    dataUrl: "",
    createdAt: "2026-01-15T10:30:00.000Z",
  },
  {
    id: "sample-2",
    tab: "bloodwork",
    name: "Hormone Panel · December 2025.pdf",
    fileType: "application/pdf",
    size: 198400,
    dataUrl: "",
    createdAt: "2025-12-10T14:15:00.000Z",
  },
  {
    id: "sample-3",
    tab: "bloodwork",
    name: "Metabolic Panel · November 2025.pdf",
    fileType: "application/pdf",
    size: 154200,
    dataUrl: "",
    createdAt: "2025-11-22T09:00:00.000Z",
  },
  {
    id: "sample-4",
    tab: "reports",
    name: "Dr. Gabi Protocol Report · Jan 2026.pdf",
    fileType: "application/pdf",
    size: 92800,
    dataUrl: "",
    createdAt: "2026-01-16T08:00:00.000Z",
  },
  {
    id: "sample-5",
    tab: "documents",
    name: "Intake Questionnaire.pdf",
    fileType: "application/pdf",
    size: 48000,
    dataUrl: "",
    createdAt: "2026-01-10T12:00:00.000Z",
  },
];

export default function RecordsPage() {
  return (
    <RecordsProvider>
      <RecordsInner />
    </RecordsProvider>
  );
}

function RecordsInner() {
  const [tab, setTab] = useState<RecordTab>("bloodwork");
  const [view, setView] = useState<"grid" | "timeline">("grid");
  const { records, add, remove } = useRecords();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const filtered = records.filter((r) => r.tab === tab);
  const displayRecords = filtered.length > 0 ? filtered : SAMPLE_RECORDS.filter((r) => r.tab === tab);

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) add(tab, file);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) add(tab, file);
  };

  const tabMeta = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <Topbar title="Medical Records" />
      <div className="px-6 sm:px-8 py-8 max-w-5xl mx-auto">
        {/* Tabs + view toggle */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex p-1 bg-[var(--surface-elev)] rounded-full border border-[var(--border)]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={cn(
                  "h-9 px-4 rounded-full text-[13px] font-medium transition-colors",
                  tab === t.id ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]" : "text-ink-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="inline-flex p-0.5 bg-[var(--surface-elev)] rounded-full border border-[var(--border)]">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={cn(
                "h-8 w-8 inline-flex items-center justify-center rounded-full",
                view === "grid" ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]" : "text-ink-muted",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Timeline view"
              onClick={() => setView("timeline")}
              className={cn(
                "h-8 w-8 inline-flex items-center justify-center rounded-full",
                view === "timeline" ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]" : "text-ink-muted",
              )}
            >
              <ListIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Upload zone */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          className={cn(
            "mt-6 relative rounded-[24px] border-2 border-dashed transition-all px-6 py-10 text-center",
            drag ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] bg-[var(--surface-elev)]",
          )}
        >
          <input ref={inputRef} type="file" onChange={onPick} className="sr-only" aria-label={`Upload ${tabMeta.label}`} />
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]">
            <Upload className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 text-[16px] font-semibold text-ink">Upload to {tabMeta.label}</h3>
          <p className="mt-1 text-[13px] text-ink-muted">
            Drag-and-drop or
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mx-1 text-ink underline-offset-4 hover:underline"
            >
              browse files
            </button>
            · PDF, PNG, JPG up to 4 MB
          </p>
        </div>

        {/* List */}
        {displayRecords.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-[14px] text-ink-muted">{tabMeta.emptyHint}</p>
          </div>
        ) : view === "grid" ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayRecords.map((r) => (
              <RecordCard key={r.id} record={r} onRemove={() => remove(r.id)} isSample={r.id.startsWith("sample-")} />
            ))}
          </div>
        ) : (
          <div className="mt-8 relative">
            <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]" />
            <ul className="space-y-5">
              {displayRecords.map((r) => (
                <li key={r.id} className="relative pl-12">
                  <span className="absolute left-0 top-2 grid place-items-center h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[10px] tabular text-ink-soft">
                    {new Date(r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }).split(" ").join(" ")}
                  </span>
                  <RecordCard record={r} onRemove={() => remove(r.id)} dense isSample={r.id.startsWith("sample-")} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

function RecordCard({
  record,
  onRemove,
  dense,
  isSample,
}: {
  record: RecordItem;
  onRemove: () => void;
  dense?: boolean;
  isSample?: boolean;
}) {
  const isImage = record.fileType.startsWith("image/") && record.dataUrl;
  return (
    <article className={cn("group relative rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden", dense ? "p-4" : "")}>
      {!dense && (
        <div className="aspect-[4/3] bg-[var(--surface-elev)] overflow-hidden border-b border-[var(--border)]">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={record.dataUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <FileText className="h-10 w-10 text-ink-soft" strokeWidth={1.25} />
            </div>
          )}
        </div>
      )}
      <div className={cn("flex items-start gap-3", dense ? "" : "p-4")}>
        {dense && (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-elev)] text-[var(--primary)] shrink-0">
            {isImage ? <ImageIcon className="h-4 w-4" strokeWidth={1.5} /> : <FileText className="h-4 w-4" strokeWidth={1.5} />}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-medium text-ink truncate">{record.name}</div>
          <div className="text-[11px] text-ink-soft mt-0.5">
            {formatDate(record.createdAt)} · {formatBytes(record.size)}
          </div>
        </div>
        {!isSample && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {record.dataUrl && (
              <a
                href={record.dataUrl}
                target="_blank"
                rel="noopener"
                aria-label="Open"
                className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-[var(--surface-elev)] text-ink-muted"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}
            <button
              type="button"
              onClick={onRemove}
              aria-label="Delete"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-[var(--surface-elev)] text-ink-muted hover:text-[var(--danger)]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
