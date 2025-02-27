import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getAllFeedbacksSuccess,
  getSingleTherapistFeedbacksSuccess,
} from "../features/feedbackSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios, { axiosPublic } from "./useAxios";
import usePaginationCall from "./usePaginationCall";

const useFeedbackCall = () => {
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
        error.response.data.message,
        "Failed to fetch all feedbacks!"
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
        error.response.data.message,
        "Failed to fetch Therapist's feedbacks!"
      );
    }
  };

  const postTherapistFeedback = async (info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("feedbacks", info);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to post Therapist's feedbacks!"
      );
    }
  };

  //* Delete appointment
  const deleteFeedback = async (id, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`feedbacks/${id}`);
      toastSuccessNotify(data?.message || "Feedback deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete feedback."
      );
    } finally {
      getDataByPage("feedbacks", "pagFeedbacks", itemsPerPage, currentPage);
    }
  };

  return {
    getAllFeedbacks,
    getSingleTherapistFeedbacks,
    postTherapistFeedback,
    deleteFeedback,
  };
};

export default useFeedbackCall;
