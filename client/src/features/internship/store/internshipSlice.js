import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  internships: [],
  selectedInternship: null,
  loading: false,
  error: null,
};

const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    setInternships: (state, action) => {
      state.internships = action.payload;
    },
    setSelectedInternship: (state, action) => {
      state.selectedInternship = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setInternships, setSelectedInternship, setLoading, setError } = internshipSlice.actions;
export default internshipSlice.reducer;
