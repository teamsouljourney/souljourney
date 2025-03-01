import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    singleUserNotes: [],
    userId: "",
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllNotesSuccess: (state, { payload }) => {
      state.loading = false;
      state.notes = payload.data;
      state.error = false;
    },
    getSingleUserNotesSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.singleUserNotes = payload;
    },
    createNoteSuccess: (state, { payload }) => {
      state.loading = false;
      state.notes.push(payload.data); // Yeni notu ekle
      state.error = false;
    },
    updateNoteSuccess: (state, { payload }) => {
      state.loading = false;
      const index = state.notes.findIndex(
        (note) => note._id === payload.data._id
      );
      if (index !== -1) state.notes[index] = payload.data; // degisebilir, doneceğim.
      state.error = false;
    },
    deleteNoteSuccess: (state, { payload }) => {
      state.loading = false;
      state.notes = state.notes.filter((note) => note._id !== payload); // Sil
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getAllNotesSuccess,
  createNoteSuccess,
  updateNoteSuccess,
  deleteNoteSuccess,
  getSingleUserNotesSuccess,
} = noteSlice.actions;

export default noteSlice.reducer;
