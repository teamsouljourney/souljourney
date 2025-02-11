import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",

  initialState: {
    appointments: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllAppointmentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments = payload;
      state.error = false;
    },
    createAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments.push(payload);
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
  getAllAppointmentsSuccess,
  createAppointmentSuccess,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
