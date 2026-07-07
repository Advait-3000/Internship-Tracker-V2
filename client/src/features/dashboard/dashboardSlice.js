import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// ============================================================
// ASYNC THUNKS (stubbed with mock data — swap to API later)
// ============================================================

/**
 * Fetches dashboard stats (stat cards + system status).
 * TODO: Replace mock return with `await axiosInstance.get('/dashboard/stats')`
 */
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get('/dashboard/stats');
      // return response.data;

      // Mock delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        systemStatus: {
          status: "Active",
          activeSessions: 25,
        },
        stats: [
          {
            title: "Total Students",
            value: "2,564",
            subtext: "12 Added Today",
            isUp: true,
          },
          {
            title: "Active Internships",
            value: "1,923",
            subtext: "15 New",
            isUp: true,
          },
          {
            title: "Completed Internships",
            value: "641",
            subtext: "2 Completed",
            isUp: false,
          },
          {
            title: "Companies",
            value: "86",
            subtext: "4 New Arrives",
            isUp: true,
          },
          {
            title: "Pending Reports",
            value: "173",
            subtext: "2 Completed",
            isUp: false,
          },
          {
            title: "Pending Reviews",
            value: "94",
            subtext: "2 less than yesterday",
            isUp: true,
          },
        ],
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats",
      );
    }
  },
);

/**
 * Fetches chart datasets (Report Submission line chart + Internship Status donut chart).
 * TODO: Replace mock return with `await axiosInstance.get('/dashboard/charts')`
 */
export const fetchChartData = createAsyncThunk(
  "dashboard/fetchChartData",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get('/dashboard/charts');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 200));

      return {
        reportSubmission: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: {
            computer: {
              color: "#3B82F6",
              label: "Computer",
              points: [55, 42, 65, 48, 55, 82, 72],
            },
            it: {
              color: "#F43F5E",
              label: "IT",
              points: [48, 52, 58, 42, 48, 88, 78],
            },
            extc: {
              color: "#06B6D4",
              label: "EXTC",
              points: [30, 38, 48, 44, 42, 58, 62],
            },
          },
        },
        internshipStatus: {
          computer: 75,
          it: 55,
          extc: 40,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch chart data",
      );
    }
  },
);

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  // System overview
  systemStatus: {
    status: "Active",
    activeSessions: 0,
  },

  // 6 stat cards
  stats: [],

  // Report Submission line chart
  reportSubmission: {
    labels: [],
    datasets: {},
  },

  // Internship Status donut chart
  internshipStatus: {
    computer: 0,
    it: 0,
    extc: 0,
  },

  // Loading & error tracking
  loading: false,
  chartsLoading: false,
  error: null,
};

// ============================================================
// SLICE
// ============================================================

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchDashboardStats ──
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.systemStatus = action.payload.systemStatus;
        state.stats = action.payload.stats;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── fetchChartData ──
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.chartsLoading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartsLoading = false;
        state.reportSubmission = action.payload.reportSubmission;
        state.internshipStatus = action.payload.internshipStatus;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.chartsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
