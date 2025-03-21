import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useAxios, { axiosPublic } from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllCategoriesSuccess,
  getSingleCategorySuccess,
} from "../features/categorySlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import usePaginationCall from "./usePaginationCall";
import { SweetAlertIcons, SweetConfirm, SweetNotify } from "../helper/SweetNotify";

const useCategoryCall = () => {
  const { t } = useTranslation();
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
        error.response.data.message || t("categoryCall.fetchFailed")
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
        error.response.data.message || t("categoryCall.fetchDetailsFailed")
      );
    }
  };

  //* Create Category
  const createCategory = async (categoryData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("categories", categoryData);
      toastSuccessNotify(t("categoryCall.createSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("categoryCall.createFailed")
      );
    } finally {
      getDataByPage("categories", "pagCategories", itemsPerPage, currentPage);
    }
  };

  //* Delete Category
  const deleteCategory = async (id) => {
    const isConfirmed = await SweetConfirm(
      t("categoryCall.confirmDeleteCategoryTitle"),
      t("categoryCall.confirmDeleteCategoryText"),
      SweetAlertIcons.WARNING,
      t("yes"),
      t("cancel")
    );
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`categories/${id}`);
      // dispatch(deleteCategorySuccess(id));
      SweetNotify(t("categoryCall.deleteSuccess"), SweetAlertIcons.SUCCESS);
      // toastSuccessNotify(t("categoryCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("categoryCall.deleteFailed")
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
      toastSuccessNotify(t("categoryCall.updateSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("categoryCall.updateFailed")
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
