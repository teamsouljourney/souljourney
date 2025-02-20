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

  //* Delete User
  const deleteUser = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`appointments/${id}`);
      dispatch(deleteUserSuccess(id));
      toastSuccessNotify("Appointment deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete appointment."
      );
    } finally {
      getAllUsers();
    }
  };

  return {
    getAllUsers,
    deleteUser,
  };
};

export default useUserCall;
