"use client";

import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useChatCall from "../../hooks/useChatCall";
import { BiSend } from "react-icons/bi";

export default function MainChatArea({
  isEmojiPickerOpen,
  setIsEmojiPickerOpen,
  toggleEmojiPicker,
  emojiPickerRef,
  toggleLeftSidebar,
  toggleRightSidebar,
}) {
  const { chats, selectedUser, socket, isConnected } = useSelector(
    (state) => state.chats
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserAppointments } = useSelector(
    (state) => state.appointments
  );
  const { createChat, initializeSocket, getAllChats } = useChatCall();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isOnline, setIsOnline] = useState(currentUser?.isOnline);
  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);

  // Make sure socket is initialized and reconnect if needed
  useEffect(() => {
    if (!socket || !isConnected) {
      console.log("Socket not initialized or connected, initializing...");
      initializeSocket();
    }

    // Check connection status periodically
    const intervalId = setInterval(() => {
      if (socket && !isConnected) {
        console.log("Socket disconnected, attempting to reconnect...");
        socket.connect();
        setIsOnline(!isOnline);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [socket, isConnected]);

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser && currentUser) {
      console.log("Selected user changed, fetching messages...");
      getAllChats(
        currentUser._id,
        currentUser.isTherapist ? "Therapist" : "User",
        selectedUser,
        currentUser.isTherapist ? "User" : "Therapist"
      );
    }
  }, [selectedUser, currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chats]); // Removed messagesContainerRef dependency

  const messageData = {
    senderId: currentUser?._id,
    senderModel: currentUser?.isTherapist === true ? "Therapist" : "User",
    recieverId: selectedUser,
    recieverModel: currentUser?.isTherapist === true ? "User" : "Therapist",
    content: message,
  };

  const handleChats = async (e) => {
    e.preventDefault();
    if (!messageData?.content.trim() || !selectedUser) return;

    setIsSending(true);
    try {
      await createChat(messageData);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

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

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMsg) =>
      prevMsg ? prevMsg + emojiObject.emoji : emojiObject.emoji
    );
    setIsEmojiPickerOpen(false);
  };

  // Filter messages for the current chat
  const currentChatMessages = chats.filter(
    (chat) =>
      (chat.senderId === currentUser?._id &&
        chat.recieverId === selectedUser) ||
      (chat.recieverId === currentUser?._id && chat.senderId === selectedUser)
  );

  const sortedChats = [...currentChatMessages].sort((a, b) => {
    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
  });

  console.log(message);

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
          {selectedUser && selectedUserData?.[0] && (
            <>
              <div
                className="w-10 h-10 rounded-full border-2 border-seaGreen-light flex items-center justify-center cursor-pointer"
                onClick={toggleRightSidebar}
              >
                {selectedUserData[0]?.image ? (
                  <img
                    alt=""
                    src={selectedUserData[0]?.image || "/placeholder.svg"}
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
                  {selectedUserData[0]?.firstName.toUpperCase()}{" "}
                  {selectedUserData[0]?.lastName.toUpperCase()}
                </p>
              </button>
            </>
          )}
        </div>

        {/* Connection status indicator */}
        {socket && (
          <div
            className={`px-2 py-1 rounded-full text-xs ${
              isConnected
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isConnected ? "Connected" : "Reconnecting..."}
          </div>
        )}
      </div>

      {!selectedUser && (
        <div className="text-center mt-12  dark:text-offWhite">
          <p>{"Please select a person before starting the chat!"}</p>
        </div>
      )}

      {/* Messages Area */}
      {selectedUser && (
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          ref={messagesContainerRef}
        >
          {sortedChats.length === 0 ? (
            <div className="text-center text-navy dark:text-offWhite my-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            sortedChats.map((chat) => (
              <div
                className={`flex gap-3 ${
                  chat.senderId === currentUser?._id
                    ? "ml-auto justify-end"
                    : "mr-auto justify-start"
                }`}
                key={chat?._id || Math.random().toString()}
              >
                <div>
                  <div
                    className={`-light rounded-3xl p-3 max-w-xs sm:max-w-md ${
                      chat.senderId === currentUser?._id
                        ? "bg-pastelGreen-light rounded-br-none"
                        : "bg-mauve-light/50 rounded-tl-none"
                    }`}
                  >
                    <p className="overflow-auto break-words text-navy-light dark:text-offWhite-dark ">
                      {chat?.content}
                    </p>
                  </div>
                  <div
                    className={`text-xs dark:text-offWhite-dark text-navy mt-1 ${
                      chat.senderId === currentUser?._id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {chat?.createdAt ? (
                      <>
                        {new Date(chat?.createdAt).toLocaleDateString()}
                        {" - "}
                        {new Date(chat?.createdAt).toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      "Sending..."
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing indicator (optional) */}
          {isSending && (
            <div className="flex gap-3 mr-auto justify-start">
              <div className="bg-gray-100 rounded-3xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message Input */}
      {selectedUser && (
        <form
          onSubmit={handleChats}
          className="p-4 border-t flex gap-2 items-center justify-center relative"
        >
          <button
            type="button"
            className="p-2 hover:bg-offWhite-dark dark:hover:bg-background-lightdark text-pastelGreen rounded-full"
            onClick={toggleEmojiPicker}
            disabled={isSending}
          >
            <svg
              className="w-5 h-5 "
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
          <textarea
            type="text"
            rows="1"
            placeholder={isSending ? "Sending..." : "Type a message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border-[1px] border-offWhite-dark text-navy dark:text-offWhite  resize-none overflow-hidden bg-inherit dark:bg-background-lightdark rounded-xl focus:outline-none focus:border-seaGreen-light"
            disabled={isSending}
          />
          <button
            type="submit"
            className={`p-3 rounded-full ${
              isSending || !message.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-offWhite-dark dark:hover:bg-background-lightdark"
            }`}
            disabled={isSending || !message.trim()}
          >
            <BiSend className="text-pastelGreen text-3xl" />
          </button>

          {/* Emoji Picker */}
          {isEmojiPickerOpen && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-16 left-4 z-50"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </form>
      )}
    </div>
  );
}
