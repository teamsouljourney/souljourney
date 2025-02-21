import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchStart,
  fetchFail,
  getAllUsersSuccess,
} from "../features/userSlice";
import { deleteUserSuccess } from "../features/userSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useUserCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

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
      getAllUsers();
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
      getAllUsers();
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
      getAllUsers();
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
      getAllUsers();
    }
  };

  return {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    changeUserStatus,
  };
};

export default useUserCall;
