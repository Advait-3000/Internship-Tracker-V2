import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";

// ─── Lazy-loaded pages — each loads independently; one crash won't break others ───

// Auth
const Login    = lazy(() => import("@/pages/auth/Login/Login"));
const Register = lazy(() => import("@/pages/auth/Register/Register"));

// Student
const StudentDashboard   = lazy(() => import("@/pages/student/Dashboard/Dashboard"));
const StudentInternships = lazy(() => import("@/pages/student/Internships/Internships"));
const StudentApplications= lazy(() => import("@/pages/student/Applications/Applications"));
const StudentProfile     = lazy(() => import("@/pages/student/Profile/Profile"));

// Faculty
const FacultyDashboard   = lazy(() => import("@/pages/faculty/Dashboard/Dashboard"));
const FacultyStudents    = lazy(() => import("@/pages/faculty/Students/Students"));
const FacultyEvaluations = lazy(() => import("@/pages/faculty/Evaluations/Evaluations"));

// Mentor
const MentorDashboard  = lazy(() => import("@/pages/mentor/Dashboard/Dashboard"));
const MentorMentees    = lazy(() => import("@/pages/mentor/Mentees/Mentees"));
const MentorAttendance = lazy(() => import("@/pages/mentor/Attendance/Attendance"));

// Company
const CompanyDashboard    = lazy(() => import("@/pages/company/Dashboard/Dashboard"));
const CompanyInternships  = lazy(() => import("@/pages/company/Internships/Internships"));
const CompanyApplications = lazy(() => import("@/pages/company/Applications/Applications"));

// Admin
const AdminDashboard  = lazy(() => import("@/pages/admin/Dashboard/Dashboard"));
const AdminStudents   = lazy(() => import("@/pages/admin/Student/student"));
const AdminUsers      = lazy(() => import("@/pages/admin/Users/Users"));
const AdminInternships= lazy(() => import("@/pages/admin/Internships/Internships"));
const AdminReports    = lazy(() => import("@/pages/admin/Reports/Reports"));

// SuperAdmin
const SuperAdminDashboard  = lazy(() => import("@/pages/superadmin/Dashboard/Dashboard"));
const SuperAdminSystemLogs = lazy(() => import("@/pages/superadmin/SystemLogs/SystemLogs"));
const SuperAdminSettings   = lazy(() => import("@/pages/superadmin/Settings/Settings"));

// ─── Minimal loading fallback ─────────────────────────────────────────────────
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <span className="text-sm text-gray-500 font-medium">Loading page…</span>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME}     element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN}    element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Student */}
          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route path={ROUTES.STUDENT.DASHBOARD}    element={<StudentDashboard />} />
            <Route path={ROUTES.STUDENT.INTERNSHIPS}  element={<StudentInternships />} />
            <Route path={ROUTES.STUDENT.APPLICATIONS} element={<StudentApplications />} />
          </Route>

          {/* Shared profile access (Students, Admins, Faculty, Mentors) */}
          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY, ROLES.MENTOR, ROLES.SUPERADMIN]} />}>
            <Route path={ROUTES.STUDENT.PROFILE} element={<StudentProfile />} />
          </Route>

          {/* Faculty */}
          <Route element={<RoleRoute allowedRoles={[ROLES.FACULTY]} />}>
            <Route path={ROUTES.FACULTY.DASHBOARD}   element={<FacultyDashboard />} />
            <Route path={ROUTES.FACULTY.STUDENTS}    element={<FacultyStudents />} />
            <Route path={ROUTES.FACULTY.EVALUATIONS} element={<FacultyEvaluations />} />
          </Route>

          {/* Mentor */}
          <Route element={<RoleRoute allowedRoles={[ROLES.MENTOR]} />}>
            <Route path={ROUTES.MENTOR.DASHBOARD}  element={<MentorDashboard />} />
            <Route path={ROUTES.MENTOR.MENTEES}    element={<MentorMentees />} />
            <Route path={ROUTES.MENTOR.ATTENDANCE} element={<MentorAttendance />} />
          </Route>

          {/* Company */}
          <Route element={<RoleRoute allowedRoles={[ROLES.COMPANY]} />}>
            <Route path={ROUTES.COMPANY.DASHBOARD}    element={<CompanyDashboard />} />
            <Route path={ROUTES.COMPANY.INTERNSHIPS}  element={<CompanyInternships />} />
            <Route path={ROUTES.COMPANY.APPLICATIONS} element={<CompanyApplications />} />
          </Route>

          {/* Admin */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path={ROUTES.ADMIN.DASHBOARD}   element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN.STUDENTS}    element={<AdminStudents />} />
            <Route path={ROUTES.ADMIN.USERS}       element={<AdminUsers />} />
            <Route path={ROUTES.ADMIN.INTERNSHIPS} element={<AdminInternships />} />
            <Route path={ROUTES.ADMIN.REPORTS}     element={<AdminReports />} />
          </Route>

          {/* SuperAdmin */}
          <Route element={<RoleRoute allowedRoles={[ROLES.SUPERADMIN]} />}>
            <Route path={ROUTES.SUPERADMIN.DASHBOARD}   element={<SuperAdminDashboard />} />
            <Route path={ROUTES.SUPERADMIN.SYSTEM_LOGS} element={<SuperAdminSystemLogs />} />
            <Route path={ROUTES.SUPERADMIN.SETTINGS}    element={<SuperAdminSettings />} />
          </Route>

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
