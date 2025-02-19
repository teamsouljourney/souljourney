import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getAllUsersSuccess } = userSlice.actions;
export default userSlice.reducer;
