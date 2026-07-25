import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import StudentStats from "./components/StudentStats";
import InternshipCard from "@/features/internship/components/InternshipCard";
import useAuth from "@/features/auth/hooks/useAuth";

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Browse Internships", to: "/student/internships" },
    { label: "My Applications", to: "/student/applications" },
    { label: "My Profile", to: "/student/profile" },
  ];

  const dummyInternships = [
    {
      id: "1",
      title: "Frontend React Developer Intern",
      companyName: "Acme Software",
      location: "Remote",
      stipend: 30000,
      status: "ACTIVE",
      duration: "6 Months",
    },
    {
      id: "2",
      title: "Backend Node.js Intern",
      companyName: "CloudTech Labs",
      location: "Bangalore",
      stipend: 25000,
      status: "ACTIVE",
      duration: "3 Months",
    },
  ];

  return (
    <DashboardLayout user={user || { name: "Student User", role: "student" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Track your internship search and applications.</p>
        </div>

        <StudentStats appliedCount={4} interviewCount={1} acceptedCount={0} />

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recommended Internships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
