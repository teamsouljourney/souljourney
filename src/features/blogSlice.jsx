import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    filteredBlogs: [],
    singleBlog: {},
    popularBlogs: [],
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
      } else {
        state.blogs = payload.data;
      }
    },
    filterBlogs: (state, { payload }) => {
      state.filteredBlogs = state.blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(payload.toLowerCase()) ||
          blog.categoryId.toLowerCase().includes(payload.toLowerCase())
      );
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
  filterBlogs,
} = blogSlice.actions;

export default blogSlice.reducer;
