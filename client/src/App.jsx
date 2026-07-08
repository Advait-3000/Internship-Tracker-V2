import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Dashboard from './features/dashboard/pages/Dashboard';
import Students from './features/students/pages/Students';
import StudentProfile from './features/students/pages/StudentProfile';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/profile/:id" element={<StudentProfile />} />
    </Routes>
  );
}

export default App;
