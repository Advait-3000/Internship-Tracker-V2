import React, { useState } from "react";

const DATA_SETS = {
  Daily: [
    { label: "Complete", value: 45, color: "var(--primary)" },
    { label: "In Progress", value: 30, color: "var(--green)" },
    { label: "LATE", value: 25, color: "var(--purple)" },
  ],
  Weekly: [
    { label: "Complete", value: 52, color: "var(--primary)" },
    { label: "In Progress", value: 28, color: "var(--green)" },
    { label: "LATE", value: 20, color: "var(--purple)" },
  ],
  Monthly: [
    { label: "Complete", value: 60, color: "var(--primary)" },
    { label: "In Progress", value: 25, color: "var(--green)" },
    { label: "LATE", value: 15, color: "var(--purple)" },
  ],
};

const RINGS = [
  { r: 56, strokeW: 16 },
  { r: 38, strokeW: 14 },
  { r: 22, strokeW: 12 },
];

const InternshipDonut = () => {
  const [range, setRange] = useState("Daily");
  const segments = DATA_SETS[range];
  const total = segments.reduce((s, d) => s + d.value, 0);
  const SIZE = 160;
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border-light)] p-5 shadow-[var(--shadow-sm)] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[length:var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)]">
          Internship Status
        </span>
        <div className="flex gap-1 bg-[var(--surface-hover)] rounded-[var(--radius-md)] p-0.5">
          {["Daily", "Weekly", "Monthly"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 text-[length:var(--fs-xs)] font-[var(--fw-medium)] rounded-[var(--radius-sm)] transition-all ${
                range === r
                  ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut rings */}
        <div className="relative flex-shrink-0">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            {/* Track rings */}
            {RINGS.map((ring) => (
              <circle
                key={ring.r}
                cx={CX}
                cy={CY}
                r={ring.r}
                fill="none"
                stroke="var(--border-light)"
                strokeWidth={ring.strokeW}
              />
            ))}
            {/* Data arcs */}
            {segments.map((seg, i) => {
              const pct = seg.value / total;
              const ring = RINGS[i];
              if (!ring) return null;
              const circ = 2 * Math.PI * ring.r;
              const dash = circ * pct;
              const gap = circ;
              return (
                <circle
                  key={seg.label}
                  cx={CX}
                  cy={CY}
                  r={ring.r}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={ring.strokeW}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${CX} ${CY})`}
                  style={{ transition: "stroke-dasharray 0.5s ease" }}
                />
              );
            })}
            {/* Center text */}
            <text x={CX} y={CY - 5} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
              {total}
            </text>
            <text x={CX} y={CY + 12} textAnchor="middle" fontSize="8" fill="var(--text-muted)">
              Total
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {segments.map((seg) => {
            const pct = Math.round((seg.value / total) * 100);
            return (
              <div key={seg.label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-[var(--radius-full)] flex-shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-[length:var(--fs-xs)] text-[var(--text-secondary)]">{seg.label}</span>
                  </div>
                  <span className="text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-primary)]">{seg.value}</span>
                </div>
                <div className="h-1 rounded-[var(--radius-full)] bg-[var(--surface-hover)] overflow-hidden">
                  <div
                    className="h-full rounded-[var(--radius-full)] transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: seg.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InternshipDonut;
