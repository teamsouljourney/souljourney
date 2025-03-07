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

  // Define user models based on current user type
  const userModel = currentUser?.isTherapist ? "Therapist" : "User";
  const chatWithModel = currentUser?.isTherapist ? "User" : "Therapist";

  useEffect(() => {
    // let interval;

    if (selectedUser && currentUser?._id) {
      console.log("Fetching chats for selected user:", selectedUser);
      // Initially fetch chats once when selectedUser is available
      getAllChats(currentUser._id, userModel, selectedUser, chatWithModel);

      // Set interval to fetch chats every 15 seconds
      // interval = setInterval(() => {
      //   console.log("Fetching chats again for selected user:", selectedUser);
      //   getAllChats(currentUser._id, userModel, selectedUser, chatWithModel);
      // }, 15000); // 15000 milliseconds = 15 seconds
    }

    // Cleanup: Clear the interval when selectedUser is null or the component is unmounted
    // return () => {
    //   if (interval) clearInterval(interval);
    // };
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
    <div className="flex h-screen bg-white dark:bg-background-dark overflow-hidden">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleLeftSidebar}
        ></div>
      )}
    </div>
  );
}
