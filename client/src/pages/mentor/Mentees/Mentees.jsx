import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import StudentCard from "@/entities/student/components/StudentCard";
import useAuth from "@/features/auth/hooks/useAuth";

const MentorMentees = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/mentor/dashboard" },
    { label: "Mentees", to: "/mentor/mentees" },
    { label: "Attendance Log", to: "/mentor/attendance" },
  ];

  const dummyMentees = [
    { id: "1", name: "David Miller", rollNo: "2024-CS-12", department: "Computer Science", gpa: "3.7", status: "PLACED" },
  ];

  return (
    <DashboardLayout user={user || { name: "Industry Mentor", role: "mentor" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Industry Mentees</h1>
          <p className="text-sm text-gray-500">Manage and view progress for your industry interns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyMentees.map((m) => (
            <StudentCard key={m.id} student={m} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorMentees;
