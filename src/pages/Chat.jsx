import { useState, useRef, useEffect } from "react";
import LeftSidebar from "../components/chat/LeftSidebar";
import MainChatArea from "../components/chat/MainChatArea";
import RightSidebar from "../components/chat/RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import useChatCall from "../hooks/useChatCall";
import useAppointmentCall from "../hooks/useAppointmentCall";

export default function Chat() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const rightSidebarRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { chats, selectedUser, socket, isConnected } = useSelector(
    (state) => state.chats
  );
  const { getAllChats, initializeSocket } = useChatCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { getUserAppointments } = useAppointmentCall();
  const dispatch = useDispatch();

  // Define user models based on current user type
  const userModel = currentUser?.isTherapist ? "Therapist" : "User";
  const chatWithModel = currentUser?.isTherapist ? "User" : "Therapist";

  // Fetch user appointments when component mounts
  useEffect(() => {
    if (currentUser?._id) {
      getUserAppointments(currentUser._id);
    }
  }, [currentUser]);

  // Initialize socket when component mounts
  useEffect(() => {
    if (currentUser?._id && !socket) {
      initializeSocket();
    }
  }, [currentUser, socket]);

  useEffect(() => {
    // let interval;

    if (selectedUser && currentUser?._id) {
      getAllChats(currentUser._id, userModel, selectedUser, chatWithModel);
    }
  }, [selectedUser, currentUser, userModel, chatWithModel]);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen);

  // Close sidebars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rightSidebarRef.current &&
        !rightSidebarRef.current.contains(event.target)
      ) {
        setIsRightSidebarOpen(false);
      }
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-background-dark">
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
      />
      <MainChatArea
        isEmojiPickerOpen={isEmojiPickerOpen}
        setIsEmojiPickerOpen={setIsEmojiPickerOpen}
        toggleEmojiPicker={toggleEmojiPicker}
        emojiPickerRef={emojiPickerRef}
        toggleLeftSidebar={toggleLeftSidebar}
        toggleRightSidebar={toggleRightSidebar}
      />
      <RightSidebar isOpen={isRightSidebarOpen} sidebarRef={rightSidebarRef} />

      {/* Overlay for mobile left sidebar */}
      {isLeftSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleLeftSidebar}
        ></div>
      )}
    </div>
  );
}
