import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import useAuth from "@/features/auth/hooks/useAuth";

const MentorDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/mentor/dashboard" },
    { label: "Mentees", to: "/mentor/mentees" },
    { label: "Attendance Log", to: "/mentor/attendance" },
  ];

  return (
    <DashboardLayout user={user || { name: "Industry Mentor", role: "mentor" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mentor Dashboard</h1>
          <p className="text-sm text-gray-500">Track industrial mentees and confirm weekly attendance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Active Mentees" subtitle="Interns under supervision">
            <span className="text-3xl font-bold text-blue-600">3</span>
          </Card>
          <Card title="Attendance Rate" subtitle="This Month">
            <span className="text-3xl font-bold text-green-600">96%</span>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
