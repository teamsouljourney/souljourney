import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calerndar",

  initialState: {
    appointments: [],
    selectedDate: null,
    selectedSlot: null,
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
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, setSelectedDate, setSelectedSlot } =
  calendarSlice.actions;

export default calendarSlice.reducer;
