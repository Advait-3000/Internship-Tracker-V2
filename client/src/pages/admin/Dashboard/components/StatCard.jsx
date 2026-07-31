import React from "react";

const StatCard = ({
  label,
  value,
  sub,
  subColor = "green",
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  const subColorMap = {
    green: "text-[var(--green)]",
    red: "text-[var(--red)]",
    yellow: "text-[var(--yellow)]",
    blue: "text-[var(--primary)]",
    gray: "text-[var(--text-muted)]",
  };

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border-light)] p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow flex flex-col gap-3 min-w-0">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[length:var(--fs-2xl)] font-[var(--fw-bold)] text-[var(--text-primary)] leading-tight">
            {value}
          </div>
          <div className="text-[length:var(--fs-xs)] text-[var(--text-secondary)] font-[var(--fw-medium)] mt-0.5">
            {label}
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg || "var(--primary-light)" }}
        >
          {Icon && (
            <Icon
              className="w-5 h-5"
              style={{ color: iconColor || "var(--primary)" }}
            />
          )}
        </div>
      </div>
      {sub && (
        <div
          className={`text-[length:var(--fs-xs)] font-[var(--fw-medium)] flex items-center gap-1 ${
            subColorMap[subColor] || "text-[var(--text-muted)]"
          }`}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

export default StatCard;
