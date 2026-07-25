import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";

// Auth Pages
import Login from "@/pages/auth/Login/Login";
import Register from "@/pages/auth/Register/Register";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard/Dashboard";
import StudentInternships from "@/pages/student/Internships/Internships";
import StudentApplications from "@/pages/student/Applications/Applications";
import StudentProfile from "@/pages/student/Profile/Profile";

// Faculty Pages
import FacultyDashboard from "@/pages/faculty/Dashboard/Dashboard";
import FacultyStudents from "@/pages/faculty/Students/Students";
import FacultyEvaluations from "@/pages/faculty/Evaluations/Evaluations";

// Mentor Pages
import MentorDashboard from "@/pages/mentor/Dashboard/Dashboard";
import MentorMentees from "@/pages/mentor/Mentees/Mentees";
import MentorAttendance from "@/pages/mentor/Attendance/Attendance";

// Company Pages
import CompanyDashboard from "@/pages/company/Dashboard/Dashboard";
import CompanyInternships from "@/pages/company/Internships/Internships";
import CompanyApplications from "@/pages/company/Applications/Applications";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard/Dashboard";
import AdminUsers from "@/pages/admin/Users/Users";
import AdminInternships from "@/pages/admin/Internships/Internships";
import AdminReports from "@/pages/admin/Reports/Reports";

// SuperAdmin Pages
import SuperAdminDashboard from "@/pages/superadmin/Dashboard/Dashboard";
import SuperAdminSystemLogs from "@/pages/superadmin/SystemLogs/SystemLogs";
import SuperAdminSettings from "@/pages/superadmin/Settings/Settings";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Student Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
          <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.STUDENT.INTERNSHIPS} element={<StudentInternships />} />
          <Route path={ROUTES.STUDENT.APPLICATIONS} element={<StudentApplications />} />
          <Route path={ROUTES.STUDENT.PROFILE} element={<StudentProfile />} />
        </Route>

        {/* Faculty Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.FACULTY]} />}>
          <Route path={ROUTES.FACULTY.DASHBOARD} element={<FacultyDashboard />} />
          <Route path={ROUTES.FACULTY.STUDENTS} element={<FacultyStudents />} />
          <Route path={ROUTES.FACULTY.EVALUATIONS} element={<FacultyEvaluations />} />
        </Route>

        {/* Mentor Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.MENTOR]} />}>
          <Route path={ROUTES.MENTOR.DASHBOARD} element={<MentorDashboard />} />
          <Route path={ROUTES.MENTOR.MENTEES} element={<MentorMentees />} />
          <Route path={ROUTES.MENTOR.ATTENDANCE} element={<MentorAttendance />} />
        </Route>

        {/* Company Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.COMPANY]} />}>
          <Route path={ROUTES.COMPANY.DASHBOARD} element={<CompanyDashboard />} />
          <Route path={ROUTES.COMPANY.INTERNSHIPS} element={<CompanyInternships />} />
          <Route path={ROUTES.COMPANY.APPLICATIONS} element={<CompanyApplications />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN.USERS} element={<AdminUsers />} />
          <Route path={ROUTES.ADMIN.INTERNSHIPS} element={<AdminInternships />} />
          <Route path={ROUTES.ADMIN.REPORTS} element={<AdminReports />} />
        </Route>

        {/* SuperAdmin Routes */}
        <Route element={<RoleRoute allowedRoles={[ROLES.SUPERADMIN]} />}>
          <Route path={ROUTES.SUPERADMIN.DASHBOARD} element={<SuperAdminDashboard />} />
          <Route path={ROUTES.SUPERADMIN.SYSTEM_LOGS} element={<SuperAdminSystemLogs />} />
          <Route path={ROUTES.SUPERADMIN.SETTINGS} element={<SuperAdminSettings />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
