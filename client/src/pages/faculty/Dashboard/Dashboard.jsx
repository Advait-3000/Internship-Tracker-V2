import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import useAuth from "@/features/auth/hooks/useAuth";

const FacultyDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/faculty/dashboard" },
    { label: "Assigned Students", to: "/faculty/students" },
    { label: "Evaluations", to: "/faculty/evaluations" },
  ];

  return (
    <DashboardLayout user={user || { name: "Faculty Member", role: "faculty" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor student internships and submit academic evaluations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Assigned Mentees" subtitle="Students under supervision">
            <span className="text-3xl font-bold text-blue-600">14</span>
          </Card>
          <Card title="Pending Evaluations" subtitle="Requires assessment">
            <span className="text-3xl font-bold text-amber-500">3</span>
          </Card>
          <Card title="Completed Internships" subtitle="Successfully evaluated">
            <span className="text-3xl font-bold text-green-600">8</span>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
