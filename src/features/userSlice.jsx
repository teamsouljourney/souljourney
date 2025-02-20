import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    newUser: {
      userName: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    loading: false,
    error: false,
    isModalOpen: false,
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
    deleteUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== payload);
    },
    toggleModal: (state, { payload }) => {
      state.isModalOpen = payload;
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
  getAllUsersSuccess,
  deleteUserSuccess,
  toggleModal,
} = userSlice.actions;
export default userSlice.reducer;
