import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",

  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
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

export const { fetchStart, fetchFail, setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
