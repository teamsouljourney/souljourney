import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllNotesSuccess,
  getSingleUserNotesSuccess,
} from "../features/noteSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

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

  const postUserNotes = async (noteData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("notes", noteData);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message,
        "Failed to post Users's notes!"
      );
    }
  };

  const putUserNote = async (id, noteData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`notes/${id}`, noteData);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.response.data.message,
        "Not güncellenirken hata oluştu.");
    } 
  };

  const deleteNote = async (id,userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`notes/${id}`);
      toastSuccessNotify(data?.message || "Note deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || "Failed to delete note."
      );
    } finally {
      getSingleUserNotes(userId)
    }
  };

  return {
    getAllNotes,
    postUserNotes,
    putUserNote,
    deleteNote,
    getSingleUserNotes,
  };
};

export default useNoteCall;
