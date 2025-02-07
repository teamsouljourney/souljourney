import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",

  initialState: {
    notes: [],
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
} = noteSlice.actions;

export default noteSlice.reducer;
