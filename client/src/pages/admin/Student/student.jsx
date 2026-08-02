import React, { useState } from "react";
import { Filter, Calendar } from "lucide-react";
import {
  Users,
  Briefcase,
  CheckCircle,
  Building2,
  FileText,
  Clock,
} from "lucide-react";

import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import useAuth from "@/features/auth/hooks/useAuth";
import StatCard from "@/pages/admin/Dashboard/components/StatCard";
import SystemStatus from "@/pages/admin/Dashboard/components/SystemStatus";
import StudentReports from "@/pages/admin/Dashboard/components/StudentReports";

// ─── Shared admin sidebar (keep in sync with Dashboard.jsx) ───────────────────
const SIDEBAR_LINKS = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Students", to: "/admin/students" },
  { label: "User Management", to: "/admin/users" },
  { label: "Internships Overview", to: "/admin/internships" },
  { label: "Reports & Analytics", to: "/admin/reports" },
];

// ─── Department data (matches screenshot tiles) ───────────────────────────────
const DEPARTMENTS = [
  { label: "B. Tech AIDS", count: 108, color: "var(--primary)", bg: "var(--primary-light)" },
  { label: "AIML",         count: 89,  color: "var(--green)",   bg: "var(--green-light)"  },
  { label: "CSE(Cyber)",   count: 56,  color: "var(--cyan)",    bg: "var(--cyan-light)"   },
  { label: "COMPS",        count: 67,  color: "var(--purple)",  bg: "var(--purple-light)" },
  { label: "IT",           count: 98,  color: "var(--yellow)",  bg: "var(--yellow-light)" },
  { label: "R & A",        count: 3,   color: "var(--primary)", bg: "var(--primary-light)"},
  { label: "EXTC",         count: 14,  color: "var(--green)",   bg: "var(--green-light)"  },
  { label: "Civil",        count: 10,  color: "var(--yellow)",  bg: "var(--yellow-light)" },
  { label: "ECS",          count: 7,   color: "var(--purple)",  bg: "var(--purple-light)" },
  { label: "ELEC",         count: 15,  color: "var(--cyan)",    bg: "var(--cyan-light)"   },
];

// ─── KPI Stats ────────────────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Students",
    value: "2,564",
    sub: "✦ 12 Added Today",
    subColor: "green",
    icon: Users,
    iconBg: "var(--primary-light)",
    iconColor: "var(--primary)",
  },
  {
    label: "Active Internships",
    value: "1,923",
    sub: "✦ 15 New",
    subColor: "green",
    icon: Briefcase,
    iconBg: "var(--green-light)",
    iconColor: "var(--green)",
  },
  {
    label: "Completed Internships",
    value: "641",
    sub: "⬇ 2 Completed",
    subColor: "red",
    icon: CheckCircle,
    iconBg: "var(--purple-light)",
    iconColor: "var(--purple)",
  },
  {
    label: "Companies",
    value: "86",
    sub: "✦ 4 New Arrivals",
    subColor: "green",
    icon: Building2,
    iconBg: "var(--cyan-light)",
    iconColor: "var(--cyan)",
  },
  {
    label: "Pending Reports",
    value: "173",
    sub: "⬇ 2 Completed",
    subColor: "red",
    icon: FileText,
    iconBg: "var(--yellow-light)",
    iconColor: "var(--yellow)",
  },
  {
    label: "Pending Reviews",
    value: "94",
    sub: "⬇ 2 less than yesterday",
    subColor: "red",
    icon: Clock,
    iconBg: "var(--red-light)",
    iconColor: "var(--red)",
  },
];

// ─── Department Chip component ────────────────────────────────────────────────
const DeptChip = ({ dept, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] border-2 px-4 py-3 min-w-[80px] transition-all duration-150 hover:shadow-[var(--shadow-md)] cursor-pointer flex-shrink-0"
    style={{
      borderColor: isActive ? dept.color : "var(--border-light)",
      backgroundColor: isActive ? dept.bg : "var(--surface)",
      boxShadow: isActive ? `0 0 0 2px ${dept.color}22` : undefined,
    }}
  >
    <span
      className="text-[length:var(--fs-xl)] font-[var(--fw-bold)] leading-tight"
      style={{ color: dept.color }}
    >
      {dept.count}
    </span>
    <span className="text-[length:var(--fs-xs)] font-[var(--fw-medium)] text-[var(--text-secondary)] text-center leading-tight mt-0.5 whitespace-nowrap">
      {dept.label}
    </span>
  </button>
);

// ─── Page Header component ────────────────────────────────────────────────────
const PageHeader = ({ title }) => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      {/* Title + edit icons */}
      <div className="flex items-center gap-3">
        <h1
          className="text-[length:var(--fs-2xl)] font-[var(--fw-bold)] text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {/* Edit / link icon mimicking the screenshot */}
        <span className="flex gap-1.5">
          <span className="w-5 h-5 rounded-[var(--radius-sm)] bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-muted)] text-xs cursor-pointer hover:bg-[var(--border-light)] transition-colors">
            ✎
          </span>
          <span className="w-5 h-5 rounded-[var(--radius-sm)] bg-[var(--surface-hover)] flex items-center justify-center text-[var(--text-muted)] text-xs cursor-pointer hover:bg-[var(--border-light)] transition-colors">
            ⊞
          </span>
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[length:var(--fs-xs)] font-[var(--fw-medium)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--text-secondary)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all">
          <Filter className="w-3.5 h-3.5" />
          Filter
          <svg className="w-3 h-3 ml-0.5" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[length:var(--fs-xs)] font-[var(--fw-medium)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--text-secondary)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all">
          <Calendar className="w-3.5 h-3.5" />
          Today
          <svg className="w-3 h-3 ml-0.5" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminStudents = () => {
  const { user, logout } = useAuth();
  const [activeDept, setActiveDept] = useState(null);

  const handleDeptClick = (label) => {
    setActiveDept((prev) => (prev === label ? null : label));
  };

  return (
    <DashboardLayout
      user={user || { name: "Administrator", role: "admin" }}
      sidebarLinks={SIDEBAR_LINKS}
      onLogout={logout}
    >
      <div className="flex flex-col gap-6 font-[var(--font-body)]">

        {/* ── Page Header ── */}
        <PageHeader title="Students" />

        {/* ── Department Chips (horizontally scrollable on small screens) ── */}
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-3 min-w-max">
            {DEPARTMENTS.map((dept) => (
              <DeptChip
                key={dept.label}
                dept={dept}
                isActive={activeDept === dept.label}
                onClick={() => handleDeptClick(dept.label)}
              />
            ))}
          </div>
        </div>

        {/* Active department filter indicator */}
        {activeDept && (
          <div className="flex items-center gap-2">
            <span className="text-[length:var(--fs-xs)] text-[var(--text-muted)]">
              Filtering by department:
            </span>
            <span className="flex items-center gap-1 text-[length:var(--fs-xs)] font-[var(--fw-semibold)] text-[var(--primary)] bg-[var(--primary-light)] px-2.5 py-0.5 rounded-[var(--radius-full)]">
              {activeDept}
              <button
                onClick={() => setActiveDept(null)}
                className="ml-1 text-[var(--primary)] hover:text-[var(--red)] transition-colors"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* ── Row 1: System Status + 6 Stat Cards ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr] gap-4">
          {/* System status card */}
          <SystemStatus sessionCount={25} />

          {/* 2×3 KPI stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* ── Row 2: Full Student Reports table/grid ── */}
        <StudentReports />

      </div>
    </DashboardLayout>
  );
};

export default AdminStudents;
