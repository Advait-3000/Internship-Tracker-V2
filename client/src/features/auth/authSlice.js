import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const DUMMY_USERS = [
  { email: 'advait@gmail.com', password: 'pass@123', name: 'Advait' },
  { email: 'yashwant@gmail.com', password: 'pass@123', name: 'Yashwant' },
  { email: 'sharvari@gmail.com', password: 'pass@123', name: 'Sharvari' },
  { email: 'dk@gmail.com', password: 'pass@123', name: 'DK' },
];

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      // Don't store password in state
      const { password, ...userData } = user;
      return userData;
    }
    
    return rejectWithValue('Invalid email or password');
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* Keep these for later when backend is connected
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
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
  }
});

// export const { signInStart, signInSuccess, signInFailure, logout } = authSlice.actions;
export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
