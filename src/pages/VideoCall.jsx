import { useEffect } from "react";
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

export default function VideoCall() {
  const { cameras, microphones, isVideoOn, isAudioOn } = useSelector(
    (state) => state.video
  );

  const {
    localStream,
    remoteStream,
    localVideoRef,
    remoteVideoRef,
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
    getSelectedMicrophoneLabel,
    changeCamera,
    changeMicrophone,
    shareScreen,
  } = useVideoCall();

  useEffect(() => {
    initializeMedia().then((stream) => {
      if (stream && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });
  }, []);

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
            {!isAudioOn ? (
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
