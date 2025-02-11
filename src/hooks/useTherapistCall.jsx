import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
  getTherapistTimeTableSuccess,
} from "../features/therapistSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useTherapistCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const getAllTherapists = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.get("therapists");
      dispatch(getAllTherapistsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch therapists."
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
        error.response.data.message,
        "Failed to fetch therapist details."
      );
    }
  };

  const getTherapistTimeTable = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`therapists-time-tables/${id}`);
      dispatch(getTherapistTimeTableSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch therapist time table."
      );
    }
  };
  return { getAllTherapists, getSingleTherapist, getTherapistTimeTable };
};

export default useTherapistCall;
