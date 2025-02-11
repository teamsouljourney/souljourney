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
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      state.selectedSlot = null;
    },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
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
