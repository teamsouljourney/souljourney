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
    setNewTherapist: (state, { payload }) => {
      state.newTherapist = { ...state.newTherapist, ...payload };
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
  setSearchTerm,
  toggleModal,
  setNewTherapist,
  resetNewTherapist
} = therapistSlice.actions;

export default therapistSlice.reducer;
