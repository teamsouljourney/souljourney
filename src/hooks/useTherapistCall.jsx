import useAxios, { axiosPublic } from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
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

const useTherapistCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );
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

  //* Delete Therapist
    const deleteTherapist = async (id) => {
      dispatch(fetchStart());
      try {
        await axiosWithToken.delete(`therapists/${id}`);
        toastSuccessNotify("Therapist deleted successfully!");
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(
          error.response?.data?.message || "Failed to delete therapists."
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
        toastSuccessNotify("Therapist updated successfully!");
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(
          error.response?.data?.message || "Failed to update therapists."
        );
      } finally {
        getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
      }
    };


  return { 
    getAllTherapists, 
    getSingleTherapist, 
    getTherapistTimeTable, 
    getFilterTherapists,
    deleteTherapist,
    updateTherapist
  };
};

export default useTherapistCall;
