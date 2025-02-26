import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";
import {
  fetchStart,
  fetchFail,
  getAllUsersSuccess,
  getSingleUserSuccess,
} from "../features/userSlice";
import { deleteUserSuccess } from "../features/userSlice";
import usePaginationCall from "./usePaginationCall";
import useAuthCall from "./useAuthCall";
import { logoutSuccess } from "../features/authSlice";

const useUserCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const {logout} = useAuthCall()
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
      toastErrorNotify(error.response.data.message, "Failed to fetch users.");
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
      toastErrorNotify(error.response.data.message, "Failed to fetch the user.");
    }
  };

  //* Create User
  const createUser = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("users", userData);
      toastSuccessNotify(
        "User created successfully! Please check email to verify that account!"
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.response.data.message, "Failed to create user.");
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
      toastSuccessNotify("User deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete users."
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
      toastSuccessNotify("User updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update users."
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
      toastSuccessNotify("Your profile updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update your profile."
      );
    }
  };

  //* Change User Status
  const changeUserStatus = async (id, isActive) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/status`);
      toastSuccessNotify(
        `User ${isActive ? "disabled" : "activated"} successfully!`
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to change user status."
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
      toastWarnNotify(
        " Your account is currently inactive. If you'd like to work with us again, please contact the SoulJourney team. We'd be delighted to welcome you back! 😊"
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to change your account status."
      );
    } finally {
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
      navigate("/")
    }
  };

  //* Change User's Own Password
  const changeMyPassword = async (id, values) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/changeMyPassword`);
      toastSuccessNotify("Your password has been changed!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to change your password."
      );
    } finally {
      
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
    changeMyPassword
  };
};

export default useUserCall;
