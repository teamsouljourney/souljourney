import { useDispatch, useSelector } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllCategoriesSuccess,
  getSingleCategorySuccess,
} from "../features/categorySlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import usePaginationCall from "./usePaginationCall";

const useCategoryCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  //* Get All Categories
  const getAllCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("categories");
      dispatch(getAllCategoriesSuccess(data));
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
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong while fetching the category."
      );
    }
  };

  //* Create Category
  const createCategory = async (categoryData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("categories", categoryData);
      toastSuccessNotify("Category created successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to create category."
      );
    } finally {
      getDataByPage("categories", "pagCategories", itemsPerPage, currentPage);
    }
  };

  //* Delete Category
  const deleteCategory = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`categories/${id}`);
      // dispatch(deleteCategorySuccess(id));
      toastSuccessNotify("Category deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete category."
      );
    } finally {
      getDataByPage("categories", "pagCategories", itemsPerPage, currentPage);
    }
  };

  //* Update Category
  const updateCategory = async (id, updatedCategory) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`categories/${id}`, updatedCategory);
      toastSuccessNotify("Category updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update category."
      );
    } finally {
      getDataByPage("categories", "pagCategories", itemsPerPage, currentPage);
    }
  };

  return {
    getAllCategories,
    getSingleCategory,
    createCategory,
    deleteCategory,
    updateCategory,
  };
};

export default useCategoryCall;
