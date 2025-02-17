import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllBlogsSuccess,
  getSingleBlogSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const getAllBlogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("blogs");
      console.log("APIden gelen veriler :", data.data);
      dispatch(getAllBlogsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch blogs."
      );
    }
  };

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`blogs/${id}`);
      dispatch(getSingleBlogSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch blog details."
      );
    }
  };

  const createNewBlog = async (blogData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("blogs", blogData);
      toastSuccessNotify("Blog created successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to create blog."
      );
    } finally {
      getAllBlogs();
    }
  };

  const updateBlog = async (id, blogData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`blogs/${id}`, blogData);
      toastSuccessNotify("Blog updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update blog."
      );
    } finally {
      getAllBlogs();
    }
  };

  return { getAllBlogs, getSingleBlog, createNewBlog, updateBlog };
};

export default useBlogCall;
