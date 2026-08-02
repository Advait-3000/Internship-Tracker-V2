import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import DataTable from "@/shared/components/common/DataTable";
import Badge from "@/shared/components/ui/Badge";
import useAuth from "@/features/auth/hooks/useAuth";

const AdminUsers = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Students", to: "/admin/students" },
    { label: "User Management", to: "/admin/users" },
    { label: "Internships Overview", to: "/admin/internships" },
    { label: "Reports & Analytics", to: "/admin/reports" },
  ];

  const headers = ["Name", "Email", "Role", "Status"];

  const dummyUsers = [
    { id: "u-1", name: "Alice Johnson", email: "alice@example.com", role: "STUDENT", status: "Active" },
    { id: "u-2", name: "Dr. Alex Smith", email: "alex@university.edu", role: "FACULTY", status: "Active" },
    { id: "u-3", name: "TechCorp Global", email: "hr@techcorp.com", role: "COMPANY", status: "Active" },
  ];

  const renderRow = (usr) => (
    <>
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{usr.name}</td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{usr.email}</td>
      <td className="px-4 py-3">
        <Badge variant="info">{usr.role}</Badge>
      </td>
      <td className="px-4 py-3">
        <Badge variant="success">{usr.status}</Badge>
      </td>
    </>
  );

  return (
    <DashboardLayout user={user || { name: "Administrator", role: "admin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500">Manage account access and roles across the platform.</p>
        </div>

        <DataTable headers={headers} data={dummyUsers} renderRow={renderRow} />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
