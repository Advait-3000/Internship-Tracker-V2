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
          name: "Advait Warang",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: "https://i.pravatar.cc/150?img=11",
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          name: "Parth Bhalala",
          badge: "Top Student",
          badgeType: "orange",
          rating: 4.9,
          avatar: "https://i.pravatar.cc/150?img=33",
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          name: "Sahil Panchigar",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: "https://i.pravatar.cc/150?img=14",
          achievements:
            "BCG / XLRI / National Winner Citi Leadership Award'21 / P&G ELP'21 / National Runners-Up..",
          tags: ["#Case Study Competio...", "#Consulting", "+11"],
        },
        {
          name: "Yashwant Singh",
          badge: "Top Rank",
          badgeType: "green",
          rating: 5.1,
          avatar: "https://i.pravatar.cc/150?img=53",
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
  },
});

export const { clearStudentsError } = studentsSlice.actions;
export default studentsSlice.reducer;
