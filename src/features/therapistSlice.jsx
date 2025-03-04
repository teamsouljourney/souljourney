import { createSlice } from "@reduxjs/toolkit";

const therapistSlice = createSlice({
  name: "therapists",
  initialState: {
    therapists: [],
    filteredTherapists: [],
    singleTherapist: null,
    newTherapist: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },    
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
      state.error = false;
    },
    getSingleTherapistSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleTherapist = payload;
      state.error = false;
    },
    getTherapistTimeTableSuccess: (state, { payload }) => {
      state.loading = false;
      state.therapistTimeTable = payload;
      state.error = false;
    },
    getFilterTherapistsSuccess: (state, { payload }) => {
      state.loading = false
      state.filteredTherapists = payload
      state.error = false;
    },
    updateSingleTherapistSuccess: (state, {payload}) => {
      state.loading = false;
      state.singleTherapist = { ...state.singleUser, ...payload };
      state.error = false
    },
    setSearchTerm:(state, {payload}) =>{
      state.loading = false;
      state.searchTerm=payload
      state.error = false;
    },
    setNewTherapist: (state, { payload }) => {
      state.loading = false;
      state.newTherapist = { ...state.newTherapist, ...payload };
      state.error = false;
    },
    resetNewTherapist: (state) => {
      state.newTherapist = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
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
  getAllTherapistsSuccess,
  getSingleTherapistSuccess,
  getTherapistTimeTableSuccess,
  getFilterTherapistsSuccess,
  updateSingleTherapistSuccess,
  setSearchTerm,
  toggleModal,
  setNewTherapist,
  resetNewTherapist
} = therapistSlice.actions;

export default therapistSlice.reducer;
