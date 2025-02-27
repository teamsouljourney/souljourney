import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",

  initialState: {
    loading: false,
    error: false,
    appointments: [],
    singleAppointment: null,
    currentUserAppointments: [],
    isModalOpen: false,
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
    getCurrentUserAppointmentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUserAppointments = payload;
      state.error = false;
    },
    createAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.appointments.push(payload);
      state.error = false;
    },
    updateAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUserAppointments = state.currentUserAppointments.map(
        (appointment) =>
          appointment._id === payload._id ? payload : appointment
      );
      state.error = false;
    },
    deleteAppointmentSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUserAppointments = state.currentUserAppointments.filter(
        (appointment) => appointment.id !== payload
      );
      state.error = false;
    },
    resetNewAppointment: (state) => {
      state.newAppointment = {
        name: "",
      };
    },
    toggleModal: (state, { payload }) => {
      state.isModalOpen = payload;
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
  getCurrentUserAppointmentsSuccess,
  createAppointmentSuccess,
  updateAppointmentSuccess,
  deleteAppointmentSuccess,
  resetNewAppointment,
  toggleModal,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
