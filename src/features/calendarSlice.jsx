import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calerndar",

  initialState: {
    appointments: [],
    selectedDate: null,
    selectedSlot: null,
    isEditing: false,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setSelectedDate: (state, { payload }) => {
      state.selectedDate = payload;
      state.selectedSlot = null;
    },
    setSelectedSlot: (state, { payload }) => {
      state.selectedSlot = payload;
    },
    setEditStatus: (state, { payload }) => {
      state.isEditing = payload;
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
  setSelectedDate,
  setSelectedSlot,
  setEditStatus,
} = calendarSlice.actions;

export default calendarSlice.reducer;
