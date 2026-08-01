import React, { useState, useEffect } from "react";

const SystemStatus = ({ sessionCount = 25 }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const mins = String(date.getMinutes()).padStart(2, "0");
    const secs = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "P.M." : "A.M.";
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, "0")}:${mins}:${secs} ${ampm}`;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border-light)] p-5 shadow-[var(--shadow-sm)] flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-[var(--radius-full)] bg-[var(--green)] animate-pulse"></div>
        <span className="text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--text-muted)] uppercase tracking-wide">
          System Status
        </span>
      </div>
      <div>
        <div className="text-[length:var(--fs-base)] font-[var(--fw-bold)] text-[var(--text-primary)]">
          Active
        </div>
        <div className="text-[length:var(--fs-xl)] font-mono font-[var(--fw-semibold)] text-[var(--text-primary)] mt-1 tabular-nums">
          {formatTime(now)}
        </div>
        <div className="text-[length:var(--fs-xs)] text-[var(--text-muted)] mt-0.5">
          {formatDate(now)}
        </div>
      </div>
      <div className="border-t border-[var(--border-light)] pt-3 mt-1">
        <div className="text-[length:var(--fs-xs)] text-[var(--text-muted)] font-[var(--fw-medium)]">
          Users:
        </div>
        <div className="text-[length:var(--fs-xs)] text-[var(--text-secondary)] font-[var(--fw-semibold)]">
          {sessionCount} sessions active
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
