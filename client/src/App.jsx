import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Dashboard from './features/dashboard/pages/Dashboard';
import Students from './features/students/pages/Students';
import StudentProfile from './features/students/pages/StudentProfile';
import MentorDashboard from './features/mentor/pages/MentorDashboard';
import MentorInterns from './features/mentor/pages/MentorInterns';
import MentorProfile from './features/mentor/pages/MentorProfile';
import MentorProjectDetails from './features/mentor/pages/MentorProjectDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Admin Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/profile/:id" element={<StudentProfile />} />
      
      {/* Mentor Routes */}
      <Route path="/mentor/dashboard" element={<MentorDashboard />} />
      <Route path="/mentor/interns" element={<MentorInterns />} />
      <Route path="/mentor/profile" element={<MentorProfile />} />
      <Route path="/mentor/project/:id" element={<MentorProjectDetails />} />
    </Routes>
  );
}

export default App;
