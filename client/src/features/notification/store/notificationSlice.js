import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setNotifications, setLoading } = notificationSlice.actions;
export default notificationSlice.reducer;
