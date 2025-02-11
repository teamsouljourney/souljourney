import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",

  initialState: {
    loading: false,
    error: false,
    appointments: [],
    singleAppointment: null,
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
    getSingleAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleAppointment = payload;
      state.error = false;
    },
    createAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments.push(payload);
      state.error = false;
    },
    updateAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === payload.id ? payload : appointment
      );
      state.error = false;
    },
    deleteAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== payload
      );
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
  getSingleAppointmentSuccess,
  createAppointmentSuccess,
  updateAppointmentSuccess,
  deleteAppointmentSuccess,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
