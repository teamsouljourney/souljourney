import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",

  initialState: {
    current: "idle", //negotiating, progress, complete
    video: "off", //video feed status: "off" "enabled" "disabled" "complete"
    audio: "off", //audio feed status: "off" "enabled" "disabled" "complete"
    audioDevice: "default", //enumerate devices, chosen audio input device
    videoDevice: "default",
    shareScreen: false,
    haveMedia: false, //is there a localStream, has getUserMedia been run
    haveCreatedOffer: false,
    cameras: [],
    microphones: [],
    selectedCamera: "",
    selectedMicrophone: "",
    isVideoOn: false,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    setHaveMedia: (state, { payload }) => {
      state.haveMedia = payload;
    },
    setMediaStatus: (state, { payload }) => {
      if (payload.audio !== undefined) state.audio = payload.audio;
      if (payload.video !== undefined) state.video = payload.video;
    },
    setDevices: (state, { payload }) => {
      if (payload.cameras) state.cameras = payload.cameras;
      if (payload.microphones) state.microphones = payload.microphones;
    },
    setSelectedDevices: (state, { payload }) => {
      if (payload.camera) state.selectedCamera = payload.camera;
      if (payload.microphone) state.selectedMicrophone = payload.microphone;
    },
    setIsVideoOn: (state, payload) => {
      state.isVideoOn = payload;
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
  setMediaStatus,
  setHaveMedia,
  setDevices,
  setIsVideoOn,
  setSelectedDevices,
} = videoSlice.actions;

export default videoSlice.reducer;
