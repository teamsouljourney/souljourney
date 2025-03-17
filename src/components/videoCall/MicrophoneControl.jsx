import { FaMicrophone, FaMicrophoneSlash, FaChevronDown } from "react-icons/fa";

const MicrophoneControl = ({
  isAudioOn,
  microphones,
  microphoneDropdownOpen,
  microphoneDropdownRef,
  toggleAudio,
  toggleMicrophoneDropdown,
  getSelectedMicrophoneLabel,
  changeMicrophone,
}) => {
  return (
    <div className="relative flex items-center" ref={microphoneDropdownRef}>
      <button
        onClick={() => toggleAudio()}
        className="p-4 text-white transition-colors bg-gray-700 rounded-full shadow-lg dark:bg-background-darker hover:bg-gray-600 hover:dark:bg-background-lightdark"
      >
        {!isAudioOn ? (
          <FaMicrophoneSlash className="w-6 h-6" />
        ) : (
          <FaMicrophone className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={toggleMicrophoneDropdown}
        className="flex items-center justify-center w-8 h-8 ml-1 text-white transition-colors bg-gray-700 rounded-full dark:bg-background-darker hover:bg-gray-600 hover:dark:bg-background-lightdark"
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
  );
};

export default MicrophoneControl;
