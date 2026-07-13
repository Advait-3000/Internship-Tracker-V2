import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../pages/AdminDashboard';
import FacultyManagement from '../pages/FacultyManagement';
import FacultyDetails from '../pages/FacultyDetails';
import StudentsList from '../pages/StudentsList';
import StudentProfile from '../pages/StudentProfile';

// Placeholder page components — will be replaced with real pages in later chunks
const CompaniesPage = () => <h1>Companies</h1>;
const UserProfilePage = () => <h1>User Profile</h1>;

function AppRoutes() {
  return (
    <Routes>
      {/* All dashboard routes share the DashboardLayout shell */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="student/:id" element={<StudentProfile />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="faculty/:id" element={<FacultyDetails />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
