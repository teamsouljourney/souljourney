import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllBlogsSuccess: (state, { payload }) => {
      state.loading = false;
      state.therapists = payload;
    },
    getSingleBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleTherapist = payload;
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
  getAllBlogsSuccess,
  getSingleBlogSuccess,
} = blogSlice.actions;

export default blogSlice.reducer;
