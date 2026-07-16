import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import StudentLayout from '../components/layout/StudentLayout';
import CompanyLayout from '../components/layout/CompanyLayout';
import FacultyLayout from '../components/layout/FacultyLayout';
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

// Student Portal pages
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProfilePage from '../pages/student/StudentProfilePage';
import StudentReviews from '../pages/student/StudentReviews';
import StudentProjects from '../pages/student/StudentProjects';
import StudentTasks from '../pages/student/StudentTasks';

// Company Portal pages
import CompanyDashboard from '../pages/company/CompanyDashboard';
import CompanyListings from '../pages/company/CompanyListings';
import PostListing from '../pages/company/PostListing';

// Faculty Portal pages
import FacultyDashboardPage from '../pages/faculty/FacultyDashboardPage';
import FacultyInternsPage from '../pages/faculty/FacultyInternsPage';
import FacultyLettersPage from '../pages/faculty/FacultyLettersPage';
import FacultyReviewsPage from '../pages/faculty/FacultyReviewsPage';
import FacultyProjectsPage from '../pages/faculty/FacultyProjectsPage';

// Shared
import SharedCompaniesPage from '../pages/SharedCompaniesPage';

// Placeholder page components
const UserProfilePage = () => <h1>User Profile</h1>;

// Guard to ensure Admins cannot see or access the mentor page
function MentorRouteGuard() {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'Mentor') {
    return <Navigate to="/" replace />;
  }
  return <MentorDashboard />;
}

// Guard for Faculty Dashboard
function FacultyRouteGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'Faculty') {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Guard to ensure only SuperAdmin can access super-admin routes
function SuperAdminRouteGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'SuperAdmin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Guard to ensure only Students can access student routes
function StudentRouteGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'Student') {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Guard to ensure only Companies can access company routes
function CompanyRouteGuard({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== 'Company') {
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
    return <Navigate to="/student/dashboard" replace />;
  }
  if (user?.role === 'Company') {
    return <Navigate to="/company/dashboard" replace />;
  }
  if (user?.role === 'Faculty') {
    return <Navigate to="/faculty/dashboard" replace />;
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

      {/* ── Company Portal routes (separate CompanyLayout) ── */}
      <Route path="/company" element={<CompanyRouteGuard><CompanyLayout /></CompanyRouteGuard>}>
        <Route index element={<Navigate to="/company/dashboard" replace />} />
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="listings" element={<CompanyListings />} />
        <Route path="post" element={<PostListing />} />
      </Route>

      {/* ── Student Portal routes (separate StudentLayout) ── */}
      <Route path="/student" element={<StudentRouteGuard><StudentLayout /></StudentRouteGuard>}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="reviews" element={<StudentReviews />} />
        <Route path="projects" element={<StudentProjects />} />
        <Route path="tasks" element={<StudentTasks />} />
        <Route path="companies" element={<SharedCompaniesPage />} />
      </Route>

      {/* ── Faculty Portal routes (separate FacultyLayout) ── */}
      <Route path="/faculty" element={<FacultyRouteGuard><FacultyLayout /></FacultyRouteGuard>}>
        <Route index element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboardPage />} />
        <Route path="interns" element={<FacultyInternsPage />} />
        <Route path="letters" element={<FacultyLettersPage />} />
        <Route path="reviews" element={<FacultyReviewsPage />} />
        <Route path="projects" element={<FacultyProjectsPage />} />
      </Route>

      {/* All dashboard routes share the DashboardLayout shell */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<RoleBasedDashboard />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:nameSlug" element={<StudentProfile />} />
        <Route path="mentor" element={<MentorRouteGuard />} />
        <Route path="super-admin" element={<SuperAdminRouteGuard><SuperAdminDashboard /></SuperAdminRouteGuard>} />
        <Route path="admin-management" element={<SuperAdminRouteGuard><AdminManagement /></SuperAdminRouteGuard>} />
        <Route path="companies" element={<SharedCompaniesPage />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="faculty/:id" element={<FacultyDetails />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default AppRoutes;
