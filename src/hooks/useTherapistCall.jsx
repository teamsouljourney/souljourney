import { axiosPublic } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
} from "../features/therapistSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useTherapistCall = () => {
  const dispatch = useDispatch();

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

  return { getAllTherapists, getSingleTherapist };
};

export default useTherapistCall;
