import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchFail,
  fetchStart,
  getAllFeedbacksSuccess,
  getSingleFeedbackSuccess,
  getSingleTherapistFeedbacksSuccess,
} from "../features/feedbackSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios, { axiosPublic } from "./useAxios";
import usePaginationCall from "./usePaginationCall";
import { SweetAlertIcons, SweetConfirm, SweetNotify } from "../helper/SweetNotify";

const useFeedbackCall = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  const getAllFeedbacks = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("feedbacks");
      dispatch(getAllFeedbacksSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("feedbackCall.fetchAllFailed")
      );
    }
  };

  const getSingleTherapistFeedbacks = async (therapistId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get(
        `feedbacks/therapists/${therapistId}`
      );
      dispatch(getSingleTherapistFeedbacksSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          t("feedbackCall.fetchTherapistFeedbacksFailed")
      );
    }
  };

  const postTherapistFeedback = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("feedbacks", info);
      SweetNotify(
        t("feedbackCall.postFeedbackSuccess"),
        SweetAlertIcons.SUCCESS
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("feedbackCall.postFeedbackFailed")
      );
    }
  };

  //* Delete feedback
  const deleteFeedback = async (id, userId) => {
    const isConfirmed = await SweetConfirm(
      t("feedbackCall.confirmDeleteFeedbackTitle"),
      t("feedbackCall.confirmDeleteFeedbackText"),
      SweetAlertIcons.WARNING,
      t("yes"),
      t("cancel")
    );
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`feedbacks/${id}`);
      SweetNotify(t("feedbackCall.deleteSuccess"), SweetAlertIcons.WARNING);
      toastSuccessNotify(data?.message || t("feedbackCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("feedbackCall.deleteFailed")
      );
    } finally {
      getDataByPage("feedbacks", "pagFeedbacks", itemsPerPage, currentPage);
    }
  };

  //* Read single feedback
  const getSingleFeedback = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`feedbacks/${id}`);
      dispatch(getSingleFeedbackSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("feedbackCall.fetchDetailsFailed")
      );
    }
  };

  return {
    getAllFeedbacks,
    getSingleTherapistFeedbacks,
    postTherapistFeedback,
    deleteFeedback,
    getSingleFeedback,
  };
};

export default useFeedbackCall;
