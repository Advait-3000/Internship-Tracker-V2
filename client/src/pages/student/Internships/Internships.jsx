import React, { useState } from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import InternshipFilters from "@/features/internship/components/InternshipFilters";
import InternshipGrid from "./components/InternshipGrid";
import useAuth from "@/features/auth/hooks/useAuth";

const StudentInternships = () => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const sidebarLinks = [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Browse Internships", to: "/student/internships" },
    { label: "My Applications", to: "/student/applications" },
    { label: "My Profile", to: "/student/profile" },
  ];

  const dummyInternships = [
    { id: "1", title: "Full Stack Engineer Intern", companyName: "TechCorp", location: "Bangalore", stipend: 35000, status: "ACTIVE" },
    { id: "2", title: "UI/UX Designer Intern", companyName: "DesignStudio", location: "Remote", stipend: 20000, status: "ACTIVE" },
    { id: "3", title: "Data Science Intern", companyName: "AnalyticsCo", location: "Hyderabad", stipend: 40000, status: "ACTIVE" },
  ];

  return (
    <DashboardLayout user={user || { name: "Student User", role: "student" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Internships</h1>
          <p className="text-sm text-gray-500">Discover top internships tailored for your skill set.</p>
        </div>

        <InternshipFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusChange={setStatusFilter} />

        <InternshipGrid internships={dummyInternships} />
      </div>
    </DashboardLayout>
  );
};

export default StudentInternships;
