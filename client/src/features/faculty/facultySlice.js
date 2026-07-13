import { createSlice } from "@reduxjs/toolkit";

// ============================================================
// DUMMY DATA
// ============================================================

const DUMMY_FACULTY = [
  {
    id: "fac-1",
    name: "Prof. Omkar",
    email: "omkar@aum.edu.in",
    department: "Computer Engineering",
    assignedStudentsCount: 42,
    status: "Active",
  },
  {
    id: "fac-2",
    name: "Prof. Meera Kulkarni",
    email: "meera.kulkarni@aum.edu.in",
    department: "Information Technology",
    assignedStudentsCount: 38,
    status: "Active",
  },
  {
    id: "fac-3",
    name: "Dr. Rajesh Patil",
    email: "rajesh.patil@aum.edu.in",
    department: "EXTC",
    assignedStudentsCount: 35,
    status: "Active",
  },
  {
    id: "fac-4",
    name: "Prof. Anita Sharma",
    email: "anita.sharma@aum.edu.in",
    department: "Computer Engineering",
    assignedStudentsCount: 28,
    status: "Active",
  },
  {
    id: "fac-5",
    name: "Dr. Vikram Joshi",
    email: "vikram.joshi@aum.edu.in",
    department: "AIML",
    assignedStudentsCount: 45,
    status: "Active",
  },
  {
    id: "fac-6",
    name: "Prof. Kavita Desai",
    email: "kavita.desai@aum.edu.in",
    department: "Information Technology",
    assignedStudentsCount: 30,
    status: "Inactive",
  },
  {
    id: "fac-7",
    name: "Dr. Amit Naik",
    email: "amit.naik@aum.edu.in",
    department: "AIDS",
    assignedStudentsCount: 22,
    status: "Active",
  },
  {
    id: "fac-8",
    name: "Prof. Sneha Ghosh",
    email: "sneha.ghosh@aum.edu.in",
    department: "EXTC",
    assignedStudentsCount: 18,
    status: "Inactive",
  },
  {
    id: "fac-9",
    name: "Dr. Pradeep Verma",
    email: "pradeep.verma@aum.edu.in",
    department: "Civil",
    assignedStudentsCount: 15,
    status: "Active",
  },
  {
    id: "fac-10",
    name: "Prof. Lakshmi Iyer",
    email: "lakshmi.iyer@aum.edu.in",
    department: "ECS",
    assignedStudentsCount: 20,
    status: "Active",
  },
  {
    id: "fac-11",
    name: "Dr. Sanjay Mane",
    email: "sanjay.mane@aum.edu.in",
    department: "Computer Engineering",
    assignedStudentsCount: 33,
    status: "Active",
  },
  {
    id: "fac-12",
    name: "Prof. Ritu Agarwal",
    email: "ritu.agarwal@aum.edu.in",
    department: "AIML",
    assignedStudentsCount: 40,
    status: "Active",
  },
];

// ============================================================
// SLICE
// ============================================================

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    list: DUMMY_FACULTY,
    loading: false,
    error: null,
  },
  reducers: {
    addFaculty: (state, action) => {
      state.list.unshift(action.payload);
    },
    deleteFaculty: (state, action) => {
      state.list = state.list.filter((f) => f.id !== action.payload);
    },
    clearFacultyError: (state) => {
      state.error = null;
    },
  },
});

export const { addFaculty, deleteFaculty, clearFacultyError } =
  facultySlice.actions;
export default facultySlice.reducer;
