import { useRef, useState, useEffect } from "react";
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
  setCallStatus,
} from "../features/videoSlice";

import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

// Enhanced configuration for ICE servers (STUN/TURN)
const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    // Add more TURN servers for better connectivity
    {
      urls: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
      credential: "muazkh",
    },
    {
      urls: "turn:turn.anyfirewall.com:443?transport=tcp",
      username: "webrtc",
      credential: "webrtc",
    },
  ],
  iceCandidatePoolSize: 10,
};

// Initialize socket connection - we'll do this inside a useEffect
let socket = null;

// Global değişkenler - DOM manipülasyonu için
let remoteStream = null;
let lastVideoElement = null;

const useVideoCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const {
    cameras,
    microphones,
    selectedCamera,
    selectedMicrophone,
    isVideoOn,
    isAudioOn,
    callStatus,
  } = useSelector((state) => state.video);

  const socketUrl = import.meta.env.VITE_SOCKET_URL || "https://localhost:8000";

  // Initialize socket when currentUser is available
  useEffect(() => {
    if (!currentUser?._id) return;

    try {
      socket = io(socketUrl, {
        transports: ["websocket"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        query: {
          userId: currentUser._id,
          userModel: currentUser.isTherapist ? "Therapist" : "User",
        },
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        toastErrorNotify("Socket connection error. Please check your network.");
      });

      // Clean up socket on unmount
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  }, [currentUser]);

  const [cameraDropdownOpen, setCameraDropdownOpen] = useState(false);
  const [microphoneDropdownOpen, setMicrophoneDropdownOpen] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [peerConnectionState, setPeerConnectionState] = useState("new");
  const [iceConnectionState, setIceConnectionState] = useState("new");
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationTimeout, setNegotiationTimeout] = useState(null);

  const localStream = useRef(null);
  const peerConnection = useRef(null);
  const screenStream = useRef(null);

  const cameraDropdownRef = useRef(null);
  const microphoneDropdownRef = useRef(null);

  // Setup socket event listeners
  useEffect(() => {
    if (!socket || !currentUser?._id) return;

    // Handle incoming call
    socket.on("callUser", async ({ from, appointmentId }) => {
      console.log(
        `Incoming call from ${from} for appointment ${appointmentId}`
      );
      setRemoteUserId(from);
      setCurrentAppointmentId(appointmentId);
      dispatch(setCallStatus("incoming"));

      // Auto-enable camera and mic when receiving a call
      await initializeMedia();
      toggleVideo(true); // Force enable video
      toggleAudio(true); // Force enable audio
    });

    // Handle call accepted
    socket.on("callAccepted", async ({ appointmentId }) => {
      console.log(`Call accepted for appointment ${appointmentId}`);
      dispatch(setCallStatus("connected"));
      setConnectionAttempts(0);
      setIsNegotiating(false);

      // Make sure media is initialized and enabled
      if (!localStream.current) {
        await initializeMedia();
      }
      toggleVideo(true); // Force enable video
      toggleAudio(true); // Force enable audio

      await createPeerConnection();
      await createOffer();
    });

    // Handle WebRTC signaling
    socket.on("webrtc-signal", async ({ signal, from }) => {
      console.log(
        `Received WebRTC signal from ${from}`,
        signal.type || "ICE candidate"
      );

      if (!peerConnection.current) {
        console.log("Creating peer connection for incoming signal");
        await createPeerConnection();
      }

      try {
        if (signal.type === "offer") {
          console.log("Processing offer");

          // Eğer müzakere devam ediyorsa, önce onu iptal et
          if (isNegotiating) {
            console.log("Already negotiating, resetting negotiation state");
            clearTimeout(negotiationTimeout);
            setIsNegotiating(false);
          }

          // Eğer signaling state stable değilse, rollback yap
          if (peerConnection.current.signalingState !== "stable") {
            console.log(
              "Signaling state is not stable:",
              peerConnection.current.signalingState
            );

            // Rollback sadece local description varsa gerekli
            if (
              peerConnection.current.signalingState === "have-local-offer" ||
              peerConnection.current.signalingState === "have-local-pranswer"
            ) {
              await peerConnection.current.setLocalDescription({
                type: "rollback",
              });
            }
          }

          // Remote description'ı ayarla
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal)
          );

          // Cevap oluştur
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);

          // Cevabı gönder
          socket.emit("webrtc-signal", {
            appointmentId: currentAppointmentId,
            signal: peerConnection.current.localDescription,
            to: from,
          });
        } else if (signal.type === "answer") {
          console.log("Processing answer");
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal)
          );
          console.log("Remote description set successfully");

          // Müzakere tamamlandı, isNegotiating'i sıfırla
          setIsNegotiating(false);
          clearTimeout(negotiationTimeout);

          // Eğer hala track yoksa, bağlantıyı yeniden başlat
          setTimeout(() => {
            if (!remoteStream || remoteStream.getTracks().length === 0) {
              console.log("No tracks after answer, resetting connection");
              resetConnection();
            }
          }, 3000);
        } else if (signal.candidate) {
          try {
            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(signal)
            );
          } catch (error) {
            // Only throw for non-canceled operations
            if (error.name !== "OperationError") {
              console.error("Error adding ICE candidate:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error handling signal:", error);

        // If we get an invalid state error, try recreating the connection
        if (error.name === "InvalidStateError") {
          console.log("Invalid state during signaling, recreating connection");
          setTimeout(() => resetConnection(), 1000);
        }
      }
    });

    // Handle call ended
    socket.on("callEnded", ({ appointmentId }) => {
      console.log(`Call ended for appointment ${appointmentId}`);
      endCall();
    });

    // Handle call errors
    socket.on("callError", ({ message }) => {
      console.error("Call error:", message);
      toastErrorNotify(message);
      dispatch(setCallStatus("idle"));
    });

    // Cleanup on unmount
    return () => {
      socket.off("callUser");
      socket.off("callAccepted");
      socket.off("webrtc-signal");
      socket.off("callEnded");
      socket.off("callError");
    };
  }, [currentUser, dispatch, isNegotiating]);

  // Reset connection completely
  const resetConnection = async () => {
    console.log("Resetting connection completely");

    // Müzakere durumunu sıfırla
    setIsNegotiating(false);
    clearTimeout(negotiationTimeout);

    // Close existing peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Reset remote stream
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      remoteStream = null;
    }

    // Reset state
    setConnectionAttempts(0);

    // Kısa bir gecikme ile yeni bağlantı oluştur
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create new connection
    await createPeerConnection();

    // Create new offer if we're in connected state
    if (callStatus === "connected") {
      // Kısa bir gecikme ile teklif oluştur
      setTimeout(async () => {
        await createOffer();
      }, 500);
    }
  };

  // Initialize media stream
  const initializeMedia = async () => {
    dispatch(fetchStart());
    try {
      console.log("Initializing media stream");

      // If we already have a stream, stop all tracks
      if (localStream.current) {
        console.log("Stopping existing local stream tracks");
        localStream.current.getTracks().forEach((track) => track.stop());
      }

      console.log("Requesting user media");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      console.log("Media stream obtained successfully:", stream.id);
      localStream.current = stream;

      // Enable tracks by default
      stream.getVideoTracks().forEach((track) => {
        track.enabled = true;
        console.log("Enabled video track:", track.label);
      });

      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
        console.log("Enabled audio track:", track.label);
      });

      // Tüm video elementlerini bul
      const videoElements = document.querySelectorAll("video");

      // Local video elementini bul (muted olan)
      let localVideoElement = null;
      for (let i = 0; i < videoElements.length; i++) {
        if (videoElements[i].muted) {
          localVideoElement = videoElements[i];
          break;
        }
      }

      // Eğer local video elementi bulunduysa, stream'i ayarla
      if (localVideoElement) {
        console.log("Found local video element, setting srcObject");
        localVideoElement.srcObject = stream;

        // Video elementini oynatmaya zorla
        try {
          await localVideoElement.play();
          console.log("Local video playing successfully");
        } catch (e) {
          console.error("Error playing local video:", e);

          // Otomatik oynatma politikası hatası durumunda tekrar dene
          setTimeout(() => {
            localVideoElement.play().catch((err) => {
              console.error("Second attempt to play local video failed:", err);
            });
          }, 1000);
        }
      } else {
        console.warn("Could not find local video element");
      }

      dispatch(setHaveMedia(true));
      dispatch(setIsVideoOn(true));
      dispatch(setIsAudioOn(true));
      dispatch(setMediaStatus({ audio: "enabled", video: "enabled" }));

      // Get devices after permissions are granted
      await getMediaDevices();

      return stream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      dispatch(fetchFail());
      toastErrorNotify("Error accessing media devices: " + err.message);
      return null;
    }
  };

  // Create WebRTC peer connection
  const createPeerConnection = async () => {
    try {
      // Close any existing peer connection
      if (peerConnection.current) {
        peerConnection.current.close();
      }

      console.log("Creating new peer connection");

      // Create new peer connection with advanced options
      peerConnection.current = new RTCPeerConnection({
        ...iceServers,
        sdpSemantics: "unified-plan",
        bundlePolicy: "max-bundle",
      });

      setPeerConnectionState("new");
      setIceConnectionState("new");
      setIsNegotiating(false);

      // Create a new MediaStream for remote tracks
      remoteStream = new MediaStream();
      console.log("Created new remote stream");

      // Add local tracks to peer connection
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          console.log(`Adding local ${track.kind} track to peer connection`);
          peerConnection.current.addTrack(track, localStream.current);
        });
      } else {
        const stream = await initializeMedia();
        if (stream) {
          stream.getTracks().forEach((track) => {
            console.log(`Adding local ${track.kind} track to peer connection`);
            peerConnection.current.addTrack(track, stream);
          });
        }
      }

      // Handle incoming tracks - DOM manipülasyonu kullanarak
      peerConnection.current.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind);

        // Track'i remoteStream'e ekle
        remoteStream.addTrack(event.track);

        // Tüm video elementlerini bul
        const videoElements = document.querySelectorAll("video");

        // Remote video elementini bul (muted olmayan)
        let remoteVideoElement = null;
        for (let i = 0; i < videoElements.length; i++) {
          if (!videoElements[i].muted) {
            remoteVideoElement = videoElements[i];
            break;
          }
        }

        if (remoteVideoElement) {
          console.log("Found remote video element, updating srcObject");

          // Video elementini güncelle
          if (remoteVideoElement !== lastVideoElement) {
            lastVideoElement = remoteVideoElement;

            // Önce mevcut srcObject'i temizle
            remoteVideoElement.srcObject = null;

            // Kısa bir gecikme ile yeni stream'i ayarla
            setTimeout(() => {
              remoteVideoElement.srcObject = remoteStream;

              // Video elementini oynatmaya zorla
              const playPromise = remoteVideoElement.play();
              if (playPromise !== undefined) {
                playPromise.catch((e) => {
                  console.error("Error playing remote video:", e);

                  // Otomatik oynatma politikası hatası durumunda tekrar dene
                  setTimeout(() => {
                    remoteVideoElement.play().catch((err) => {
                      console.error("Second attempt to play failed:", err);
                    });
                  }, 1000);
                });
              }

              console.log(
                "Remote video playing with tracks:",
                remoteStream.getTracks().length
              );
            }, 100);
          } else {
            console.log("Same video element, just updating tracks");
          }
        } else {
          console.error("Could not find remote video element");
        }

        // Track ended event
        event.track.onended = () => {
          console.log(`Remote ${event.track.kind} track ended`);
        };

        // Track mute/unmute events
        event.track.onmute = () => {
          console.log(`Remote ${event.track.kind} track muted`);
        };

        event.track.onunmute = () => {
          console.log(`Remote ${event.track.kind} track unmuted`);
        };
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("webrtc-signal", {
            appointmentId: currentAppointmentId,
            signal: event.candidate,
            to: remoteUserId,
          });
        }
      };

      // Connection state changes
      peerConnection.current.onconnectionstatechange = () => {
        const state = peerConnection.current.connectionState;
        console.log("Connection state changed:", state);
        setPeerConnectionState(state);

        if (
          state === "disconnected" ||
          state === "failed" ||
          state === "closed"
        ) {
          if (state === "failed" && connectionAttempts < 3) {
            setTimeout(() => {
              resetConnection();
              setConnectionAttempts((prev) => prev + 1);
            }, 1000);
          } else if (state === "failed") {
            toastErrorNotify("Connection failed after multiple attempts");
            endCall();
          }
        } else if (state === "connected") {
          toastSuccessNotify("Connected to remote peer");

          // If we don't have remote tracks after connection, try to renegotiate
          setTimeout(() => {
            if (!remoteStream || remoteStream.getTracks().length === 0) {
              console.log(
                "No remote tracks after connection, trying to renegotiate"
              );
              if (!isNegotiating) {
                renegotiateConnection();
              }
            }
          }, 3000);
        }
      };

      peerConnection.current.oniceconnectionstatechange = () => {
        const state = peerConnection.current.iceConnectionState;
        setIceConnectionState(state);

        if (state === "connected" || state === "completed") {
          console.log("ICE connection established");
        } else if (state === "failed") {
          console.log("ICE connection failed, trying to restart ICE");
          peerConnection.current.restartIce();

          // If ICE fails multiple times, try full renegotiation
          if (connectionAttempts < 3 && !isNegotiating) {
            setTimeout(() => {
              resetConnection();
              setConnectionAttempts((prev) => prev + 1);
            }, 1000);
          }
        } else if (state === "disconnected") {
          // Sometimes disconnected is temporary, so wait before taking action
          setTimeout(() => {
            if (
              peerConnection.current &&
              peerConnection.current.iceConnectionState === "disconnected"
            ) {
              console.log("ICE still disconnected, attempting to restart");
              peerConnection.current.restartIce();
            }
          }, 2000);
        }
      };

      // Handle negotiation needed
      peerConnection.current.onnegotiationneeded = async () => {
        try {
          // Eğer zaten müzakere yapılıyorsa veya bağlantı durumu uygun değilse, işlemi atla
          if (
            isNegotiating ||
            !peerConnection.current ||
            peerConnection.current.signalingState !== "stable"
          ) {
            console.log(
              "Negotiation needed, but skipping because already negotiating or not in stable state"
            );
            return;
          }

          console.log("Starting negotiation process");
          setIsNegotiating(true);

          // Müzakere zaman aşımı - 10 saniye sonra otomatik olarak sıfırla
          const timeout = setTimeout(() => {
            if (isNegotiating) {
              console.log("Negotiation timeout - resetting negotiation state");
              setIsNegotiating(false);
            }
          }, 10000);

          setNegotiationTimeout(timeout);

          const offer = await peerConnection.current.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });

          // Tekrar kontrol et - signalingState hala stable mi?
          if (peerConnection.current.signalingState !== "stable") {
            console.log("Signaling state changed during negotiation, aborting");
            setIsNegotiating(false);
            clearTimeout(timeout);
            return;
          }

          await peerConnection.current.setLocalDescription(offer);

          socket.emit("webrtc-signal", {
            appointmentId: currentAppointmentId,
            signal: peerConnection.current.localDescription,
            to: remoteUserId,
          });

          console.log("Offer sent during negotiation");
        } catch (error) {
          console.error("Error during negotiation:", error);
          setIsNegotiating(false);
          clearTimeout(negotiationTimeout);

          if (error.name === "InvalidStateError") {
            console.log(
              "Invalid state during negotiation, resetting connection"
            );
            setTimeout(() => resetConnection(), 1000);
          }
        }
      };

      return peerConnection.current;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      toastErrorNotify("Error creating connection: " + error.message);
      return null;
    }
  };

  // Renegotiate connection if needed
  const renegotiateConnection = async () => {
    console.log("Renegotiating connection");
    if (!peerConnection.current) {
      console.error("No peer connection to renegotiate");
      await createPeerConnection();
      return;
    }

    try {
      // Prevent multiple negotiations at once
      if (isNegotiating) {
        console.log("Already negotiating, skipping renegotiation");
        return;
      }

      // Check if we need to recreate the peer connection
      if (
        peerConnection.current.connectionState === "failed" ||
        peerConnection.current.connectionState === "closed" ||
        peerConnection.current.iceConnectionState === "failed"
      ) {
        console.log("Connection in bad state, recreating peer connection");
        await resetConnection();
        return;
      }

      // Check signaling state before creating an offer
      if (peerConnection.current.signalingState !== "stable") {
        console.log(
          "Cannot create offer in state:",
          peerConnection.current.signalingState
        );
        console.log("Resetting connection to get to stable state");
        await resetConnection();
        return;
      }

      setIsNegotiating(true);

      // Müzakere zaman aşımı - 10 saniye sonra otomatik olarak sıfırla
      const timeout = setTimeout(() => {
        if (isNegotiating) {
          console.log("Renegotiation timeout - resetting negotiation state");
          setIsNegotiating(false);
        }
      }, 10000);

      setNegotiationTimeout(timeout);

      // Create a new offer with ICE restart
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        iceRestart: true,
      });

      await peerConnection.current.setLocalDescription(offer);

      socket.emit("webrtc-signal", {
        appointmentId: currentAppointmentId,
        signal: peerConnection.current.localDescription,
        to: remoteUserId,
      });

      console.log("Sent renegotiation offer");
    } catch (error) {
      console.error("Error renegotiating connection:", error);
      toastErrorNotify("Connection error: " + error.message);
      setIsNegotiating(false);
      clearTimeout(negotiationTimeout);

      // If we get an invalid state error, try recreating the connection
      if (error.name === "InvalidStateError") {
        console.log(
          "Invalid state during renegotiation, recreating connection"
        );
        setTimeout(() => resetConnection(), 1000);
      }
    }
  };

  // Create and send offer
  const createOffer = async () => {
    try {
      // Prevent multiple negotiations at once
      if (isNegotiating) {
        console.log("Already negotiating, skipping offer creation");
        return;
      }

      // Only proceed if in stable state
      if (peerConnection.current.signalingState !== "stable") {
        console.log(
          "Cannot create offer in state:",
          peerConnection.current.signalingState
        );
        return;
      }

      setIsNegotiating(true);

      // Müzakere zaman aşımı - 10 saniye sonra otomatik olarak sıfırla
      const timeout = setTimeout(() => {
        if (isNegotiating) {
          console.log("Offer creation timeout - resetting negotiation state");
          setIsNegotiating(false);
        }
      }, 10000);

      setNegotiationTimeout(timeout);

      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      // Check again if signaling state is still stable
      if (peerConnection.current.signalingState !== "stable") {
        console.log("Signaling state changed during offer creation, aborting");
        setIsNegotiating(false);
        clearTimeout(timeout);
        return;
      }

      await peerConnection.current.setLocalDescription(offer);

      socket.emit("webrtc-signal", {
        appointmentId: currentAppointmentId,
        signal: peerConnection.current.localDescription,
        to: remoteUserId,
      });
    } catch (error) {
      console.error("Error creating offer:", error);
      toastErrorNotify("Error creating offer: " + error.message);
      setIsNegotiating(false);
      clearTimeout(negotiationTimeout);

      if (error.name === "InvalidStateError") {
        console.log(
          "Invalid state during offer creation, resetting connection"
        );
        setTimeout(() => resetConnection(), 1000);
      }
    }
  };

  // Initiate a call
  const initiateCall = async (appointmentId, userId) => {
    console.log(
      `Initiating call to ${userId} for appointment ${appointmentId}`
    );
    setCurrentAppointmentId(appointmentId);
    setRemoteUserId(userId);
    setConnectionAttempts(0);
    setIsNegotiating(false);
    dispatch(setCallStatus("outgoing"));

    // Auto-enable camera and mic when initiating a call
    const stream = await initializeMedia();
    if (stream) {
      console.log("Media initialized for outgoing call");
      toggleVideo(true); // Force enable video
      toggleAudio(true); // Force enable audio

      // Tüm video elementlerini bul
      const videoElements = document.querySelectorAll("video");

      // Local video elementini bul (muted olan)
      for (let i = 0; i < videoElements.length; i++) {
        if (videoElements[i].muted) {
          console.log("Setting local video for outgoing call");
          videoElements[i].srcObject = stream;
          videoElements[i]
            .play()
            .catch((e) => console.error("Error playing local video:", e));
          break;
        }
      }
    }

    socket.emit("callUser", {
      userToCall: userId,
      from: currentUser._id,
      appointmentId,
    });
  };

  // Accept incoming call
  const acceptCall = async (appointmentId) => {
    try {
      console.log(`Accepting call for appointment ${appointmentId}`);
      dispatch(setCallStatus("connected"));
      setConnectionAttempts(0);
      setIsNegotiating(false);

      // Make sure media is initialized and enabled
      const stream = await initializeMedia();
      if (stream) {
        console.log("Media initialized for incoming call");
        toggleVideo(true); // Force enable video
        toggleAudio(true); // Force enable audio

        // Tüm video elementlerini bul
        const videoElements = document.querySelectorAll("video");

        // Local video elementini bul (muted olan)
        for (let i = 0; i < videoElements.length; i++) {
          if (videoElements[i].muted) {
            console.log("Setting local video for incoming call");
            videoElements[i].srcObject = stream;
            videoElements[i]
              .play()
              .catch((e) => console.error("Error playing local video:", e));
            break;
          }
        }
      }

      socket.emit("answerCall", { appointmentId });

      await createPeerConnection();
    } catch (error) {
      console.error("Error accepting call:", error);
      toastErrorNotify("Error accepting call: " + error.message);
    }
  };

  // End the call
  const endCall = () => {
    if (currentAppointmentId) {
      socket.emit("endCall", { appointmentId: currentAppointmentId });
    }

    // Stop all tracks
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }

    if (screenStream.current) {
      screenStream.current.getTracks().forEach((track) => track.stop());
    }

    // Stop remote tracks
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      remoteStream = null;
    }

    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Reset state
    dispatch(setCallStatus("idle"));
    setCurrentAppointmentId(null);
    setRemoteUserId(null);
    setConnectionAttempts(0);
    setPeerConnectionState("closed");
    setIceConnectionState("closed");
    setIsNegotiating(false);
    clearTimeout(negotiationTimeout);

    // Navigate back if needed
    if (window.location.pathname === "/video-call") {
      navigate("/dashboard");
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
      console.error("Error getting media devices:", error);
      dispatch(fetchFail());
      toastErrorNotify("Error getting media devices: " + error.message);
    }
  };

  const toggleVideo = (forceEnable = false) => {
    if (localStream.current) {
      const videoTracks = localStream.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const newState = forceEnable ? true : !isVideoOn;
        videoTracks.forEach((track) => {
          track.enabled = newState;
        });
        dispatch(setIsVideoOn(newState));
      }
    }
  };

  const toggleAudio = (forceEnable = false) => {
    if (localStream.current) {
      const audioTracks = localStream.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const newState = forceEnable ? true : !isAudioOn;
        audioTracks.forEach((track) => {
          track.enabled = newState;
        });
        dispatch(setIsAudioOn(newState));
      }
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
          video: {
            deviceId: { exact: deviceId },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
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
          audio: {
            deviceId: { exact: deviceId },
            echoCancellation: true,
            noiseSuppression: true,
          },
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
      // If already sharing screen, stop sharing
      if (screenStream.current) {
        screenStream.current.getTracks().forEach((track) => track.stop());
        screenStream.current = null;

        // Replace track in peer connection
        if (peerConnection.current && localStream.current) {
          const senders = peerConnection.current.getSenders();
          const videoSender = senders.find(
            (sender) => sender.track && sender.track.kind === "video"
          );

          if (videoSender && localStream.current.getVideoTracks().length > 0) {
            videoSender.replaceTrack(localStream.current.getVideoTracks()[0]);
          }
        }

        toastSuccessNotify("Screen sharing stopped");
        return;
      }

      // Start screen sharing
      screenStream.current = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          displaySurface: "monitor",
        },
      });

      // Replace track in peer connection
      if (peerConnection.current) {
        const senders = peerConnection.current.getSenders();
        const videoSender = senders.find(
          (sender) => sender.track && sender.track.kind === "video"
        );

        if (videoSender && screenStream.current.getVideoTracks().length > 0) {
          videoSender.replaceTrack(screenStream.current.getVideoTracks()[0]);
        }
      }

      // Handle when user stops sharing screen
      screenStream.current.getVideoTracks()[0].onended = () => {
        screenStream.current = null;

        // Replace track in peer connection
        if (peerConnection.current && localStream.current) {
          const senders = peerConnection.current.getSenders();
          const videoSender = senders.find(
            (sender) => sender.track && sender.track.kind === "video"
          );

          if (videoSender && localStream.current.getVideoTracks().length > 0) {
            videoSender.replaceTrack(localStream.current.getVideoTracks()[0]);
          }
        }

        toastSuccessNotify("Screen sharing stopped");
      };

      toastSuccessNotify("Screen sharing started");
    } catch (err) {
      console.error("Error sharing screen:", err);
      toastErrorNotify("Error sharing screen: " + err.message);
    }
  };

  // Check WebRTC compatibility
  const checkWebRTCSupport = () => {
    const isWebRTCSupported =
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.RTCPeerConnection;

    if (!isWebRTCSupported) {
      toastErrorNotify(
        "Your browser doesn't support WebRTC. Please use a modern browser like Chrome, Firefox, or Safari."
      );
      return false;
    }

    return true;
  };

  return {
    localStream,
    peerConnection,
    screenStream,
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
    initiateCall,
    acceptCall,
    endCall,
    resetConnection,
    peerConnectionState,
    iceConnectionState,
    checkWebRTCSupport,
  };
};

export default useVideoCall;
