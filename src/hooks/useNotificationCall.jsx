import { useDispatch } from "react-redux";
import {
  createNotificationSuccess,
  fetchFail,
  fetchStart,
  getAllNotificationSuccess,
  getNotificationSuccess,
} from "../features/notificationSlice";
import useAxios from "./useAxios";

const useNotificationCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getAllNotifications = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${BASE_URL}notifications`);
      dispatch(getAllNotificationSuccess(data));
      console.log(data);
    } catch (error) {
      console.error(error);
      dispatch(fetchFail());
    }
  };

  const getNotifications = async (id, recieverId, recieverModel) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}notifications/${id}?recieverId=${recieverId}&recieverModel=${recieverModel}`
      );
      id;
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
    getAllNotifications,
    createNotification,
    markAsRead,
  };
};

export default useNotificationCall;
