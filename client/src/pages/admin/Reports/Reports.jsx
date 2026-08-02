import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ReportGenerator from "@/features/reports/components/ReportGenerator";
import useAuth from "@/features/auth/hooks/useAuth";

const AdminReports = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Students", to: "/admin/students" },
    { label: "User Management", to: "/admin/users" },
    { label: "Internships Overview", to: "/admin/internships" },
    { label: "Reports & Analytics", to: "/admin/reports" },
  ];

  return (
    <DashboardLayout user={user || { name: "Administrator", role: "admin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">Generate comprehensive reports for institutional compliance and audits.</p>
        </div>

        <ReportGenerator onGenerate={(data) => alert(`Generating report: ${data.reportType}`)} />
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
