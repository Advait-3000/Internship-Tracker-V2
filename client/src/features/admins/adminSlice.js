import { createSlice } from '@reduxjs/toolkit';

// ============================================================
// DUMMY DATA — Admins manage Faculties, Faculties manage Students
// ============================================================

// Faculty IDs must match what's in facultySlice so progress bars reflect real faculty counts
const ALL_FACULTY_IDS = [
  'fac-1', 'fac-2', 'fac-3', 'fac-4', 'fac-5',
  'fac-6', 'fac-7', 'fac-8', 'fac-9', 'fac-10',
  'fac-11', 'fac-12',
];

const DUMMY_ADMINS = [
  {
    id: 'adm-1',
    name: 'Dr. Samridhi Kapoor',
    email: 'samridhi.kapoor@aum.edu.in',
    department: 'Computer Engineering',
    role: 'Admin',
    status: 'Active',
    joined: '2023-07-15',
    phone: '+91 98201 11234',
    facultyQuota: 5,           // max faculties this admin can oversee
    managedFacultyIds: ['fac-1', 'fac-4', 'fac-11'],   // 3 / 5
    avatarInitials: 'SK',
  },
  {
    id: 'adm-2',
    name: 'Prof. Karthikeyan Nair',
    email: 'karthikeyan.nair@aum.edu.in',
    department: 'Information Technology',
    role: 'Admin',
    status: 'Active',
    joined: '2023-08-01',
    phone: '+91 98765 22345',
    facultyQuota: 4,
    managedFacultyIds: ['fac-2', 'fac-6', 'fac-10', 'fac-12'],   // 4 / 4
    avatarInitials: 'KN',
  },
  {
    id: 'adm-3',
    name: 'Dr. Pallavi Deshpande',
    email: 'pallavi.deshpande@aum.edu.in',
    department: 'AIML',
    role: 'Co-Admin',
    status: 'Active',
    joined: '2024-01-10',
    phone: '+91 99001 33456',
    facultyQuota: 4,
    managedFacultyIds: ['fac-5', 'fac-12'],    // 2 / 4
    avatarInitials: 'PD',
  },
  {
    id: 'adm-4',
    name: 'Mr. Rohan Singhania',
    email: 'rohan.singhania@aum.edu.in',
    department: 'EXTC',
    role: 'Admin',
    status: 'Active',
    joined: '2023-09-20',
    phone: '+91 91234 44567',
    facultyQuota: 3,
    managedFacultyIds: ['fac-3', 'fac-8'],     // 2 / 3
    avatarInitials: 'RS',
  },
  {
    id: 'adm-5',
    name: 'Ms. Tanvika Iyer',
    email: 'tanvika.iyer@aum.edu.in',
    department: 'AIDS',
    role: 'Co-Admin',
    status: 'Inactive',
    joined: '2024-03-05',
    phone: '+91 70012 55678',
    facultyQuota: 3,
    managedFacultyIds: ['fac-7'],              // 1 / 3
    avatarInitials: 'TI',
  },
  {
    id: 'adm-6',
    name: 'Dr. Bhargav Trivedi',
    email: 'bhargav.trivedi@aum.edu.in',
    department: 'Civil Engineering',
    role: 'Admin',
    status: 'Active',
    joined: '2023-11-15',
    phone: '+91 86001 66789',
    facultyQuota: 4,
    managedFacultyIds: ['fac-9'],              // 1 / 4
    avatarInitials: 'BT',
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  department: '',
  role: 'Admin',
  status: 'Active',
  facultyQuota: 4,
  managedFacultyIds: [],
};

// ============================================================
// SLICE
// ============================================================

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    list: DUMMY_ADMINS,
    loading: false,
    error: null,
  },
  reducers: {
    addAdmin: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateAdmin: (state, action) => {
      const idx = state.list.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = { ...state.list[idx], ...action.payload };
      }
    },
    deleteAdmin: (state, action) => {
      state.list = state.list.filter((a) => a.id !== action.payload);
    },
    toggleAdminStatus: (state, action) => {
      const admin = state.list.find((a) => a.id === action.payload);
      if (admin) {
        admin.status = admin.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
    assignFacultyToAdmin: (state, action) => {
      const { adminId, facultyId } = action.payload;
      const admin = state.list.find((a) => a.id === adminId);
      if (admin && !admin.managedFacultyIds.includes(facultyId)) {
        admin.managedFacultyIds.push(facultyId);
      }
    },
    removeFacultyFromAdmin: (state, action) => {
      const { adminId, facultyId } = action.payload;
      const admin = state.list.find((a) => a.id === adminId);
      if (admin) {
        admin.managedFacultyIds = admin.managedFacultyIds.filter((id) => id !== facultyId);
      }
    },
  },
});

export const {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  assignFacultyToAdmin,
  removeFacultyFromAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
