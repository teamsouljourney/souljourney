import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  getAllNotesSuccess,
  getSingleUserNotesSuccess,
} from "../features/noteSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useNoteCall = () => {
  const { t } = useTranslation();
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
        t("noteCall.fetchError") +
          " " +
          (error.response?.data?.message || t("noteCall.unknownError"))
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
        error.response.data.message || t("noteCall.fetchUserNotesFailed")
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
        error.response.data.message || t("noteCall.postNotesFailed")
      );
    }
  };

  const putUserNote = async (id, noteData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`notes/${id}`, noteData);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message || t("noteCall.updateNoteFailed")
      );
    }
  };

  const deleteNote = async (id, userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`notes/${id}`);
      toastSuccessNotify(data?.message || t("noteCall.deleteSuccess"));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response?.data?.message || t("noteCall.deleteFailed")
      );
    } finally {
      getSingleUserNotes(userId);
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
