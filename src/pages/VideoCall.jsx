import { useEffect, useState, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaDesktop,
  FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import useVideoCall from "../hooks/useVideoCall";
import AppointmentInfo from "../components/videoCall/AppointmentInfo";

export default function VideoCall() {
  const { cameras, microphones, isVideoOn, isAudioOn, callStatus } =
    useSelector((state) => state.video);

  const {
    localStream,
    cameraDropdownRef,
    microphoneDropdownRef,
    cameraDropdownOpen,
    microphoneDropdownOpen,
    initializeMedia,
    toggleVideo,
    toggleAudio,
    toggleCameraDropdown,
    toggleMicrophoneDropdown,
    getSelectedCameraLabel,
    getSelectedMicrophoneLabel, // Added getSelectedMicrophoneLabel here
    changeCamera,
    changeMicrophone,
    shareScreen,
    peerConnectionState,
    iceConnectionState,
    checkWebRTCSupport,
    resetConnection,
  } = useVideoCall();

  const [noRemoteVideo, setNoRemoteVideo] = useState(false);
  const [webRTCSupported, setWebRTCSupported] = useState(true);

  // DOM referansları doğrudan burada tutuyoruz
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteVideoContainerRef = useRef(null);

  // Video elementini yeniden oluşturmak için kullanacağımız state
  const [remoteVideoKey, setRemoteVideoKey] = useState(0);

  // Video elementini yeniden oluşturma fonksiyonu
  const recreateVideoElement = () => {
    console.log("Recreating video element");
    setRemoteVideoKey((prev) => prev + 1);
  };

  useEffect(() => {
    // Check WebRTC support
    const isSupported = checkWebRTCSupport();
    setWebRTCSupported(isSupported);

    if (!isSupported) return;

    // Initialize media on component mount
    initializeMedia()
      .then((stream) => {
        if (stream && localVideoRef.current) {
          console.log("Setting local video source with stream:", stream.id);
          localVideoRef.current.srcObject = stream;

          // Force play local video
          localVideoRef.current.play().catch((e) => {
            console.error("Error playing local video:", e);
            // Try again after a short delay
            setTimeout(() => {
              localVideoRef.current
                .play()
                .catch((err) =>
                  console.error(
                    "Second attempt to play local video failed:",
                    err
                  )
                );
            }, 1000);
          });
        } else {
          console.error("Failed to set local video: stream or ref is null", {
            stream: stream ? "exists" : "null",
            ref: localVideoRef.current ? "exists" : "null",
          });
        }
      })
      .catch((err) => {
        console.error("Error initializing media:", err);
      });

    // Cleanup function
    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Arama geldiğinde local video'yu otomatik başlatmak için yeni bir useEffect ekleyelim
  useEffect(() => {
    if (
      callStatus === "incoming" ||
      callStatus === "outgoing" ||
      callStatus === "connected"
    ) {
      console.log(
        "Call status changed, ensuring local video is active:",
        callStatus
      );

      // Eğer local stream yoksa, başlat
      if (!localStream.current) {
        initializeMedia().then((stream) => {
          if (stream && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            localVideoRef.current
              .play()
              .catch((e) => console.error("Error playing local video:", e));
          }
        });
      } else if (localVideoRef.current) {
        // Stream var ama video elementine bağlı değilse, bağla
        if (localVideoRef.current.srcObject !== localStream.current) {
          console.log("Reconnecting existing local stream to video element");
          localVideoRef.current.srcObject = localStream.current;
          localVideoRef.current
            .play()
            .catch((e) => console.error("Error playing local video:", e));
        }
      }
    }
  }, [callStatus]);

  // Check for remote video after connection
  useEffect(() => {
    if (callStatus !== "connected") return;

    const checkRemoteVideo = setInterval(() => {
      if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
        setNoRemoteVideo(true);
      } else if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        const tracks = remoteVideoRef.current.srcObject.getTracks();
        if (tracks.length === 0) {
          setNoRemoteVideo(true);
        } else {
          setNoRemoteVideo(false);
        }
      }
    }, 3000);

    return () => clearInterval(checkRemoteVideo);
  }, [callStatus, remoteVideoKey]);

  // Get connection status color
  const getConnectionStatusColor = (state) => {
    switch (state) {
      case "connected":
      case "completed":
        return "text-green-500";
      case "connecting":
      case "checking":
        return "text-yellow-500";
      case "disconnected":
      case "closed":
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Debug video elementlerini kontrol etme
  const debugVideoElements = () => {
    console.log("DEBUG VIDEO ELEMENTS:");

    if (localVideoRef.current) {
      console.log("Local video element:", {
        srcObject: localVideoRef.current.srcObject ? "exists" : "null",
        paused: localVideoRef.current.paused,
        muted: localVideoRef.current.muted,
        videoWidth: localVideoRef.current.videoWidth,
        videoHeight: localVideoRef.current.videoHeight,
      });

      // Local stream kontrolü
      if (localStream.current) {
        console.log("Local stream:", {
          active: localStream.current.active,
          id: localStream.current.id,
          tracks: localStream.current.getTracks().map((t) => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
          })),
        });
      } else {
        console.error("Local stream is null");
      }
    }

    if (remoteVideoRef.current) {
      console.log("Remote video element:", {
        srcObject: remoteVideoRef.current.srcObject ? "exists" : "null",
        paused: remoteVideoRef.current.paused,
        muted: remoteVideoRef.current.muted,
        videoWidth: remoteVideoRef.current.videoWidth,
        videoHeight: remoteVideoRef.current.videoHeight,
      });

      if (remoteVideoRef.current.srcObject) {
        const tracks = remoteVideoRef.current.srcObject.getTracks();
        console.log("Remote video tracks:", tracks.length);
        tracks.forEach((track) => {
          console.log(`Track ${track.id}:`, {
            kind: track.kind,
            enabled: track.enabled,
            readyState: track.readyState,
            muted: track.muted,
          });
        });
      }
    }
  };

  if (!webRTCSupported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-offWhite">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-red-600">
            <h2 className="text-xl font-bold">WebRTC Not Supported</h2>
          </div>
          <p className="mb-4">
            Your browser doesn't support WebRTC technology which is required for
            video calls.
          </p>
          <p className="mb-4">
            Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-offWhite">
      {/* Container for AppointmentInfo with proper spacing */}
      <div className="w-full max-w-4xl px-4 pt-6 pb-2 mx-auto">
        <AppointmentInfo />
      </div>

      {/* Connection status indicator kısmını kaldıralım */}
      <div className="flex flex-col items-center justify-center w-full h-full p-6 md:p-10">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="object-cover w-full bg-black rounded-lg shadow-lg h-72 md:h-96"
            />
            <div className="absolute px-2 py-1 text-xs text-white bg-black rounded bottom-3 left-3 bg-opacity-60">
              You
            </div>

            {/* Local video yenileme butonu - videonun üzerinde */}
            <button
              onClick={() => {
                if (localStream.current && localVideoRef.current) {
                  localVideoRef.current.srcObject = null;
                  setTimeout(() => {
                    localVideoRef.current.srcObject = localStream.current;
                    localVideoRef.current
                      .play()
                      .catch((e) =>
                        console.error("Error playing local video:", e)
                      );
                  }, 100);
                } else {
                  initializeMedia().then((stream) => {
                    if (stream && localVideoRef.current) {
                      localVideoRef.current.srcObject = stream;
                      localVideoRef.current
                        .play()
                        .catch((e) =>
                          console.error("Error playing local video:", e)
                        );
                    }
                  });
                }
              }}
              className="absolute px-2 py-1 text-xs text-white bg-black rounded top-3 right-3 bg-opacity-60 hover:bg-opacity-80"
            >
              Refresh
            </button>
          </div>

          <div className="relative" ref={remoteVideoContainerRef}>
            {/* Video elementini key ile yeniden oluşturuyoruz */}
            <video
              key={remoteVideoKey}
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
              className="object-cover w-full bg-black rounded-lg shadow-lg h-72 md:h-96"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            />
            <div className="absolute px-2 py-1 text-xs text-white bg-black rounded bottom-3 left-3 bg-opacity-60">
              Remote
            </div>

            {/* No remote video message - daha temiz bir görünüm */}
            {noRemoteVideo && callStatus === "connected" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
                <p className="mb-4 text-white">No remote video</p>
                <button
                  onClick={resetConnection}
                  className="px-3 py-1 text-sm text-white bg-black rounded bg-opacity-60 hover:bg-opacity-80"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Video elementini yeniden oluşturma butonu - daha temiz bir görünüm */}
            <button
              onClick={recreateVideoElement}
              className="absolute px-2 py-1 text-xs text-white bg-black rounded top-3 right-3 bg-opacity-60 hover:bg-opacity-80"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {/* Microphone control with dropdown */}
          <div
            className="relative flex items-center"
            ref={microphoneDropdownRef}
          >
            <button
              onClick={() => toggleAudio()}
              className="p-4 text-white transition-colors bg-gray-700 rounded-full shadow-lg hover:bg-gray-600"
            >
              {!isAudioOn ? (
                <FaMicrophoneSlash className="w-6 h-6" />
              ) : (
                <FaMicrophone className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={toggleMicrophoneDropdown}
              className="flex items-center justify-center w-8 h-8 ml-1 text-white transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
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
              onClick={() => toggleVideo()}
              className="p-4 text-white transition-colors bg-gray-700 rounded-full shadow-lg hover:bg-gray-600"
            >
              {isVideoOn ? (
                <FaVideo className="w-6 h-6" />
              ) : (
                <FaVideoSlash className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={toggleCameraDropdown}
              className="flex items-center justify-center w-8 h-8 ml-1 text-white transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
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
            className="p-4 text-white transition-colors bg-green-600 rounded-full shadow-lg hover:bg-green-500"
          >
            <FaDesktop className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
