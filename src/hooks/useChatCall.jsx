import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  createChatSuccess,
  fetchFail,
  fetchStart,
  getAllChatsSuccess,
  setSelectedUser,
} from "../features/chatSlice";

const useChatCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //* list all chats

  const getAllChats = async (userId, userModel, chatWithId, chatWithModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}messages?userId=${userId}&userModel=${userModel}&chatWithId=${chatWithId}&chatWithModel=${chatWithModel}`
      );
      console.log(data);
      dispatch(getAllChatsSuccess(data));
      dispatch(setSelectedUser({ chatWithId, chatWithModel }));
      toastSuccessNotify("Chats fetched successfully");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch appointments."
      );
    }
  };

  const createChat = async (messageData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("messages", messageData);
      console.log("chatdata", data);
      dispatch(createChatSuccess(data));
      toastSuccessNotify("Chat created successfully");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    getAllChats,
    createChat,
  };
};

export default useChatCall;
