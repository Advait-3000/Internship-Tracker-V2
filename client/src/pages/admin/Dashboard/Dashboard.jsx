import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import useAuth from "@/features/auth/hooks/useAuth";
import {
  Users,
  Briefcase,
  CheckCircle,
  Building2,
  FileText,
  Clock,
} from "lucide-react";

import StatCard from "./components/StatCard";
import SystemStatus from "./components/SystemStatus";
import ReportChart from "./components/ReportChart";
import InternshipDonut from "./components/InternshipDonut";
import StudentReports from "./components/StudentReports";

// ---- Sidebar links for admin ----
const SIDEBAR_LINKS = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "User Management", to: "/admin/users" },
  { label: "Internships Overview", to: "/admin/internships" },
  { label: "Reports & Analytics", to: "/admin/reports" },
];

// ---- Mock KPI stats using theme variables ----
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

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <DashboardLayout
      user={user || { name: "Administrator", role: "admin" }}
      sidebarLinks={SIDEBAR_LINKS}
      onLogout={logout}
    >
      <div className="flex flex-col gap-6 font-[var(--font-body)]">
        {/* ── Row 1: System status + 2×3 stat cards ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr] gap-4">
          {/* System status (left column) */}
          <SystemStatus sessionCount={25} />

          {/* Stat cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* ── Row 2: Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ReportChart />
          <InternshipDonut />
        </div>

        {/* ── Row 3: Student Reports table / grid ── */}
        <StudentReports />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
