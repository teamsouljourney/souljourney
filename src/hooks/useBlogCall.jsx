import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllBlogsSuccess,
  getSingleBlogSuccess,
} from "../features/blogSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useBlogCall = () => {
  const dispatch = useDispatch();
//   const axiosWithToken = useAxios();

  const getAllBlogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("blogs");
      console.log("APIden gelen veriler :", data.data);
      
      dispatch(getAllBlogsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch blogs."
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
        error.response.data.message,
        "Failed to fetch blogs details."
      );
    }
  };


  return { getAllBlogs, getSingleBlog};
};

export default useBlogCall;
