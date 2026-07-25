import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendanceRecords: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceRecords: (state, action) => {
      state.attendanceRecords = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAttendanceRecords, setLoading, setError } = attendanceSlice.actions;
export default attendanceSlice.reducer;
