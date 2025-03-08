import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",

  initialState: {
    current: "idle", //negotiating, progress, complete
    video: "off", //video feed status: "off" "enabled" "disabled" "complete"
    audio: "off", //audio feed status: "off" "enabled" "disabled" "complete"
    audioDevice: "default", //enumerate devices, chosen audio input device (we dont care about the output device)
    videoDevice: "default",
    shareScreen: false,
    haveMedia: false, //is there a localStream, has getUserMedia been run
    haveCreatedOffer: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail } = videoSlice.actions;

export default videoSlice.reducer;
