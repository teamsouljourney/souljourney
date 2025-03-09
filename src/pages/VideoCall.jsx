import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaDesktop,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);
  const screenStream = useRef(null);

  // Device selection states
  const [cameras, setCameras] = useState([]);
  const [microphones, setMicrophones] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMicrophone, setSelectedMicrophone] = useState("");
  const [cameraDropdownOpen, setCameraDropdownOpen] = useState(false);
  const [microphoneDropdownOpen, setMicrophoneDropdownOpen] = useState(false);

  // Refs for dropdown click outside detection
  const cameraDropdownRef = useRef(null);
  const microphoneDropdownRef = useRef(null);

  useEffect(() => {
    // Get available media devices
    const getMediaDevices = async () => {
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

        setCameras(cameraDevices);
        setMicrophones(microphoneDevices);

        // Set default selections
        if (cameraDevices.length > 0 && !selectedCamera) {
          setSelectedCamera(cameraDevices[0].deviceId);
        }

        if (microphoneDevices.length > 0 && !selectedMicrophone) {
          setSelectedMicrophone(microphoneDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting media devices:", error);
      }
    };

    // Add click outside listener to close dropdowns
    const handleClickOutside = (event) => {
      if (
        cameraDropdownRef.current &&
        !cameraDropdownRef.current.contains(event.target)
      ) {
        setCameraDropdownOpen(false);
      }
      if (
        microphoneDropdownRef.current &&
        !microphoneDropdownRef.current.contains(event.target)
      ) {
        setMicrophoneDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        stream.getAudioTracks().forEach((track) => (track.enabled = false));
        stream.getVideoTracks().forEach((track) => (track.enabled = false));
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setupSocket();
        getMediaDevices(); // Get devices after permissions are granted
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setupSocket = () => {
    socket.emit("join-call", {});

    socket.on("user-joined", async (data) => {
      const remoteRTCSession = new RTCSessionDescription(data.offer);
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      await peerConnection.current.setRemoteDescription(remoteRTCSession);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { answer });
    });

    socket.on("answer", async (data) => {
      const remoteDesc = new RTCSessionDescription(data.answer);
      await peerConnection.current.setRemoteDescription(remoteDesc);
    });

    socket.on("candidate", async (data) => {
      try {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      } catch (e) {
        console.error("Error adding received ICE candidate", e);
      }
    });

    socket.on("share-screen", (stream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });
  };

  const toggleAudio = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      localStream.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(!isVideoOn);
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

        setSelectedCamera(deviceId);
        setCameraDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error changing camera:", error);
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
        newAudioTrack.enabled = !isMuted;

        setSelectedMicrophone(deviceId);
        setMicrophoneDropdownOpen(false);
      }
    } catch (error) {
      console.error("Error changing microphone:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-offWhite md:p-10">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
        <video
          ref={localVideoRef}
          autoPlay
          className="w-full bg-black rounded-lg shadow-lg h-72 md:h-96"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-full bg-black rounded-lg shadow-lg h-72 md:h-96"
        />
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Microphone control with dropdown */}
        <div className="relative flex items-center" ref={microphoneDropdownRef}>
          <button
            onClick={toggleAudio}
            className="p-4 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-600"
          >
            {isMuted ? (
              <FaMicrophoneSlash className="w-6 h-6" />
            ) : (
              <FaMicrophone className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleMicrophoneDropdown}
            className="flex items-center justify-center w-8 h-8 ml-1 text-white bg-gray-700 rounded-full hover:bg-gray-600"
          >
            <FaChevronDown size={12} />
          </button>

          {microphoneDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-[250px] bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="px-3 py-2 text-sm font-medium border-b border-gray-200">
                Current: {getSelectedMicrophoneLabel()}
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {microphones.length > 0 ? (
                  microphones.map((microphone) => (
                    <button
                      key={microphone.deviceId}
                      onClick={() => changeMicrophone(microphone.deviceId)}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                    >
                      {microphone.label}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No microphones found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video control with dropdown */}
        <div className="relative flex items-center" ref={cameraDropdownRef}>
          <button
            onClick={toggleVideo}
            className="p-4 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-600"
          >
            {isVideoOn ? (
              <FaVideo className="w-6 h-6" />
            ) : (
              <FaVideoSlash className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleCameraDropdown}
            className="flex items-center justify-center w-8 h-8 ml-1 text-white bg-gray-700 rounded-full hover:bg-gray-600"
          >
            <FaChevronDown size={12} />
          </button>

          {cameraDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-[250px] bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="px-3 py-2 text-sm font-medium border-b border-gray-200">
                Current: {getSelectedCameraLabel()}
              </div>
              <div className="max-h-[200px] overflow-y-auto">
                {cameras.length > 0 ? (
                  cameras.map((camera) => (
                    <button
                      key={camera.deviceId}
                      onClick={() => changeCamera(camera.deviceId)}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:outline-none"
                    >
                      {camera.label}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No cameras found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Share screen button */}
        <button
          onClick={shareScreen}
          className="p-4 text-white bg-green-600 rounded-full shadow-lg hover:bg-green-500"
        >
          <FaDesktop className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
