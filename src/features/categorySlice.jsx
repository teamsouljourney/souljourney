import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    singleCategory: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
      state.error = false;
    },
    getSingleCategorySuccess: (state, { payload }) => {
      state.loading = false;
      state.singleCategory = payload.data;
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
  getAllCategoriesSuccess,
  getSingleCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
