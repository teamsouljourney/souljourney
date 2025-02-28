import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    loading: false,
    error: false,
    feedbacks: [],
    singleTherapistFeedbacks: [],
    singleFeedback: null,
    isModalOpen: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getAllFeedbacksSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.feedbacks = payload;
    },
    getSingleTherapistFeedbacksSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.singleTherapistFeedbacks = payload;
    },
    getSingleFeedbackSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleFeedback = payload;
      state.error = false;
    },
    toggleModal: (state, { payload }) => {
      state.isModalOpen = payload;
    },
    fetchFail: (state) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getAllFeedbacksSuccess,
  getSingleTherapistFeedbacksSuccess,
  getSingleFeedbackSuccess,
  toggleModal,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
