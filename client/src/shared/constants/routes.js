export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    INTERNSHIPS: '/student/internships',
    APPLICATIONS: '/student/applications',
    PROFILE: '/student/profile',
  },

  FACULTY: {
    DASHBOARD: '/faculty/dashboard',
    STUDENTS: '/faculty/students',
    EVALUATIONS: '/faculty/evaluations',
  },

  MENTOR: {
    DASHBOARD: '/mentor/dashboard',
    MENTEES: '/mentor/mentees',
    ATTENDANCE: '/mentor/attendance',
  },

  COMPANY: {
    DASHBOARD: '/company/dashboard',
    INTERNSHIPS: '/company/internships',
    APPLICATIONS: '/company/applications',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STUDENTS: '/admin/students',
    USERS: '/admin/users',
    INTERNSHIPS: '/admin/internships',
    REPORTS: '/admin/reports',
    STUDENT_PROFILE: '/admin/students/:studentId',
  },

  SUPERADMIN: {
    DASHBOARD: '/superadmin/dashboard',
    SYSTEM_LOGS: '/superadmin/system-logs',
    SETTINGS: '/superadmin/settings',
  },
};
