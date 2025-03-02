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
  getSingleUserNotesSuccess,
} = noteSlice.actions;

export default noteSlice.reducer;
