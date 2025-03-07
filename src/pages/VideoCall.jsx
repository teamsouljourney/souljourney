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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        stream.getAudioTracks().forEach(track => track.enabled = false);
        stream.getVideoTracks().forEach(track => track.enabled = false);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setupSocket();
      })
      .catch((err) => console.error("Error accessing media devices:", err));
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
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
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
      screenStream.current = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream.current;
      }
      socket.emit("share-screen", screenStream.current);
    } catch (err) {
      console.log("Error sharing screen:", err);
    }
  };

  return (
    <div className="w-full h-full bg-offWhite p-6 md:p-10 flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        <video ref={localVideoRef} autoPlay className="w-full h-72 md:h-96 bg-black rounded-lg shadow-lg" />
        <video ref={remoteVideoRef} autoPlay className="w-full h-72 md:h-96 bg-black rounded-lg shadow-lg" />
      </div>
      <div className="flex items-center justify-center gap-6 mt-6">
        <button onClick={toggleAudio} className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow-lg">
          {isMuted ? <FaMicrophoneSlash className="w-6 h-6" /> : <FaMicrophone className="w-6 h-6" />}
        </button>
        <button onClick={toggleVideo} className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow-lg">
          {isVideoOn ? <FaVideo className="w-6 h-6" /> : <FaVideoSlash className="w-6 h-6" />}
        </button>
        <button onClick={shareScreen} className="p-4 rounded-full bg-green-600 hover:bg-green-500 text-white shadow-lg">
          Share Screen
        </button>
      </div>
    </div>
  );
}
