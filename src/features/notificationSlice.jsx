import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: false,
    isRead: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getNotificationSuccess: (state, { payload }) => {
      state.loading = false;
      state.notifications = payload.data;
      state.error = false;
    },
    createNotificationSuccess: (state, { payload }) => {
      state.loading = false;
      state.notes.push(payload.data);
      state.error = false;
    },
    readNotification: (state, { payload }) => {
      state.loading = false;
      state.isRead = payload.data.isRead;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getNotificationSuccess,
  createNotificationSuccess,
  readNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
