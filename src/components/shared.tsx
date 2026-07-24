import { Activity, CircleDashed, Wrench } from "lucide-react";
import type { ToolStatus } from "../lib/data";

// ─── Design tokens ────────────────────────────────────────────────────────────

export const HF = "Inter, 'SF Pro Display', -apple-system, sans-serif";
export const MF = "'JetBrains Mono', monospace";

export const T = {
  // text
  white:       "#ffffff",
  text:        "rgba(238,236,248,0.90)",
  sub:         "rgba(238,236,248,0.65)",
  muted:       "rgba(238,236,248,0.44)",
  faint:       "rgba(238,236,248,0.28)",
  // violet palette — used for accents, labels, glows
  violet:      "#7c5cfc",
  accentHi:    "#c4b5fd",
  accent:      "#a78bfa",
  accentDim:   "rgba(167,139,250,0.70)",
  fieldLabel:  "rgba(167,139,250,0.85)",   // 问题/方法/价值 — clear violet, readable at 12px Inter
  // surfaces / borders
  border:      "rgba(255,255,255,0.07)",
  borderSub:   "rgba(255,255,255,0.045)",
  cardBg:      "rgba(255,255,255,0.025)",
  cardBgHover: "rgba(255,255,255,0.040)",
  // icon container — purple tinted
  iconBg:      "rgba(124,92,252,0.10)",
  iconBorder:  "rgba(124,92,252,0.20)",
  // typography scale
  hero:    "clamp(2.2rem, 6vw, 3.6rem)",
  section: "clamp(1.25rem, 2.5vw, 1.75rem)",
  card:    "0.9375rem",    // 15px
  body:    "0.875rem",     // 14px
  small:   "0.8125rem",    // 13px
  label:   "12px",
  micro:   "11px",
  nano:    "10px",
  // weights
  bold:   600,
  medium: 500,
  normal: 400,
  // line-heights
  tight:  1.12,
  snug:   1.4,
  base:   1.6,
  relax:  1.72,
  loose:  1.82,
};

// ─── StatusPill ───────────────────────────────────────────────────────────────

export function StatusPill({ status }: { status: ToolStatus }) {
  const map: Record<ToolStatus, { cls: string; icon: React.ReactNode }> = {
    "在用":   { cls: "text-sky-400 bg-sky-500/10 border-sky-500/22",             icon: <Activity className="w-2.5 h-2.5" /> },
    "迭代中": { cls: "text-amber-400 bg-amber-500/10 border-amber-500/22",       icon: <CircleDashed className="w-2.5 h-2.5" /> },
    "待验证": { cls: "text-zinc-400 bg-zinc-500/10 border-zinc-500/22",          icon: <Wrench className="w-2.5 h-2.5" /> },
  };
  const { cls, icon } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 font-medium px-2 py-0.5 rounded-full border ${cls}`}
      style={{ fontSize: T.nano }}
    >
      {icon}{status}
    </span>
  );
}

// ─── StagePill ────────────────────────────────────────────────────────────────

export function StagePill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded border"
      style={{
        fontSize: T.nano,
        fontFamily: HF,
        color: "rgba(167,139,250,0.75)",
        borderColor: "rgba(124,92,252,0.22)",
        background: "rgba(124,92,252,0.07)",
      }}
    >
      {label}
    </span>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h2
        className="text-white mb-3"
        style={{
          fontFamily: HF,
          fontWeight: T.bold,
          fontSize: T.section,
          lineHeight: T.tight,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax, whiteSpace: "nowrap" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px" style={{ background: T.borderSub }} />
    </div>
  );
}

// ─── ScreenshotPlaceholder ───────────────────────────────────────────────────

export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full rounded-xl border flex items-center justify-center"
      style={{
        background: "rgba(255,255,255,0.016)",
        borderColor: T.border,
        minHeight: 200,
        borderStyle: "dashed",
      }}
    >
      <div className="text-center px-6 py-10">
        <div
          className="w-9 h-9 rounded-xl border mx-auto mb-3 flex items-center justify-center"
          style={{ borderColor: T.iconBorder, background: T.iconBg }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(124,92,252,0.45)" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
        </div>
        <p style={{ fontSize: T.small, color: T.muted }}>{label}</p>
        <p className="mt-1" style={{ fontSize: T.micro, color: T.faint }}>截图后续补充</p>
      </div>
    </div>
  );
}
