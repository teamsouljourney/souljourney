import { createSlice } from "@reduxjs/toolkit";

const therapistSlice = createSlice({
  name: "therapists",
  initialState: {
    therapists: [],
    singleTherapist: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllTherapistsSuccess: (state, { payload }) => {
      state.loading = false;
      state.therapists = payload;
    },
    getSingleTherapistSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleTherapist = payload;
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
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
} = therapistSlice.actions;

export default therapistSlice.reducer;
