import React from "react";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import StudentCard from "@/entities/student/components/StudentCard";
import useAuth from "@/features/auth/hooks/useAuth";

const FacultyStudents = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { label: "Dashboard", to: "/faculty/dashboard" },
    { label: "Assigned Students", to: "/faculty/students" },
    { label: "Evaluations", to: "/faculty/evaluations" },
  ];

  const dummyStudents = [
    { id: "1", name: "Alice Johnson", rollNo: "2024-CS-02", department: "Computer Science", gpa: "3.9", status: "PLACED" },
    { id: "2", name: "Bob Smith", rollNo: "2024-CS-05", department: "Computer Science", gpa: "3.6", status: "SEEKING" },
  ];

  return (
    <DashboardLayout user={user || { name: "Faculty Member", role: "faculty" }} sidebarLinks={sidebarLinks} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Students</h1>
          <p className="text-sm text-gray-500">Students assigned under your academic mentorship.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyStudents.map((st) => (
            <StudentCard key={st.id} student={st} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyStudents;
