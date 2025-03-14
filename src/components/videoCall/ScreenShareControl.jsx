import { FaDesktop } from "react-icons/fa";

export default function ScreenShareControl({ shareScreen }) {
  return (
    <button
      onClick={shareScreen}
      className="p-4 text-white transition-colors bg-green-600 rounded-full shadow-lg hover:bg-green-500"
    >
      <FaDesktop className="w-6 h-6" />
    </button>
  );
}
