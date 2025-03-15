import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [], // Make sure this is initialized as an empty array
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getAllNotificationSuccess: (state, { payload }) => {
      state.loading = false;
      // Ensure payload is an array and only include unread notifications
      state.notifications = Array.isArray(payload)
        ? payload.filter((n) => !n.isRead)
        : [];
    },
    getNotificationSuccess: (state, { payload }) => {
      state.loading = false;
      // Ensure payload is an array and only include unread notifications
      state.notifications = Array.isArray(payload)
        ? payload.filter((n) => !n.isRead)
        : [];
    },
    createNotificationSuccess: (state, { payload }) => {
      state.loading = false;
      // Ensure notifications is an array before attempting to spread it
      const currentNotifications = Array.isArray(state.notifications)
        ? state.notifications
        : [];

      // Check if notification already exists to avoid duplicates
      const exists = currentNotifications.some((n) => n._id === payload._id);
      if (!exists && payload) {
        state.notifications = [...currentNotifications, payload];
      }
    },
    // Add this reducer to handle real-time notifications
    receiveNewNotification: (state, { payload }) => {
      // Ensure notifications is an array
      const currentNotifications = Array.isArray(state.notifications)
        ? state.notifications
        : [];

      // Check if notification already exists to avoid duplicates
      const exists = currentNotifications.some((n) => n._id === payload._id);
      if (!exists && payload && !payload.isRead) {
        state.notifications = [...currentNotifications, payload];
      }
    },
    // Add this reducer to remove a notification from state
    removeNotification: (state, { payload }) => {
      if (Array.isArray(state.notifications)) {
        state.notifications = state.notifications.filter(
          (notification) => notification._id !== payload
        );
      }
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getAllNotificationSuccess,
  getNotificationSuccess,
  createNotificationSuccess,
  receiveNewNotification,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
