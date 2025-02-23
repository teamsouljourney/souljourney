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
    singleUser: null,
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
    getSingleUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleUser = payload;
      state.error = false
    },
    deleteUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== payload);
    },
    setNewUser: (state, { payload }) => {
      state.newUser = { ...state.newUser, ...payload };
    },
    resetNewUser: (state) => {
      state.newUser = {
        userName: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      };
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
  setNewUser,
  resetNewUser,
  toggleModal,
  getSingleUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
