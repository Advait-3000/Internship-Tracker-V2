import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import DataTable from "@/shared/components/common/DataTable";
import Badge from "@/shared/components/ui/Badge";
import useAuth from "@/features/auth/hooks/useAuth";

const SuperAdminSystemLogs = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/superadmin/dashboard" },
    { label: "System Audit Logs", to: "/superadmin/system-logs" },
    { label: "Platform Settings", to: "/superadmin/settings" },
  ];

  const headers = ["Timestamp", "Level", "Event", "Actor"];

  const dummyLogs = [
    { id: "l-1", timestamp: "2026-07-25 10:45:12", level: "INFO", event: "User login success", actor: "admin@system.com" },
    { id: "l-2", timestamp: "2026-07-25 10:42:01", level: "WARN", event: "Failed API request limit", actor: "192.168.1.4" },
  ];

  const renderRow = (log) => (
    <>
      <td className="px-4 py-3 text-xs text-gray-500 font-mono">{log.timestamp}</td>
      <td className="px-4 py-3">
        <Badge variant={log.level === "INFO" ? "info" : "warning"}>{log.level}</Badge>
      </td>
      <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{log.event}</td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{log.actor}</td>
    </>
  );

  return (
    <DashboardLayout user={user || { name: "System SuperAdmin", role: "superadmin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Audit Logs</h1>
          <p className="text-sm text-gray-500">Real-time system events, audit traces, and security warnings.</p>
        </div>

        <DataTable headers={headers} data={dummyLogs} renderRow={renderRow} />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminSystemLogs;
