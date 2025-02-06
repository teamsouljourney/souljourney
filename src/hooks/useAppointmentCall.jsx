import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  createAppointmentSuccess,
} from "../features/appointmentSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAppointmentCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  //* Create appointment
  const createAppointment = async (appointmentData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        "appointments",
        appointmentData
      );
      dispatch(createAppointmentSuccess(data));
      toastSuccessNotify("Appointment created successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during appointment creation."
      );
    }
  };

  return {
    createAppointment,
  };
};

export default useAppointmentCall;
