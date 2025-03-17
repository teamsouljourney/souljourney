import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useVideoCall from "../hooks/useVideoCall";
import AppointmentInfo from "../components/videoCall/AppointmentInfo";
import MicrophoneControl from "../components/videoCall/MicrophoneControl";
import CameraControl from "../components/videoCall/CameraControl";
import ScreenShareControl from "../components/videoCall/ScreenShareControl";

const VideoCall = () => {
  const { cameras, microphones, isVideoOn, isAudioOn, callStatus } =
    useSelector((state) => state.video);

  const {
    localStream,
    toggleVideo,
    toggleAudio,
    initializeMedia,
    getSelectedCameraLabel,
    getSelectedMicrophoneLabel,
    changeCamera,
    changeMicrophone,
    shareScreen,
    resetConnection,
    checkWebRTCSupport,
  } = useVideoCall();

  const [cameraDropdownOpen, setCameraDropdownOpen] = useState(false);
  const [microphoneDropdownOpen, setMicrophoneDropdownOpen] = useState(false);
  const [noRemoteVideo, setNoRemoteVideo] = useState(false);
  const [webRTCSupported, setWebRTCSupported] = useState(true);
  const [remoteVideoKey, setRemoteVideoKey] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteVideoContainerRef = useRef(null);
  const cameraDropdownRef = useRef(null);
  const microphoneDropdownRef = useRef(null);

  const recreateVideoElement = () => {
    console.log("Recreating video element");
    setRemoteVideoKey((prev) => prev + 1);
  };

  const refreshLocalVideo = () => {
    if (localStream.current && localVideoRef.current) {
      localVideoRef.current.srcObject = null;
      setTimeout(() => {
        localVideoRef.current.srcObject = localStream.current;
        localVideoRef.current
          .play()
          .catch((e) => console.error("Error playing local video:", e));
      }, 100);
    } else {
      initializeMedia().then((stream) => {
        if (stream && localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current
            .play()
            .catch((e) => console.error("Error playing local video:", e));
        }
      });
    }
  };

  const handleToggleCameraDropdown = () => {
    setCameraDropdownOpen(!cameraDropdownOpen);
    setMicrophoneDropdownOpen(false);
  };

  const handleToggleMicrophoneDropdown = () => {
    setMicrophoneDropdownOpen(!microphoneDropdownOpen);
    setCameraDropdownOpen(false);
  };

  useEffect(() => {
    // Check WebRTC support
    const isSupported = checkWebRTCSupport();
    setWebRTCSupported(isSupported);

    if (!isSupported) return;

    // Initialize media on component mount but don't enable tracks
    initializeMedia(false)
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

  // Determine if controls should be shown
  const showControls =
    callStatus === "connected" ||
    callStatus === "outgoing" ||
    callStatus === "incoming";

  if (!webRTCSupported) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-offWhite dark:bg-background-dark">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-red-600">
            <h2 className="text-xl font-bold">WebRTC Not Supported</h2>
          </div>
          <p className="mb-4">
            Your browser doesnt support WebRTC technology which is required for
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
    <div className="flex flex-col min-h-screen bg-offWhite dark:bg-background-dark">
      {/* Container for AppointmentInfo with proper spacing */}
      <div className="w-full max-w-4xl px-4 pt-6 pb-2 mx-auto">
        <AppointmentInfo />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-6 md:p-10">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Local Video */}
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              data-webrtc="local"
              className="object-cover w-full bg-black rounded-lg shadow-lg h-72 md:h-96"
            />
            <div className="absolute px-2 py-1 text-xs text-white bg-black rounded bottom-3 left-3 bg-opacity-60">
              You
            </div>

            {/* Local video refresh button - only show during active call */}
            {showControls && (
              <button
                onClick={refreshLocalVideo}
                className="absolute px-2 py-1 text-xs text-white bg-black rounded top-3 right-3 bg-opacity-60 hover:bg-opacity-80"
              >
                Refresh
              </button>
            )}
          </div>

          {/* Remote Video */}
          <div className="relative" ref={remoteVideoContainerRef}>
            {/* Video element recreated with key */}
            <video
              key={remoteVideoKey}
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
              data-webrtc="remote"
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

            {/* No remote video message */}
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

            {/* Video element recreation button - only show during active call */}
            {showControls && (
              <button
                onClick={recreateVideoElement}
                className="absolute px-2 py-1 text-xs text-white bg-black rounded top-3 right-3 bg-opacity-60 hover:bg-opacity-80"
              >
                Refresh
              </button>
            )}
          </div>
        </div>

        {/* Controls - only show during active call */}
        {showControls && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            {/* Microphone Control */}
            <MicrophoneControl
              isAudioOn={isAudioOn}
              microphones={microphones}
              microphoneDropdownOpen={microphoneDropdownOpen}
              microphoneDropdownRef={microphoneDropdownRef}
              toggleAudio={toggleAudio}
              toggleMicrophoneDropdown={handleToggleMicrophoneDropdown}
              getSelectedMicrophoneLabel={getSelectedMicrophoneLabel}
              changeMicrophone={changeMicrophone}
            />

            {/* Camera Control */}
            <CameraControl
              isVideoOn={isVideoOn}
              cameras={cameras}
              cameraDropdownOpen={cameraDropdownOpen}
              cameraDropdownRef={cameraDropdownRef}
              toggleVideo={toggleVideo}
              toggleCameraDropdown={handleToggleCameraDropdown}
              getSelectedCameraLabel={getSelectedCameraLabel}
              changeCamera={changeCamera}
            />

            {/* Screen Share Control */}
            <ScreenShareControl shareScreen={shareScreen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
