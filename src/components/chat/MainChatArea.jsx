import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useChatCall from "../../hooks/useChatCall";
import { useSocket } from "../../context/SocketContext";
import { createChatSuccess } from "../../features/chatSlice";
import { BiSend } from "react-icons/bi";

export default function MainChatArea({
  isEmojiPickerOpen,
  setIsEmojiPickerOpen,
  toggleEmojiPicker,
  emojiPickerRef,
  toggleLeftSidebar,
  toggleRightSidebar,
}) {
  const { chats, selectedUser } = useSelector((state) => state.chats);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const { createChat } = useChatCall();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const messageData = {
    senderId: currentUser?._id,
    senderModel: currentUser?.isTherapist === true ? "Therapist" : "User",
    recieverId: selectedUser,
    recieverModel: currentUser?.isTherapist === true ? "User" : "Therapist",
    content: message,
  };

  const handleChats = (e) => {
    e.preventDefault();
    if (!messageData?.content.trim() || !selectedUser) return;
    createChat(messageData);
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  console.log("socket", socket);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      dispatch(createChatSuccess({ data: newMessage }));
      console.log(newMessage);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, createChat, dispatch]);

  const selectedUserData = currentUser?.isTherapist
    ? currentUserAppointments
        ?.filter(
          (user) => user?.userId?._id?.toString() === selectedUser?.toString()
        )
        .map((user) => user?.userId)
    : currentUserAppointments
        ?.filter(
          (user) =>
            user?.therapistId?._id?.toString() === selectedUser?.toString()
        )
        .map((user) => user?.therapistId);

  console.log("selectedUserData", selectedUserData);

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMsg) =>
      prevMsg ? prevMsg + emojiObject.emoji : emojiObject.emoji
    );
    setIsEmojiPickerOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Chat Header */}

      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={toggleLeftSidebar}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {selectedUser && (
            <>
              <div
                className="w-10 h-10 rounded-full border-2 border-seaGreen-light flex items-center justify-center cursor-pointer"
                onClick={toggleRightSidebar}
              >
                {selectedUserData[0]?.image ? (
                  <img
                    alt=""
                    src={selectedUserData[0]?.image}
                    className="rounded-full size-8"
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full size-8 bg-navy-dark">
                    <span className="text-sm font-medium text-offWhite-light">
                      {selectedUserData[0]?.firstName.charAt(0).toUpperCase() +
                        selectedUserData[0]?.lastName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <button className="text-left" onClick={toggleRightSidebar}>
                <p className="font-medium text-navy dark:text-offWhite">
                  {selectedUserData[0]?.firstName}{" "}
                  {selectedUserData[0]?.lastName}
                </p>
                <p className="text-sm text-green-500">Online</p>
              </button>
            </>
          )}
        </div>
      </div>

      {!selectedUser && (
        <div className="text-center mt-12 text-navy dark:text-offWhite">
          <p>{"Please select a person before starting the chat!"}</p>
        </div>
      )}

      {/* Messages Area */}
      {selectedUser && (
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={messagesContainerRef}
        >
          {chats?.map((chat) => (
            <div
              className={`flex gap-3 ${
                chat.senderModel === "User"
                  ? "ml-auto justify-end"
                  : "mr-auto justify-start"
              }`}
              key={chat?.createdAt}
            >
              <div>
                <div
                  className={`text-navy-light rounded-3xl p-3 max-w-xs sm:max-w-md ${
                    chat.senderModel === "User"
                      ? "bg-pastelGreen-light"
                      : "bg-mauve-light/50"
                  }`}
                >
                  <p className="overflow-auto break-words">{chat?.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(chat?.createdAt).toLocaleDateString()}
                  {" - "}
                  {new Date(chat?.createdAt).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Input */}
      {selectedUser && (
        <form
          onSubmit={handleChats}
          className="p-4 border-t flex gap-2 relative"
        >
          <button
            type="button"
            className="p-2 hover:bg-offWhite-dark rounded-full"
            onClick={toggleEmojiPicker}
          >
            <svg
              className="w-5 h-5 text-navy"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-seaGreen-light"
          />

          <button
            type="submit"
            className="p-4 hover:bg-offWhite-light rounded-full"
          >
            <BiSend className="text-seaGreen-light text-3xl" />
          </button>

          {/* Emoji Picker */}
          {isEmojiPickerOpen && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-full left-0 mb-2"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </form>
      )}
    </div>
  );
}
