import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",

  initialState: {
    pagUsers: [],
    pagTherapists: [],
    pagCategories: [],
    pagAppointments: [],
    pagBlogs: [],
    pagFeedbacks: [],
    pagFilteredFeedbacks: [],
    pagFilteredBlogs: [],
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getPagDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state[payload.slice] = payload.data;
    },
    setPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getPagDataSuccess, setPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
