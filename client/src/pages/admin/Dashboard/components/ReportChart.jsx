import React, { useState } from "react";

// Mock data sets per time range
const DATA_SETS = {
  Daily: [
    { label: "Mon", reportA: 40, reportB: 28, reportC: 15 },
    { label: "Tue", reportA: 65, reportB: 45, reportC: 30 },
    { label: "Wed", reportA: 55, reportB: 60, reportC: 25 },
    { label: "Thu", reportA: 78, reportB: 38, reportC: 42 },
    { label: "Fri", reportA: 90, reportB: 70, reportC: 55 },
    { label: "Sat", reportA: 45, reportB: 52, reportC: 20 },
    { label: "Sun", reportA: 30, reportB: 35, reportC: 10 },
  ],
  Weekly: [
    { label: "W1", reportA: 120, reportB: 90, reportC: 60 },
    { label: "W2", reportA: 180, reportB: 130, reportC: 85 },
    { label: "W3", reportA: 150, reportB: 160, reportC: 70 },
    { label: "W4", reportA: 210, reportB: 145, reportC: 110 },
  ],
  Monthly: [
    { label: "Jan", reportA: 400, reportB: 280, reportC: 190 },
    { label: "Feb", reportA: 520, reportB: 390, reportC: 240 },
    { label: "Mar", reportA: 480, reportB: 430, reportC: 210 },
    { label: "Apr", reportA: 610, reportB: 360, reportC: 320 },
    { label: "May", reportA: 550, reportB: 490, reportC: 280 },
    { label: "Jun", reportA: 720, reportB: 540, reportC: 370 },
  ],
};

const SERIES = [
  { key: "reportA", color: "var(--primary)", label: "Reports" },
  { key: "reportB", color: "var(--purple)", label: "Submitted" },
  { key: "reportC", color: "var(--green)", label: "LATE" },
];

const ReportChart = () => {
  const [range, setRange] = useState("Daily");
  const data = DATA_SETS[range];
  const W = 500;
  const H = 160;
  const PAD = { top: 12, bottom: 28, left: 8, right: 8 };

  const allVals = data.flatMap((d) => SERIES.map((s) => d[s.key]));
  const maxVal = Math.max(...allVals);
  const minVal = 0;

  const xStep = (W - PAD.left - PAD.right) / (data.length - 1);
  const yRange = maxVal - minVal || 1;

  const toY = (val) =>
    PAD.top + (H - PAD.top - PAD.bottom) * (1 - (val - minVal) / yRange);
  const toX = (i) => PAD.left + i * xStep;

  const buildPath = (key) =>
    data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(d[key]).toFixed(1)}`).join(" ");

  const buildArea = (key) => {
    const points = data.map((d, i) => `${toX(i).toFixed(1)},${toY(d[key]).toFixed(1)}`).join(" L ");
    const lastX = toX(data.length - 1);
    const baseY = toY(0);
    return `M ${toX(0)},${toY(data[0][key])} L ${points} L ${lastX},${baseY} L ${toX(0)},${baseY} Z`;
  };

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border-light)] p-5 shadow-[var(--shadow-sm)] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[length:var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)]">
          Report Submission
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

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            {SERIES.map((s, idx) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75, 1].map((pct) => {
            const y = PAD.top + (H - PAD.top - PAD.bottom) * (1 - pct);
            return (
              <line
                key={pct}
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y}
                y2={y}
                stroke="var(--border-light)"
                strokeWidth="1"
              />
            );
          })}

          {/* Y value labels */}
          {[0.25, 0.5, 0.75, 1].map((pct) => {
            const y = PAD.top + (H - PAD.top - PAD.bottom) * (1 - pct);
            const val = Math.round(minVal + yRange * pct);
            return (
              <text
                key={pct}
                x={W - PAD.right + 4}
                y={y + 3}
                fontSize="8"
                fill="var(--text-muted)"
                textAnchor="start"
              >
                {val}
              </text>
            );
          })}

          {/* Area fills */}
          {SERIES.map((s) => (
            <path key={`area-${s.key}`} d={buildArea(s.key)} fill={`url(#grad-${s.key})`} />
          ))}

          {/* Lines */}
          {SERIES.map((s) => (
            <path
              key={`line-${s.key}`}
              d={buildPath(s.key)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots on last point */}
          {SERIES.map((s) => {
            const last = data[data.length - 1];
            return (
              <circle
                key={`dot-${s.key}`}
                cx={toX(data.length - 1)}
                cy={toY(last[s.key])}
                r="3.5"
                fill="var(--surface)"
                stroke={s.color}
                strokeWidth="2"
              />
            );
          })}

          {/* X axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={toX(i)}
              y={H - 6}
              fontSize="8"
              fill="var(--text-muted)"
              textAnchor="middle"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-[var(--radius-full)] inline-block" style={{ backgroundColor: s.color }} />
            <span className="text-[length:var(--fs-xs)] text-[var(--text-secondary)]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportChart;
