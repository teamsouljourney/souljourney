import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  fetchFail,
  fetchStart,
  setDevices,
  setSelectedDevices,
} from "../features/videoSlice";

import { toastErrorNotify } from "../helper/ToastNotify";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true,
});

const useVideoCall = () => {
  const dispatch = useDispatch();
  const { cameras, microphones, selectedCamera, selectedMicrophone } =
    useSelector((state) => state.video);

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

  return {
    getMediaDevices,
  };
};

export default useVideoCall;
