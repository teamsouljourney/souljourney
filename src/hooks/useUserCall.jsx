import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helper/ToastNotify";
import {
  fetchStart,
  fetchFail,
  getAllUsersSuccess,
  getSingleUserSuccess,
} from "../features/userSlice";
import { deleteUserSuccess } from "../features/userSlice";
import usePaginationCall from "./usePaginationCall";
import { logoutSuccess } from "../features/authSlice";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";

const useUserCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  //* Get All Users
  const getAllUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("users");
      dispatch(getAllUsersSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("userCall.fetchFailed")
      );
    }
  };

  //* Get Single User
  const getSingleUser = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`users/${id}`);
      dispatch(getSingleUserSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("userCall.fetchDetailsFailed")
      );
    }
  };

  //* Create User
  const createUser = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("users", userData);
      toastSuccessNotify(t("userCall.createSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("userCall.createFailed")
      );
    } finally {
      getDataByPage("users", "pagUsers", itemsPerPage, currentPage);
    }
  };

  //* Delete User
  const deleteUser = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`users/${id}`);
      dispatch(deleteUserSuccess(id));
      toastSuccessNotify(t("userCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.deleteFailed")
      );
    } finally {
      getDataByPage("users", "pagUsers", itemsPerPage, currentPage);
    }
  };

  //* Update User
  const updateUser = async (id, updatedUser) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}`, updatedUser);
      toastSuccessNotify(t("userCall.updateSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.updateFailed")
      );
    } finally {
      getDataByPage("users", "pagUsers", itemsPerPage, currentPage);
    }
  };

  //* Update User's own profile
  const updateMe = async (id, updatedUser) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, updatedUser);
      SweetNotify(t("userCall.profileUpdateSuccess"), SweetAlertIcons.SUCCESS);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.profileUpdateFailed")
      );
    } finally {
      getSingleUser(id);
    }
  };

  //* Change User Status
  const changeUserStatus = async (id, isActive) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/status`);
      toastSuccessNotify(
        isActive ? t("userCall.userDisabled") : t("userCall.userActivated")
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.statusChangeFailed")
      );
    } finally {
      getDataByPage("users", "pagUsers", itemsPerPage, currentPage);
    }
  };

  //* Change User's Own Status
  const changeMyStatus = async (id, isActive) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/status`);
      SweetNotify(t("userCall.accountInactive"), SweetAlertIcons.WARNING);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.accountStatusChangeFailed")
      );
    } finally {
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
      navigate("/");
    }
  };

  //* Change User's Own Password
  const changeMyPassword = async (id, values) => {
    dispatch(fetchStart());
    try {
      navigate("/");
      await axiosWithToken.patch(`users/${id}/changeMyPassword`, values);
      SweetNotify(t("userCall.passwordChangeSuccess"), SweetAlertIcons.SUCCESS);
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("userCall.passwordChangeFailed")
      );
    }
  };

  return {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    updateMe,
    changeUserStatus,
    changeMyStatus,
    changeMyPassword,
  };
};

export default useUserCall;
