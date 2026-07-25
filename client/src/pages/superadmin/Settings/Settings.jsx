import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import useAuth from "@/features/auth/hooks/useAuth";

const SuperAdminSettings = () => {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="text-sm text-gray-500">Configure global parameters, security tokens, and features.</p>
        </div>

        <Card title="Security & API Keys">
          <p className="text-xs text-gray-500 mb-4">Manage authentication secrets and API rate limits.</p>
          <Button size="sm">Regenerate JWT Secret</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminSettings;
