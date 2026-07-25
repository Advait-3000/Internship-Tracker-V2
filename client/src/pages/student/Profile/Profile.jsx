import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import UserProfileCard from "@/entities/user/components/UserProfileCard";
import useAuth from "@/features/auth/hooks/useAuth";

const StudentProfile = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Browse Internships", to: "/student/internships" },
    { label: "My Applications", to: "/student/applications" },
    { label: "My Profile", to: "/student/profile" },
  ];

  return (
    <DashboardLayout user={user || { name: "Student User", role: "student" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h1>
          <p className="text-sm text-gray-500">Manage your profile details and preferences.</p>
        </div>

        <UserProfileCard user={user || { name: "Student User", email: "student@example.com", role: "student", department: "Computer Science" }} />
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
