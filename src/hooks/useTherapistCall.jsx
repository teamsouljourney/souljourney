import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
  getTherapistTimeTableSuccess,
  getFilterTherapistsSuccess,
} from "../features/therapistSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useTherapistCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const getAllTherapists = async () => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic.get("therapists");

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
      const { data } = await axiosWithToken.get(`therapist-time-tables/${id}`);
      dispatch(getTherapistTimeTableSuccess(data?.data?.unavailableDates));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch therapist time table."
      );
    }
  };
  const getFilterTherapists = async (categoryId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`therapists?category=${categoryId}`);
      dispatch(getFilterTherapistsSuccess(data?.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch filtered therapist"
      );
    }
  };


  return { 
    getAllTherapists, 
    getSingleTherapist, 
    getTherapistTimeTable, 
    getFilterTherapists 
  };
};

export default useTherapistCall;
