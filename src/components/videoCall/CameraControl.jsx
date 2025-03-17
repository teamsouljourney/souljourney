import { FaVideo, FaVideoSlash, FaChevronDown } from "react-icons/fa";

const CameraControl = ({
  isVideoOn,
  cameras,
  cameraDropdownOpen,
  cameraDropdownRef,
  toggleVideo,
  toggleCameraDropdown,
  getSelectedCameraLabel,
  changeCamera,
}) => {
  return (
    <div className="relative flex items-center" ref={cameraDropdownRef}>
      <button
        onClick={() => toggleVideo()}
        className="p-4 text-white transition-colors bg-gray-700 rounded-full shadow-lg dark:bg-background-darker hover:bg-gray-600 hover:dark:bg-background-lightdark"
      >
        {isVideoOn ? (
          <FaVideo className="w-6 h-6" />
        ) : (
          <FaVideoSlash className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={toggleCameraDropdown}
        className="flex items-center justify-center w-8 h-8 ml-1 text-white transition-colors bg-gray-700 rounded-full dark:bg-background-darker hover:bg-gray-600 hover:dark:bg-background-lightdark"
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
  );
};

export default CameraControl;
