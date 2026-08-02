import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import useAuth from "@/features/auth/hooks/useAuth";

import ProfileHeaderBanner from "./components/ProfileHeaderBanner";
import MentorTaskGrid from "./components/MentorTaskGrid";
import AttendanceRecord from "./components/AttendanceRecord";
import ProjectDetailsKanban from "./components/ProjectDetailsKanban";
import MetricsGrid from "./components/MetricsGrid";
import FooterSection from "./components/FooterSection";

const StudentProfile = () => {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const sidebarLinks = isAdmin
    ? [
        { label: "Dashboard", to: "/admin/dashboard" },
        { label: "Students", to: "/admin/students" },
        { label: "User Management", to: "/admin/users" },
        { label: "Internships Overview", to: "/admin/internships" },
        { label: "Reports & Analytics", to: "/admin/reports" },
      ]
    : [
        { label: "Dashboard", to: "/student/dashboard" },
        { label: "Browse Internships", to: "/student/internships" },
        { label: "My Applications", to: "/student/applications" },
        { label: "My Profile", to: "/student/profile" },
      ];

  return (
    <DashboardLayout
      user={user || { name: "Student User", role: "student" }}
      sidebarLinks={sidebarLinks}
      onLogout={logout}
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-[1100px] mx-auto space-y-6">
        <ProfileHeaderBanner />
        <MentorTaskGrid />
        <AttendanceRecord />
        <ProjectDetailsKanban />
        <MetricsGrid />
        <FooterSection />
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
