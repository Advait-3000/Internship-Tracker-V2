import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../pages/AdminDashboard';
import FacultyManagement from '../pages/FacultyManagement';
import FacultyDetails from '../pages/FacultyDetails';
import StudentsList from '../pages/StudentsList';
import StudentProfile from '../pages/StudentProfile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MentorDashboard from '../pages/MentorDashboard';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import AdminManagement from '../pages/AdminManagement';

// Placeholder page components — will be replaced with real pages in later chunks
const CompaniesPage = () => <h1>Companies</h1>;
const UserProfilePage = () => <h1>User Profile</h1>;

// Guard to ensure Admins cannot see or access the mentor page
function MentorRouteGuard() {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'Mentor') {
    return <Navigate to="/" replace />;
  }
  return <MentorDashboard />;
}

// Guard to ensure only SuperAdmin can access super-admin routes
function SuperAdminRouteGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'SuperAdmin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Smart index dashboard component that renders the appropriate dashboard based on role
function RoleBasedDashboard() {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'Mentor') {
    return <Navigate to="/mentor" replace />;
  }
  if (user?.role === 'SuperAdmin') {
    return <Navigate to="/super-admin" replace />;
  }
  if (user?.role === 'Student') {
    return <StudentProfile />;
  }
  return <AdminDashboard />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes outside DashboardLayout */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register" element={<SignUp />} />

      {/* All dashboard routes share the DashboardLayout shell */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<RoleBasedDashboard />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:nameSlug" element={<StudentProfile />} />
        <Route path="mentor" element={<MentorRouteGuard />} />
        <Route path="super-admin" element={<SuperAdminRouteGuard><SuperAdminDashboard /></SuperAdminRouteGuard>} />
        <Route path="admin-management" element={<SuperAdminRouteGuard><AdminManagement /></SuperAdminRouteGuard>} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="faculty/:id" element={<FacultyDetails />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>

      {/* Catch-all route routes unknown paths back to root (which is protected by DashboardLayout) */}
      <Route path="*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default AppRoutes;
