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
import { logoutSuccess } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const useTherapistCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
  //* Create Therapist
    const createTherapist = async (therapistData) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.post("therapists", therapistData);
        toastSuccessNotify(
          "Therapist created successfully! Please check email to verify that account!"
        );
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(error.response.data.message, "Failed to create therapist.");
      } finally {
        getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
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

    //* Update Therapist's own profile 
      const updateMeTherapist = async (id, updatedTherapist) => {
        dispatch(fetchStart());
        try {
          await axiosWithToken.patch(`therapists/${id}/updateMe`, updatedTherapist);
          toastSuccessNotify("Your profile updated successfully!");
        } catch (error) {
          dispatch(fetchFail());
          toastErrorNotify(
            error.response?.data?.message || "Failed to update your profile."
          );
        } finally {
          getSingleTherapist(id)
        }
      };

    //* Change Therapist Status
    const changeTherapistStatus = async (id, isActive) => {
      dispatch(fetchStart());
      try {
        await axiosWithToken.patch(`therapists/${id}/status`);
        toastSuccessNotify(
          `Therapist ${isActive ? "disabled" : "activated"} successfully!`
        );
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(
          error.response?.data?.message || "Failed to change therapist status."
        );
      } finally {
        getDataByPage("therapists", "pagTherapists", itemsPerPage, currentPage);
      }
    };

    //* Change Therapist's Own Password
    const changeMyPasswordTherapist = async (id, values) => {
      dispatch(fetchStart());
      try {
        await axiosWithToken.patch(`therapists/${id}changeMyPassword`, values);
        toastSuccessNotify("Your password has been changed!");
      } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify(
          error.response?.data?.message || "Failed to change your password."
        );
      } finally {
        await axiosWithToken.get("auth/logout");
        dispatch(logoutSuccess());
          navigate("/")
      }
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
    changeMyPasswordTherapist
  };
};

export default useTherapistCall;
