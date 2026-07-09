import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// ============================================================
// ASYNC THUNKS (stubbed with mock data — swap to API later)
// ============================================================

const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

const generateDummyStudents = () => {
  const DEPARTMENTS = [
    { label: "B. Tech AIDS", color: "bg-blue-100", text: "text-blue-700" },
    { label: "AIML", color: "bg-green-100", text: "text-green-700" },
    { label: "CSE(Cyber)", color: "bg-orange-100", text: "text-orange-700" },
    { label: "COMPS", color: "bg-purple-100", text: "text-purple-700" },
    { label: "IT", color: "bg-teal-100", text: "text-teal-700" },
    { label: "R & A", color: "bg-blue-100", text: "text-blue-700" },
    { label: "EXTC", color: "bg-green-100", text: "text-green-700" },
    { label: "Civil", color: "bg-yellow-100", text: "text-yellow-700" },
    { label: "ECS", color: "bg-purple-100", text: "text-purple-700" },
    { label: "ELEC", color: "bg-teal-100", text: "text-teal-700" }
  ];
  const ROLES = ["Director", "Manager", "Engineer", "Analyst", "Developer"];
  const STATUSES = ["Good", "Average", "Bad"];
  const NAMES = [
    "Advait Warang", "Yashwant Singh", "Parth Bhalala", "Sharvari", "DK",
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun",
    "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya",
    "Aaradhya", "Ananya", "Diya", "Riya", "Myra",
    "Kiara", "Kriti", "Pari", "Sia", "Zara",
    "Rohan", "Rahul", "Karan", "Siddharth", "Vikram",
    "Neha", "Priya", "Sneha", "Kajal", "Pooja",
    "Raj", "Amit", "Sumit", "Ankit", "Manish",
    "Rani", "Simran", "Kavita", "Sita", "Gita",
    "Sam", "John", "David", "Mike", "Chris"
  ];

  const students = [];
  for (let i = 0; i < 50; i++) {
    let presentCount = 0;
    const attendance = [];
    for (let w = 0; w < 40; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const isPresent = Math.random() > 0.15 ? 1 : 0;
        week.push(isPresent);
        if (isPresent) presentCount++;
      }
      attendance.push(week);
    }
    
    const deptObj = DEPARTMENTS[i % DEPARTMENTS.length];
    const attendancePercentage = Math.round((presentCount / 280) * 100);

    students.push({
      id: `student-${i}`,
      name: NAMES[i],
      role: ROLES[Math.floor(Math.random() * ROLES.length)],
      department: deptObj.label,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      workHours: `${Math.floor(Math.random() * 40) + 10} h`,
      avatar: NAMES[i].includes("Parth") ? "/parth1.png" : DEFAULT_AVATAR,
      badge: "Top Rank",
      badgeType: "green",
      rating: (Math.random() * 1 + 4).toFixed(1),
      achievements: "BCG / XLRI / National Winner Citi Leadership Award'21",
      tags: ["#Consulting", "+11"],
      attendanceGrid: attendance,
      attendancePercentage: attendancePercentage
    });
  }
  return { students, departments: DEPARTMENTS };
};

const DUMMY_DATA = generateDummyStudents();

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return DUMMY_DATA.students;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  }
);

export const fetchStudentProfiles = createAsyncThunk(
  "students/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return DUMMY_DATA.students;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch student profiles");
    }
  }
);

export const fetchDepartmentStats = createAsyncThunk(
  "students/fetchDepartmentStats",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const statsMap = {};
      DUMMY_DATA.students.forEach(s => {
        statsMap[s.department] = (statsMap[s.department] || 0) + 1;
      });

      return DUMMY_DATA.departments.map(dept => ({
        label: dept.label,
        count: statsMap[dept.label] || 0,
        color: dept.color,
        text: dept.text
      }));
    } catch (error) {
      return rejectWithValue("Failed to fetch department stats");
    }
  }
);

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  // Students table data
  list: [],

  // Top student profile cards
  profiles: [],

  // Loading & error tracking
  loading: false,
  profilesLoading: false,
  error: null,
  departmentStats: [],
};

// ============================================================
// SLICE
// ============================================================

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearStudentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchStudents ──
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── fetchStudentProfiles ──
    builder
      .addCase(fetchStudentProfiles.pending, (state) => {
        state.profilesLoading = true;
      })
      .addCase(fetchStudentProfiles.fulfilled, (state, action) => {
        state.profilesLoading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchStudentProfiles.rejected, (state, action) => {
        state.profilesLoading = false;
        state.error = action.payload;
      });

    // ── fetchDepartmentStats ──
    builder
      .addCase(fetchDepartmentStats.pending, (state) => {
        // optionally handle loading
      })
      .addCase(fetchDepartmentStats.fulfilled, (state, action) => {
        state.departmentStats = action.payload;
      })
      .addCase(fetchDepartmentStats.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearStudentsError } = studentsSlice.actions;
export default studentsSlice.reducer;
