import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import studentsReducer from '../features/students/studentsSlice';
import facultyReducer from '../features/faculty/facultySlice';
import internReducer from '../features/students/studentSlice';
import mentorReducer from '../features/mentor/mentorSlice';
import adminReducer from '../features/admins/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    students: studentsReducer,
    faculty: facultyReducer,
    interns: internReducer,
    mentor: mentorReducer,
    admins: adminReducer,
  },
});

