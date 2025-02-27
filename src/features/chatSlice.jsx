import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",

  initialState: {
    chats: [],
    selectedUser: null,
    loading: false,
    error: false,
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
      state.chats = [...state.chats, payload.data];
      state.error = false;
    },
    setSelectedUser: (state, { payload }) => {
      state.loading = false;
      state.selectedUser = payload;
      state.error = false;
      console.log("selecteduserPayload", payload);
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
  getAllChatsSuccess,
  setSelectedUser,
  createChatSuccess,
} = chatSlice.actions;

export default chatSlice.reducer;
