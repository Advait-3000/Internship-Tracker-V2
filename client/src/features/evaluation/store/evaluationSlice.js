import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  evaluations: [],
  loading: false,
  error: null,
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setEvaluations: (state, action) => {
      state.evaluations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEvaluations, setLoading, setError } = evaluationSlice.actions;
export default evaluationSlice.reducer;
