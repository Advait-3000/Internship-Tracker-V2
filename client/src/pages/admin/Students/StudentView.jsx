import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import useAuth from "@/features/auth/hooks/useAuth";
import StudentProfile from "@/pages/student/Profile/Profile";
import { ROUTES } from "@/shared/constants/routes";

const adminSidebarLinks = [
  { label: "Dashboard", to: ROUTES.ADMIN.DASHBOARD },
  { label: "User Management", to: ROUTES.ADMIN.USERS },
  { label: "Internships Overview", to: ROUTES.ADMIN.INTERNSHIPS },
  { label: "Reports & Analytics", to: ROUTES.ADMIN.REPORTS },
];

/**
 * AdminStudentView
 * Renders a student's profile inside the admin layout.
 * Student data is passed via React Router location.state from StudentReports.
 */
const AdminStudentView = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Student data passed from StudentReports via navigate(…, { state: { student } })
  const student = location.state?.student ?? null;

  // If someone lands here directly without data, go back to admin dashboard
  if (!student) {
    return (
      <DashboardLayout
        user={user || { name: "Admin", role: "admin" }}
        sidebarLinks={adminSidebarLinks}
        onLogout={logout}
      >
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-gray-500 text-sm">No student data found.</p>
          <button
            onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
            className="px-4 py-2 bg-[#0f3460] text-white text-sm rounded-lg hover:bg-[#1a4a7a] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      user={user || { name: "Admin", role: "admin" }}
      sidebarLinks={adminSidebarLinks}
      onLogout={logout}
    >
      {/* Back button */}
      <div className="max-w-[1100px] mx-auto mb-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0f172a] transition-colors"
        >
          <span className="text-base leading-none">←</span>
          <span>Back</span>
        </button>
      </div>

      {/* The pure profile content, now receiving student data as prop */}
      <StudentProfile student={student} />
    </DashboardLayout>
  );
};

export default AdminStudentView;
