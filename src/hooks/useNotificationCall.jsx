import { useDispatch } from "react-redux";
import {
  fetchStart,
  getNotificationSuccess,
} from "../features/notificationSlice";
import useAxios from "./useAxios";

const useNotificationCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getNotifications = async (
    userId,
    userModel,
    recieverNotId,
    recieverNotModel
  ) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${BASE_URL}notifications?userId=${userId}&userModel=${userModel}&recieverNotId=${recieverNotId}&recieverNotModel=${recieverNotModel}`
      );
      dispatch(getNotificationSuccess(data));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getNotifications,
  };
};

export default useNotificationCall;
