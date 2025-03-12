import { useDispatch } from "react-redux";
import {
  createNotificationSuccess,
  fetchFail,
  fetchStart,
  getNotificationSuccess,
} from "../features/notificationSlice";
import useAxios from "./useAxios";
import { CleanHands } from "@mui/icons-material";

const useNotificationCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getNotifications = async (recieverId, recieverModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}notifications?recieverId=${recieverId}&recieverModel=${recieverModel}`
      );
      dispatch(getNotificationSuccess(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch(fetchFail());
    }
  };

  const createNotification = async (notificationData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${BASE_URL}notifications`,
        notificationData
      );
      dispatch(createNotificationSuccess(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch(fetchFail());
    }
  };

  const markAsRead = async (notificationId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${BASE_URL}notifications/${notificationId}`
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  return {
    getNotifications,
    createNotification,
    markAsRead,
  };
};

export default useNotificationCall;
