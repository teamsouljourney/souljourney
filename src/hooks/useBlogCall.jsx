import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllBlogsSuccess,
  getSingleBlogSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import usePaginationCall from "./usePaginationCall";

const useBlogCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  const getAllBlogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("blogs");
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

  //* Delete Blog
  const deleteBlog = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`blogs/${id}`);
      toastSuccessNotify("Blog deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete blog.."
      );
    } finally {
      getDataByPage("blogs", "pagBlogs", itemsPerPage, currentPage);
    }
  };

  //* Get Like Info
  const getLikeInfo = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`blogs/${id}/likes`);
      return data.likes;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to fetch like info."
      );
    }
  };

  //* Add - Remove Like
  const postLike = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`blogs/${id}/likes`);
      toastSuccessNotify("Like updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update like."
      );
    } finally {
      getAllBlogs();
    }
  };

  return {
    getAllBlogs,
    getSingleBlog,
    createNewBlog,
    updateBlog,
    deleteBlog,
    getLikeInfo,
    postLike,
  };
};

export default useBlogCall;
