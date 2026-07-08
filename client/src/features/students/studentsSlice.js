import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// ============================================================
// ASYNC THUNKS (stubbed with mock data — swap to API later)
// ============================================================

/**
 * Fetches the students list for the data table.
 * TODO: Replace mock return with `await axiosInstance.get('/students')`
 */
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get('/students');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 250));

      return [
        {
          id: 1258,
          name: "Sharvari",
          role: "Director",
          department: "Developer",
          status: "Average",
          workHours: "2.5 h",
        },
        {
          id: 1321,
          name: "Parth",
          role: "Manager",
          department: "Creative",
          status: "Good",
          workHours: "8.5 h",
        },
        {
          id: 1255,
          name: "Dnyaneshwar",
          role: "Engineer",
          department: "IT",
          status: "Average",
          workHours: "3.5 h",
        },
        {
          id: 1158,
          name: "Advait",
          role: "Analyst",
          department: "Finance",
          status: "Bad",
          workHours: "1.5 h",
        },
        {
          id: 1089,
          name: "Yashwant",
          role: "Developer",
          department: "IT",
          status: "Good",
          workHours: "8.75 h",
        },
        {
          id: 1234,
          name: "Anushka",
          role: "Coordinator",
          department: "Marketing",
          status: "Average",
          workHours: "4 h",
        },
        {
          id: 1187,
          name: "Sahil",
          role: "Technician",
          department: "Maintenance",
          status: "Good",
          workHours: "8.5 h",
        },
        {
          id: 1412,
          name: "Daksh",
          role: "Designer",
          department: "Creative",
          status: "Average",
          workHours: "2.5 h",
        },
        {
          id: 1345,
          name: "Shubham",
          role: "Supervisor",
          department: "Operations",
          status: "Bad",
          workHours: "2.25 h",
        },
      ];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students",
      );
    }
  },
);

const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23e2e8f0"/><path d="M12 12.5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%2394a3b8"/></svg>';

/**
 * Fetches top student profile cards (Top Rank / Top Student).
 * TODO: Replace mock return with `await axiosInstance.get('/students/profiles')`
 */
export const fetchStudentProfiles = createAsyncThunk(
  "students/fetchProfiles",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get('/students/profiles');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 200));

      return [
        {
          id: "advait-warang",
          name: "Advait Warang",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: DEFAULT_AVATAR,
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          id: "parth-bhalala",
          name: "Parth Bhalala",
          badge: "Top Student",
          badgeType: "orange",
          rating: 4.9,
          avatar: "/parth1.png",
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          id: "sahil-panchigar",
          name: "Sahil Panchigar",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: DEFAULT_AVATAR,
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          id: "yashwant-singh",
          name: "Yashwant Singh",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: DEFAULT_AVATAR,
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          id: "shubham",
          name: "Shubham",
          badge: "Top Rank",
          badgeType: "orange",
          rating: 4.8,
          avatar: DEFAULT_AVATAR,
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          id: "sharvari",
          name: "Sharvari",
          badge: "Top Student",
          badgeType: "green",
          rating: 5.0,
          avatar: DEFAULT_AVATAR,
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
      ];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch student profiles",
      );
    }
  },
);

/**
 * Fetches department statistics (pill cards).
 */
export const fetchDepartmentStats = createAsyncThunk(
  "students/fetchDepartmentStats",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return [
        { label: 'B.Tech AIDS', count: 80, color: 'bg-blue-100', text: 'text-blue-700' },
        { label: 'AIML', count: 89, color: 'bg-green-100', text: 'text-green-700' },
        { label: 'CSE(Cyber)', count: 56, color: 'bg-orange-100', text: 'text-orange-700' },
        { label: 'COMPS', count: 107, color: 'bg-purple-100', text: 'text-purple-700' },
        { label: 'IT', count: 98, color: 'bg-teal-100', text: 'text-teal-700' },
        { label: 'R & A', count: 3, color: 'bg-blue-100', text: 'text-blue-700' },
        { label: 'EXTC', count: 14, color: 'bg-green-100', text: 'text-green-700' },
        { label: 'Civil', count: 10, color: 'bg-yellow-100', text: 'text-yellow-700' },
        { label: 'ECS', count: 7, color: 'bg-purple-100', text: 'text-purple-700' },
        { label: 'ELEC', count: 15, color: 'bg-teal-100', text: 'text-teal-700' },
      ];
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
