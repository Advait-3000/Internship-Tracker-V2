import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import EvaluationForm from "@/features/evaluation/components/EvaluationForm";
import useAuth from "@/features/auth/hooks/useAuth";

const FacultyEvaluations = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/faculty/dashboard" },
    { label: "Assigned Students", to: "/faculty/students" },
    { label: "Evaluations", to: "/faculty/evaluations" },
  ];

  return (
    <DashboardLayout user={user || { name: "Faculty Member", role: "faculty" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Submit Academic Evaluation</h1>
          <p className="text-sm text-gray-500">Provide performance ratings and feedback for your mentees.</p>
        </div>

        <div className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <EvaluationForm studentName="Alice Johnson" onSubmit={(val) => console.log("Evaluation:", val)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyEvaluations;
