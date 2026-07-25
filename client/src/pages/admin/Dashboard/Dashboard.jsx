import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import useAuth from "@/features/auth/hooks/useAuth";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "User Management", to: "/admin/users" },
    { label: "Internships Overview", to: "/admin/internships" },
    { label: "Reports & Analytics", to: "/admin/reports" },
  ];

  return (
    <DashboardLayout user={user || { name: "Administrator", role: "admin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 font-medium">Platform management and high-level metrics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card title="Total Users" subtitle="Registered across platform">
            <span className="text-3xl font-bold text-blue-600">450</span>
          </Card>
          <Card title="Students" subtitle="Active applicants">
            <span className="text-3xl font-bold text-green-600">320</span>
          </Card>
          <Card title="Companies" subtitle="Verified partners">
            <span className="text-3xl font-bold text-purple-600">45</span>
          </Card>
          <Card title="Placement Rate" subtitle="Current academic year">
            <span className="text-3xl font-bold text-amber-500">84%</span>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
