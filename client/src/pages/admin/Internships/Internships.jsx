import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import InternshipGrid from "@/pages/student/Internships/components/InternshipGrid";
import useAuth from "@/features/auth/hooks/useAuth";

const AdminInternships = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Students", to: "/admin/students" },
    { label: "User Management", to: "/admin/users" },
    { label: "Internships Overview", to: "/admin/internships" },
    { label: "Reports & Analytics", to: "/admin/reports" },
  ];

  const dummyInternships = [
    { id: "1", title: "Full Stack Engineer Intern", companyName: "TechCorp", location: "Bangalore", stipend: 35000, status: "ACTIVE" },
    { id: "2", title: "UI/UX Designer Intern", companyName: "DesignStudio", location: "Remote", stipend: 20000, status: "ACTIVE" },
  ];

  return (
    <DashboardLayout user={user || { name: "Administrator", role: "admin" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Internships Overview</h1>
          <p className="text-sm text-gray-500">Monitor all internship listings published by registered companies.</p>
        </div>

        <InternshipGrid internships={dummyInternships} />
      </div>
    </DashboardLayout>
  );
};

export default AdminInternships;
