import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setReports, setLoading, setError } = reportsSlice.actions;
export default reportsSlice.reducer;
