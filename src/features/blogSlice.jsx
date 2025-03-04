import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    filteredBlogs: [],
    singleBlog: {},
    popularBlogs: [],
    searchTerm: "",
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
      state.blogs = payload;
    },
    getSingleBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleBlog = payload;
    },
    getBlogDataSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload.endpoint === "popularBlogs") {
        state.popularBlogs = payload.data;
      } else if (payload.endpoint === "filteredBlogs") {
        state.filteredBlogs = payload.data;
      } else {
        state.blogs = payload.data;
      }
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
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
  getBlogDataSuccess,
  setSearchTerm,
  filterBlogs,
} = blogSlice.actions;

export default blogSlice.reducer;
