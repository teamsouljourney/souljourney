import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
    name: "feedbacks",
    initialState: {
        loading: false,
        error: false,
        feedbacks: [],
        singleTherapistFeedbacks: []
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true
            state.error = false
        },
        getAllFeedbacksSuccess: (state, {payload}) => {
            state.loading = true
            state.error = false
            state.feedbacks = payload
        },
        getSingleTherapistFeedbacksSuccess: (state, {payload}) => {
            state.loading = true
            state.error = false
            state.singleTherapistFeedbacks = payload
        },
        fetchFail: () => {
            state.loading = false,
            state.error = true
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    getAllFeedbacksSuccess,
    getSingleTherapistFeedbacksSuccess,
} = feedbackSlice.actions

export default feedbackSlice.reducer;