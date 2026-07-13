import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import studentsReducer from '../features/students/studentsSlice';
import facultyReducer from '../features/faculty/facultySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    students: studentsReducer,
    faculty: facultyReducer,
  },
});
