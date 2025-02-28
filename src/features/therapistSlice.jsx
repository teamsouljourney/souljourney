import { createSlice } from "@reduxjs/toolkit";

const therapistSlice = createSlice({
  name: "therapists",
  initialState: {
    therapists: [],
    filteredTherapists: [],
    singleTherapist: null,
    therapistTimeTable: [],
    searchTerm:"",
    loading: false,
    error: false,
    isModalOpen: false
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
    getTherapistTimeTableSuccess: (state, { payload }) => {
      state.loading = false;
      state.therapistTimeTable = payload;
    },
    getFilterTherapistsSuccess: (state, { payload }) => {
      state.filteredTherapists = payload
      
    },
    setSearchTerm:(state, {payload}) =>{
      state.searchTerm=payload
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
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
  getTherapistTimeTableSuccess,
  getFilterTherapistsSuccess,
  setSearchTerm,
  toggleModal
} = therapistSlice.actions;

export default therapistSlice.reducer;
