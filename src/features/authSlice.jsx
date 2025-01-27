import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    token: null
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, {payload}) => {
      // console.log(payload);
      state.currentUser = payload.data;
      state.loading = false;
      state.error = false;
      state.token = payload.token;     
    },
    loginSuccess: (state, {payload}) => {
      // console.log(payload);
      state.loading = false;
      state.currentUser = payload?.user
      state.error = false;
      state.token = payload?.token
    },
    
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  registerSuccess,
  loginSuccess
} = authSlice.actions;
export default authSlice.reducer;
