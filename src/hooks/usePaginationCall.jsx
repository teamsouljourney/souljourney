import useAxios, { axiosPublic } from "./useAxios";
import { useDispatch } from "react-redux";
import { toastErrorNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  getPagDataSuccess,
} from "../features/paginationSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const usePaginationCall = () => {
  const dispatch = useDispatch();

  const getDataByPage = async (endpoint, slice, limit, page, query = "") => {
    dispatch(fetchStart());
    try {
      const queryString = query ? `&${query}` : "";
      const { data } = await axiosPublic.get(
        `${BASE_URL}${endpoint}?limit=${limit}&page=${page}${queryString}`
      );
      dispatch(getPagDataSuccess({ slice, data: data.data }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || `Failed to fetch ${endpoint}.`
      );
    }
  };

  return {
    getDataByPage,
  };
};

export default usePaginationCall;
