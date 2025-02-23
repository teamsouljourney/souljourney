import useAxios, { axiosPublic } from "./useAxios";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  getAllChatsSuccess,
} from "../features/chatSlice";

const useChatCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

  //* list all chats

  const getAllChats = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("chats");
      console.log(data);
      dispatch(getAllChatsSuccess(data));
      toastSuccessNotify("Chats fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch appointments."
      );
    }
  };

  return {
    getAllChats,
  };
};

export default useChatCall;
