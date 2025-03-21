import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchStart,
  fetchFail,
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
  getTherapistTimeTableSuccess,
  getFilterTherapistsSuccess,
} from "../features/therapistSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import usePaginationCall from "./usePaginationCall";
import { logoutSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { SweetAlertIcons, SweetConfirm, SweetNotify } from "../helper/SweetNotify";

const useTherapistCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  const getAllTherapists = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("therapists");
      dispatch(getAllTherapistsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("therapistCall.fetchFailed")
      );
    }
  };

  const getSingleTherapist = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`therapists/${id}`);
      dispatch(getSingleTherapistSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("therapistCall.fetchDetailsFailed")
      );
    }
  };

  const getTherapistTimeTable = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(`therapist-time-tables/${id}`);
      dispatch(getTherapistTimeTableSuccess(data?.data?.unavailableDates));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("therapistCall.fetchTimeTableFailed")
      );
    }
  };

  const getFilterTherapists = async (categoryId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(
        `therapists?category=${categoryId}`
      );
      dispatch(getFilterTherapistsSuccess(data?.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("therapistCall.fetchFilteredFailed")
      );
    }
  };

  //* Create Therapist
  const createTherapist = async (therapistData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("therapists", therapistData);
      toastSuccessNotify(t("therapistCall.createSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("therapistCall.createFailed")
      );
    } finally {
      getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
    }
  };

  //* Delete Therapist
  const deleteTherapist = async (id) => {
    const isConfirmed = await SweetConfirm(
      t("therapistCall.confirmDeleteAccountTitle"),
      t("therapistCall.confirmDeleteAccountText"),
      SweetAlertIcons.WARNING,
      t("yes"),
      t("cancel")
    );
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`therapists/${id}`);
      toastSuccessNotify(t("therapistCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("therapistCall.deleteFailed")
      );
    } finally {
      getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
    }
  };

  //* Update Therapist
  const updateTherapist = async (id, updatedTherapist) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`therapists/${id}`, updatedTherapist);
      toastSuccessNotify(t("therapistCall.updateSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("therapistCall.updateFailed")
      );
    } finally {
      getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
    }
  };

  //* Update Therapist's own profile
  const updateMeTherapist = async (id, updatedTherapist) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`therapists/${id}/updateMe`, updatedTherapist);
      SweetNotify(
        t("therapistCall.profileUpdateSuccess"),
        SweetAlertIcons.SUCCESS
      );
      // toastSuccessNotify(t("therapistCall.profileUpdateSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("therapistCall.profileUpdateFailed")
      );
    } finally {
      getSingleTherapist(id);
    }
  };

  //* Change Therapist Status
  const changeTherapistStatus = async (id, isActive) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`therapists/${id}/status`);
      toastSuccessNotify(
        isActive
          ? t("therapistCall.therapistDisabled")
          : t("therapistCall.therapistActivated")
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("therapistCall.statusChangeFailed")
      );
    } finally {
      getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
    }
  };

  //* Change Therapist's Own Password
  const changeMyPasswordTherapist = async (id, values) => {
    dispatch(fetchStart());
    try {
      navigate("/");
      await axiosWithToken.patch(`therapists/${id}/changeMyPassword`, values);
      SweetNotify(
        t("therapistCall.passwordChangeSuccess"),
        SweetAlertIcons.SUCCESS
      );
      // toastSuccessNotify(t("therapistCall.passwordChangeSuccess"));
      await axiosWithToken.get("auth/logout");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("therapistCall.passwordChangeFailed")
      );
    }
  };

  //* Upload Profile Picture
  const uploadProfilePictureTherapist = async (id, imageFile) => {
    dispatch(fetchStart());

    const formData = new FormData();
    formData.append("image", imageFile);

    let response;

    try {
      response = await axiosWithToken.post(
        `therapists/${id}/upload-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      SweetNotify(
        t("therapistCall.profilePictureUploaded"),
        SweetAlertIcons.SUCCESS
      );
      // toastSuccessNotify(t("therapistCall.profilePictureUploaded"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message ||
          t("therapistCall.profilePictureUploadFailed")
      );
    } finally {
      getSingleTherapist(id);
    }

    return response;
  };

  return {
    getAllTherapists,
    getSingleTherapist,
    getTherapistTimeTable,
    getFilterTherapists,
    deleteTherapist,
    updateTherapist,
    updateMeTherapist,
    changeTherapistStatus,
    createTherapist,
    changeMyPasswordTherapist,
    uploadProfilePictureTherapist,
  };
};

export default useTherapistCall;
