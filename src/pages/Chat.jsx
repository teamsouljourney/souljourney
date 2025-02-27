import { useState, useRef, useEffect } from "react";
import LeftSidebar from "../components/chat/LeftSidebar";
import MainChatArea from "../components/chat/MainChatArea";
import RightSidebar from "../components/chat/RightSidebar";
import { useSelector } from "react-redux";
import useChatCall from "../hooks/useChatCall";
import useAppointmentCall from "../hooks/useAppointmentCall";
import { setSelectedUser } from "../features/chatSlice";

export default function Chat() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const rightSidebarRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { chats, selectedUser } = useSelector((state) => state.chats);
  const { getAllChats } = useChatCall();
  const { currentUser } = useSelector((state) => state.auth);
  const { getUserAppointments } = useAppointmentCall();

  useEffect(() => {
    getUserAppointments(currentUser?._id);
  }, [currentUser]);

  let userModel = currentUser?.isTherapist ? "Therapist" : "User";
  let chatWithModel = currentUser?.isTherapist ? "User" : "Therapist";

  useEffect(() => {
    if (selectedUser) {
      getAllChats(currentUser._id, userModel, selectedUser, chatWithModel);
    }
  }, [selectedUser]);

  console.log(selectedUser);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen);

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
    <div className="flex h-screen bg-white overflow-hidden">
      <LeftSidebar
        isOpen={isLeftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
      />
      <MainChatArea
        // chats={chats}
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
