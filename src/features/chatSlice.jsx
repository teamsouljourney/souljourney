import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",

  initialState: {
    chats: [],
    singleChat: null,
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
    // getSingleChatCSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.singleChat = payload.data;
    //   state.error = false;
    // },
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
  getSingleChatSuccess,
} = chatSlice.actions;

export default chatSlice.reducer;
