import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../pages/AdminDashboard';
import FacultyManagement from '../pages/FacultyManagement';

// Placeholder page components — will be replaced with real pages in later chunks
const StudentsPage = () => <h1>Students</h1>;
const CompaniesPage = () => <h1>Companies</h1>;
const UserProfilePage = () => <h1>User Profile</h1>;

function AppRoutes() {
  return (
    <Routes>
      {/* All dashboard routes share the DashboardLayout shell */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="faculty" element={<FacultyManagement />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
