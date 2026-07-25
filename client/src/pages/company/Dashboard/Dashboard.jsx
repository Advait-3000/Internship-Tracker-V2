import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import Card from "@/shared/components/ui/Card";
import useAuth from "@/features/auth/hooks/useAuth";

const CompanyDashboard = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/company/dashboard" },
    { label: "Manage Internships", to: "/company/internships" },
    { label: "Review Applications", to: "/company/applications" },
  ];

  return (
    <DashboardLayout user={user || { name: "Company Rep", role: "company" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Dashboard</h1>
          <p className="text-sm text-gray-500">Post internships and evaluate incoming applicant profiles.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Active Postings" subtitle="Currently published">
            <span className="text-3xl font-bold text-blue-600">5</span>
          </Card>
          <Card title="Total Applications" subtitle="Received across postings">
            <span className="text-3xl font-bold text-amber-500">42</span>
          </Card>
          <Card title="Shortlisted Candidates" subtitle="Under interview phase">
            <span className="text-3xl font-bold text-green-600">9</span>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
