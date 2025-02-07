import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllNotesSuccess,
} from "../features/noteSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useNoteCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  //* Get All Notes
  const getAllNotes = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("notes");
      dispatch(getAllNotesSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Oops! Something went wrong while fetching notes."
      );
    }
  };

  return {
    getAllNotes,
  };
};

export default useNoteCall;
