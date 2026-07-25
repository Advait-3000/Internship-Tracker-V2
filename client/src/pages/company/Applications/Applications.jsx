import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import ApplicationDetails from "@/entities/application/components/ApplicationDetails";
import useAuth from "@/features/auth/hooks/useAuth";

const CompanyApplications = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/company/dashboard" },
    { label: "Manage Internships", to: "/company/internships" },
    { label: "Review Applications", to: "/company/applications" },
  ];

  const dummyApps = [
    {
      id: "app-101",
      internshipTitle: "Frontend React Developer Intern",
      studentName: "Alex Turner",
      status: "PENDING",
      appliedDate: "2026-07-24",
      coverLetter: "Skilled in React, Redux, and Tailwind CSS.",
      resumeUrl: "https://example.com/alex-resume.pdf",
    },
  ];

  return (
    <DashboardLayout user={user || { name: "Company Rep", role: "company" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applicant Profiles</h1>
          <p className="text-sm text-gray-500">Review student applications submitted for your postings.</p>
        </div>

        <div className="space-y-4">
          {dummyApps.map((app) => (
            <ApplicationDetails key={app.id} application={app} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyApplications;
