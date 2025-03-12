import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cameras: [],
  microphones: [],
  selectedCamera: null,
  selectedMicrophone: null,
  isVideoOn: true,
  isAudioOn: true,
  haveMedia: false,
  mediaStatus: {
    audio: "disabled",
    video: "disabled",
  },
  callStatus: "idle", // idle, outgoing, incoming, connected
  loading: false,
  error: null,
  remoteStream: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setDevices: (state, { payload }) => {
      state.loading = false;
      state.cameras = payload.cameras;
      state.microphones = payload.microphones;
    },
    setSelectedDevices: (state, { payload }) => {
      if (payload.camera) state.selectedCamera = payload.camera;
      if (payload.microphone) state.selectedMicrophone = payload.microphone;
    },
    setIsVideoOn: (state, { payload }) => {
      state.isVideoOn = payload;
    },
    setIsAudioOn: (state, { payload }) => {
      state.isAudioOn = payload;
    },
    setHaveMedia: (state, { payload }) => {
      state.haveMedia = payload;
    },
    setMediaStatus: (state, { payload }) => {
      state.mediaStatus = payload;
    },
    setCallStatus: (state, { payload }) => {
      state.callStatus = payload;
    },
    setRemoteStream: (state, { payload }) => {
      state.remoteStream = payload;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  setDevices,
  setSelectedDevices,
  setIsVideoOn,
  setIsAudioOn,
  setHaveMedia,
  setMediaStatus,
  setCallStatus,
  setRemoteStream,
} = videoSlice.actions;

export default videoSlice.reducer;
