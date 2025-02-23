import { useState, useRef, useEffect } from "react";
import LeftSidebar from "../components/chat/LeftSidebar";
import MainChatArea from "../components/chat/MainChatArea";
import RightSidebar from "../components/chat/RightSidebar";
import { useSelector } from "react-redux";
import useChatCall from "../hooks/useChatCall";

export default function Chat() {
  //const [chats, setChats] = useState([]);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const rightSidebarRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { chats } = useSelector((state) => state.chats);
  const { getAllChats } = useChatCall();

  useEffect(() => {
    getAllChats();
  }, []);

  // console.log(chats);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen);

  const onEmojiClick = (emojiObject) => {
 //   setChats((prevMsg) => prevMsg + emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

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
        toggleEmojiPicker={toggleEmojiPicker}
        onEmojiClick={onEmojiClick}
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