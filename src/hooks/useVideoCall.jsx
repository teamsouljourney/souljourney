import { useRef, useState } from "react";
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

  const [cameraDropdownOpen, setCameraDropdownOpen] = useState(false);
  const [microphoneDropdownOpen, setMicrophoneDropdownOpen] = useState(false);

  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);
  const screenStream = useRef(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const cameraDropdownRef = useRef(null);
  const microphoneDropdownRef = useRef(null);

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

  const toggleCameraDropdown = () => setCameraDropdownOpen(!cameraDropdownOpen);

  const toggleMicrophoneDropdown = () =>
    setMicrophoneDropdownOpen(!microphoneDropdownOpen);

  const getSelectedCameraLabel = () => {
    const camera = cameras.find((c) => c.deviceId === selectedCamera);
    return camera ? camera.label : "Select camera";
  };

  const getSelectedMicrophoneLabel = () => {
    const microphone = microphones.find(
      (m) => m.deviceId === selectedMicrophone
    );
    return microphone ? microphone.label : "Select microphone";
  };

  const changeCamera = async (deviceId) => {
    try {
      if (localStream.current) {
        // Stop current video tracks
        localStream.current.getVideoTracks().forEach((track) => track.stop());

        // Get new stream with selected camera
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } },
          audio: false,
        });

        // Replace video track in local stream
        const newVideoTrack = newStream.getVideoTracks()[0];
        const oldVideoTrack = localStream.current.getVideoTracks()[0];

        if (oldVideoTrack) {
          localStream.current.removeTrack(oldVideoTrack);
        }

        localStream.current.addTrack(newVideoTrack);

        // Update peer connection if it exists
        if (peerConnection.current) {
          const senders = peerConnection.current.getSenders();
          const videoSender = senders.find(
            (sender) => sender.track && sender.track.kind === "video"
          );

          if (videoSender) {
            videoSender.replaceTrack(newVideoTrack);
          }
        }

        // Set track enabled based on current video state
        newVideoTrack.enabled = isVideoOn;

        dispatch(setSelectedDevices({ camera: deviceId }));
        setCameraDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error changing camera:", error);
      toastErrorNotify("Error changing camera: " + error.message);
    }
  };

  const changeMicrophone = async (deviceId) => {
    try {
      if (localStream.current) {
        // Stop current audio tracks
        localStream.current.getAudioTracks().forEach((track) => track.stop());

        // Get new stream with selected microphone
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: deviceId } },
          video: false,
        });

        // Replace audio track in local stream
        const newAudioTrack = newStream.getAudioTracks()[0];
        const oldAudioTrack = localStream.current.getAudioTracks()[0];

        if (oldAudioTrack) {
          localStream.current.removeTrack(oldAudioTrack);
        }

        localStream.current.addTrack(newAudioTrack);

        // Update peer connection if it exists
        if (peerConnection.current) {
          const senders = peerConnection.current.getSenders();
          const audioSender = senders.find(
            (sender) => sender.track && sender.track.kind === "audio"
          );

          if (audioSender) {
            audioSender.replaceTrack(newAudioTrack);
          }
        }

        // Set track enabled based on current audio state
        newAudioTrack.enabled = isAudioOn;

        dispatch(setSelectedDevices({ microphone: deviceId }));
        setMicrophoneDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error changing microphone:", error);
      toastErrorNotify("Error changing microphone: " + error.message);
    }
  };

  const shareScreen = async () => {
    try {
      screenStream.current = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream.current;
      }
      socket.emit("share-screen", screenStream.current);
    } catch (err) {
      console.log("Error sharing screen:", err);
      toastErrorNotify("Error sharing screen: " + err.message);
    }
  };

  return {
    localStream,
    remoteStream,
    peerConnection,
    screenStream,
    localVideoRef,
    remoteVideoRef,
    cameraDropdownRef,
    microphoneDropdownRef,
    cameraDropdownOpen,
    microphoneDropdownOpen,
    toggleVideo,
    toggleAudio,
    initializeMedia,
    getMediaDevices,
    toggleCameraDropdown,
    toggleMicrophoneDropdown,
    getSelectedCameraLabel,
    getSelectedMicrophoneLabel,
    changeCamera,
    changeMicrophone,
    shareScreen,
  };
};

export default useVideoCall;
