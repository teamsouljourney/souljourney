import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    filteredCategories: [],
    selectedCategory:"67a47623b6da7c1f2119462e",
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
    setSelectedCategory:(state, {payload})=>{
      state.selectedCategory=payload
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
  setSelectedCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
