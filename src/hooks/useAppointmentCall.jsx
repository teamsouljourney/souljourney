import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import { SweetAlertIcons, SweetConfirm, SweetNotify } from "../helper/SweetNotify";

const useAppointmentCall = () => {
  const { t } = useTranslation();
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
        error.response.data.message || t("appointmentCall.fetchFailed")
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
        error.response.data.message || t("appointmentCall.fetchDetailsFailed")
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
        error.response.data.message || t("appointmentCall.fetchFailed")
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
      SweetNotify(t("appointmentCall.createSuccess"), SweetAlertIcons.SUCCESS);
      // toastSuccessNotify(t("appointmentCall.createSuccess"));
      navigate("/profile/appointment");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("appointmentCall.createFailed")
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
      SweetNotify(t("appointmentCall.updateSuccess"), SweetAlertIcons.SUCCESS);
      // toastSuccessNotify(t("appointmentCall.updateSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("appointmentCall.updateFailed")
      );
    } finally {
      getUserAppointments(userId);
      dispatch(getSingleAppointmentSuccess(null));
    }
  };

  //* Delete appointment
  const deleteAppointment = async (id, userId) => {
    const isConfirmed = await SweetConfirm(
      t("appointmentCall.confirmDeleteAppointmentTitle"),
      t("appointmentCall.confirmDeleteAppointmentText"),
      SweetAlertIcons.WARNING,
      t("yes"),
      t("cancel")
    );
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`appointments/${id}`);
      dispatch(deleteAppointmentSuccess(id));
      SweetNotify(t("appointmentCall.deleteSuccess"), SweetAlertIcons.WARNING);
      // toastSuccessNotify(t("appointmentCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("appointmentCall.deleteFailed")
      );
    } finally {
      getUserAppointments(userId);
      dispatch(getSingleAppointmentSuccess(null));
    }
  };

  //* Delete appointment by Admin
  const deleteAppointmentByAdmin = async (id) => {
    const isConfirmed = await SweetConfirm(
      t("appointmentCall.confirmDeleteAppointmentTitle"),
      t("appointmentCall.confirmDeleteAppointmentByAdminText"),
      SweetAlertIcons.WARNING,
      t("yes"),
      t("cancel")
    );
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`appointments/${id}`);
      SweetNotify(t("appointmentCall.deleteSuccess"), SweetAlertIcons.WARNING);
      // toastSuccessNotify(t("appointmentCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("appointmentCall.deleteFailed")
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
