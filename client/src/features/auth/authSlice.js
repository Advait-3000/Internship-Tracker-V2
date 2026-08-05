import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ============================================================
// DUMMY USERS (for email/password login)
// ============================================================

const DUMMY_USERS = [
  { email: "sadmin@gmail.com", password: "sadmin@123", name: "Super Administrator", role: "SuperAdmin" },
  { email: "advait@gmail.com", password: "pass@123", name: "Advait Warang", role: "Admin" },
  { email: "yashwant@gmail.com", password: "pass@123", name: "Yashwant Singh", role: "Admin" },
  { email: "mentor@gmail.com", password: "pass@123", name: "Rahul Mentor", role: "Mentor" },
  { email: "student@gmail.com", password: "pass@123", name: "Parth Bhalala", role: "Student" },
  { email: "student2@gmail.com", password: "pass@123", name: "Advait Warang", role: "Student" },
  { email: "faculty@gmail.com", password: "pass@123", name: "Prof. Omkar", role: "Faculty", facultyId: "fac-1" },
  // Company accounts
  { email: "tcs@company.com", password: "pass@123", name: "TCS Careers", role: "Company", companyId: "comp-1" },
  { email: "google@company.com", password: "pass@123", name: "Google Careers", role: "Company", companyId: "comp-3" },
  { email: "amazon@company.com", password: "pass@123", name: "Amazon Careers", role: "Company", companyId: "comp-5" },
];

// ============================================================
// ASYNC THUNK — email/password login
// ============================================================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password: _, ...userData } = user;
      return userData;
    }
    return rejectWithValue("Invalid email or password");
  }
);

// ============================================================
// SLICE
// ============================================================

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Instant bypass login — sets role directly (for dev/testing)
    login: (state, action) => {
      const { role } = action.payload;
      state.user = {
        name: `Demo ${role}`,
        email: `demo-${role.toLowerCase()}@aum.edu.in`,
        role,
      };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
