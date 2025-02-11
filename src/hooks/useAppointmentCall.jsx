import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  createAppointmentSuccess,
  getAllAppointmentsSuccess,
  updateAppointmentSuccess,
  deleteAppointmentSuccess,
} from "../features/appointmentSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAppointmentCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  //* List Appointments
  const getAllAppointments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("therapists");
      dispatch(getAllAppointmentsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch therapists."
      );
    }
  };

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

  //* Update appointment
  const updateAppointment = async (id, updatedData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `appointments/${id}`,
        updatedData
      );
      dispatch(updateAppointmentSuccess(data));
      toastSuccessNotify("Appointment updated successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to update appointment."
      );
    }
  };

  //* Delete appointment
  const deleteAppointment = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`appointments/${id}`);
      dispatch(deleteAppointmentSuccess(id));
      toastSuccessNotify("Appointment deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete appointment."
      );
    }
  };

  return {
    getAllAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointmentCall;
