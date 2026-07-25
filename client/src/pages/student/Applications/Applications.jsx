import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ApplicationDetails from "@/entities/application/components/ApplicationDetails";
import useAuth from "@/features/auth/hooks/useAuth";

const StudentApplications = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Browse Internships", to: "/student/internships" },
    { label: "My Applications", to: "/student/applications" },
    { label: "My Profile", to: "/student/profile" },
  ];

  const dummyApplications = [
    {
      id: "app-1",
      internshipTitle: "Frontend React Developer Intern",
      studentName: user?.name || "Student User",
      status: "UNDER_REVIEW",
      appliedDate: "2026-07-20",
      coverLetter: "Excited to contribute to React frontend projects.",
      resumeUrl: "https://example.com/resume.pdf",
    },
  ];

  return (
    <DashboardLayout user={user || { name: "Student User", role: "student" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="text-sm text-gray-500">Track status and feedback for your submitted applications.</p>
        </div>

        <div className="space-y-4">
          {dummyApplications.map((app) => (
            <ApplicationDetails key={app.id} application={app} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
