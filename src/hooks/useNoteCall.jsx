import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllNotesSuccess,
  createNoteSuccess,
  updateNoteSuccess,
  deleteNoteSuccess,
  getSingleUserNotesSuccess,
} from "../features/noteSlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useNoteCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const getAllNotes = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`notes?userId=${userId}`);
      console.log("Data:", data);
      dispatch(getAllNotesSuccess(data));
    } catch (error) {
      console.log("Hata:", error.response?.data);
      dispatch(fetchFail());
      toastErrorNotify(
        "Notları çekerken hata: " +
          (error.response?.data?.message || "Bilinmeyen hata")
      );
    }
  };
  const getSingleUserNotes = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`notes/user/${userId}`);
      dispatch(getSingleUserNotesSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to fetch Therapist's feedbacks!"
      );
    }
  };

  const createNote = async (noteData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("notes", noteData);
      dispatch(createNoteSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Not oluştururken hata oluştu.");
    }
  };

  const updateNote = async (id, noteData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`notes/${id}`, noteData);
      dispatch(updateNoteSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Not güncellenirken hata oluştu.");
    }
  };

  const deleteNote = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`notes/${id}`);
      dispatch(deleteNoteSuccess(id));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Not silinirken hata oluştu.");
    }
  };

  return {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getSingleUserNotes,
  };
};

export default useNoteCall;
