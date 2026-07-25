import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import internshipReducer from '@/features/internship/store/internshipSlice';
import applicationReducer from '@/features/application/store/applicationSlice';
import attendanceReducer from '@/features/attendance/store/attendanceSlice';
import evaluationReducer from '@/features/evaluation/store/evaluationSlice';
import notificationReducer from '@/features/notification/store/notificationSlice';
import reportsReducer from '@/features/reports/store/reportsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  internship: internshipReducer,
  application: applicationReducer,
  attendance: attendanceReducer,
  evaluation: evaluationReducer,
  notification: notificationReducer,
  reports: reportsReducer,
});

export default rootReducer;
