import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchFail,
  createAppointmentSuccess,
  getSingleAppointmentSuccess,
  getAllAppointmentsSuccess,
  updateAppointmentSuccess,
  deleteAppointmentSuccess,
  getCurrentUserAppointmentsSuccess,
} from "../features/appointmentSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { setSelectedSlot } from "../features/calendarSlice";
import useTherapistCall from "./useTherapistCall";
import { useNavigate } from "react-router-dom";
import usePaginationCall from "./usePaginationCall";

const useAppointmentCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();
  const { getTherapistTimeTable } = useTherapistCall();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  //* List Appointments
  const getAllAppointments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("appointments");
      dispatch(getAllAppointmentsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch appointments."
      );
    }
  };

  //* Read Appointment
  const getSingleAppointment = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`appointments/${id}`);
      dispatch(getSingleAppointmentSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch appointment details."
      );
    }
  };

  //* Get Users or Therapists Appintments
  const getUserAppointments = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`appointments/user/${id}`);
      dispatch(getCurrentUserAppointmentsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch appointments."
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
      dispatch(setSelectedSlot(null));
      // dispatch(setSelectedDate(null));
      toastSuccessNotify("Appointment created successfully!");
      navigate("/profile/appointment");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong during appointment creation."
      );
    } finally {
      getTherapistTimeTable(appointmentData.therapistId);
    }
  };

  //* Update appointment
  const updateAppointment = async (id, updatedData, userId) => {
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
    } finally {
      getUserAppointments(userId);
      dispatch(getSingleAppointmentSuccess(null));
    }
  };

  //* Delete appointment
  const deleteAppointment = async (id, userId) => {
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
    } finally {
      getUserAppointments(userId);
      dispatch(getSingleAppointmentSuccess(null));
    }
  };

  //* Delete appointment by Admin
  const deleteAppointmentByAdmin = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`appointments/${id}`);
      toastSuccessNotify("Appointment deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete appointment."
      );
    } finally {
      getDataByPage(
        "appointments",
        "pagAppointments",
        itemsPerPage,
        currentPage
      );
    }
  };

  return {
    getAllAppointments,
    getUserAppointments,
    getSingleAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    deleteAppointmentByAdmin,
  };
};

export default useAppointmentCall;
