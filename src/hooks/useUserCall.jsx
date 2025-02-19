import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchStart,
  fetchFail,
  getAllUsersSuccess,
} from "../features/userSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useUserCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

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

  return {
    getAllUsers,
  };
};

export default useUserCall;
