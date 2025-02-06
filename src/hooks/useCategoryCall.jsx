import { useDispatch } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllCategoriesSuccess,
  getSingleCategorySuccess,
} from "../features/categorySlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useCategoryCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  //* Get All Categories
  const getAllCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("categories");
      dispatch(getAllCategoriesSuccess(data));
      toastSuccessNotify("Categories fetched successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong while fetching categories."
      );
    }
  };

  //* Get Single Category
  const getSingleCategory = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`categories/${id}`);
      dispatch(getSingleCategorySuccess(data));
      toastSuccessNotify("Category fetched successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong while fetching the category."
      );
    }
  };

  return {
    getAllCategories,
    getSingleCategory,
  };
};

export default useCategoryCall;
