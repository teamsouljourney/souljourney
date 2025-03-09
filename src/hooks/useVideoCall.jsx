import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  fetchFail,
  fetchStart,
  setDevices,
  setHaveMedia,
  setIsAudioOn,
  setIsVideoOn,
  setMediaStatus,
  setSelectedDevices,
} from "../features/videoSlice";

import { toastErrorNotify } from "../helper/ToastNotify";

const socket = io("https://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true,
});

const useVideoCall = () => {
  const dispatch = useDispatch();
  const {
    cameras,
    microphones,
    selectedCamera,
    selectedMicrophone,
    isVideoOn,
    isAudioOn,
  } = useSelector((state) => state.video);

  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);
  const screenStream = useRef(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Initialize media stream
  const initializeMedia = async () => {
    dispatch(fetchStart());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStream.current = stream;
      stream.getAudioTracks().forEach((track) => (track.enabled = false));
      stream.getVideoTracks().forEach((track) => (track.enabled = false));

      dispatch(setHaveMedia(true));
      dispatch(setMediaStatus({ audio: "disabled", video: "disabled" }));

      // Get devices after permissions are granted
      await getMediaDevices();

      return stream;
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Error accessing media devices: " + err.message);
      return null;
    }
  };
  // Get available media devices
  const getMediaDevices = async () => {
    dispatch(fetchStart());
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Filter cameras and microphones
      const cameraDevices = devices
        .filter((device) => device.kind === "videoinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${cameras.length + 1}`,
        }));

      const microphoneDevices = devices
        .filter((device) => device.kind === "audioinput")
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${microphones.length + 1}`,
        }));

      dispatch(
        setDevices({ cameras: cameraDevices, microphones: microphoneDevices })
      );

      // Set default selections
      if (cameraDevices.length > 0 && !selectedCamera) {
        dispatch(setSelectedDevices({ camera: cameraDevices[0].deviceId }));
      }

      if (microphoneDevices.length > 0 && !selectedMicrophone) {
        dispatch(
          setSelectedDevices({ microphone: microphoneDevices[0].deviceId })
        );
      }
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Error getting media devices: " + error.message);
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      dispatch(setIsVideoOn(!isVideoOn));
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      dispatch(setIsAudioOn(!isAudioOn));
    }
  };

  return {
    localStream,
    remoteStream,
    peerConnection,
    screenStream,
    localVideoRef,
    remoteVideoRef,
    toggleVideo,
    toggleAudio,
    initializeMedia,
    getMediaDevices,
  };
};

export default useVideoCall;
