import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",

  initialState: {
    chats: [],
    selectedUser: null,
    loading: false,
    error: false,
    socket: null,
    isConnected: false,
    onlineUsers: [],
    userStatuses: {},
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllChatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.chats = payload.data;
      state.error = false;
    },
    createChatSuccess: (state, { payload }) => {
      state.loading = false;

      // Check if this message already exists (by ID or temp ID)
      const messageExists = state.chats.some(
        (chat) => chat._id === payload.data._id
      );

      if (!messageExists) {
        // Add the new message to the chat list
        state.chats = [...state.chats, payload.data];
      } else {
        // Replace the temporary message with the real one
        state.chats = state.chats.map((chat) =>
          chat._id === payload.data._id ? payload.data : chat
        );
      }

      state.error = false;
    },
    setSelectedUser: (state, { payload }) => {
      state.loading = false;
      state.selectedUser = payload;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Socket related reducers
    setSocket: (state, { payload }) => {
      state.socket = payload;
    },
    setSocketConnected: (state, { payload }) => {
      state.isConnected = payload;
    },
    receiveMessage: (state, { payload }) => {
      const messageExists = state.chats.some(
        (chat) => chat._id === payload._id
      );

      if (!messageExists) {
        state.chats = [...state.chats, state.isConnected, payload];
      }
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setUserConnected: (state, action) => {
      const { userId, isOnline } = action.payload;
      state.userStatuses[userId] = isOnline;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getAllChatsSuccess,
  setSelectedUser,
  createChatSuccess,
  setSocket,
  setSocketConnected,
  receiveMessage,
  updateOnlineUsers,
  setUserConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
