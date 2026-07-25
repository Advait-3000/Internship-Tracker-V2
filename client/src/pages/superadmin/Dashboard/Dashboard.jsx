import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import useAuth from "@/features/auth/hooks/useAuth";

const SuperAdminDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/superadmin/dashboard" },
    { label: "System Audit Logs", to: "/superadmin/system-logs" },
    { label: "Platform Settings", to: "/superadmin/settings" },
  ];

  return (
    <DashboardLayout user={user || { name: "System SuperAdmin", role: "superadmin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SuperAdmin Control Panel</h1>
          <p className="text-sm text-gray-500">System infrastructure health and global configuration.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="System Uptime" subtitle="Core Services">
            <span className="text-3xl font-bold text-green-600">99.98%</span>
          </Card>
          <Card title="API Requests" subtitle="Last 24 hours">
            <span className="text-3xl font-bold text-blue-600">128.4K</span>
          </Card>
          <Card title="Database Storage" subtitle="Allocated Volume">
            <span className="text-3xl font-bold text-purple-600">12.4 GB</span>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
