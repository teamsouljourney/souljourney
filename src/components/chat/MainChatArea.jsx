import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useChatCall from "../../hooks/useChatCall";

export default function MainChatArea({
  isEmojiPickerOpen,
  toggleEmojiPicker,
  onEmojiClick,
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
  const [message, setMessage] = useState("");
  console.log(selectedUser);

  const messageData = {
    senderId: currentUser?._id,
    senderModel: currentUser?.isTherapist === true ? "Therapist" : "User",
    recieverId: selectedUser?.userId,
    recieverModel: selectedUser?.userModel,
    content: message,
  };

  const handleChats = (e) => {
    createChat(messageData);
    setMessage("");
  };

  const selectedUserData = currentUserAppointments?.filter(
    (user) => user.therapistId._id === selectedUser?.userId
  );

  console.log(selectedUserData);

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Chat Header */}
      {selectedUserData?.map((item) => (
        <div
          className="p-4 border-b flex items-center justify-between"
          key={item.therapistId._id}
        >
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
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              {item.therapistId.image ? (
                <img
                  alt=""
                  src={item.therapistId.image}
                  className="rounded-full size-6 sm:size-8"
                />
              ) : (
                <div className="flex items-center justify-center rounded-full size-8 bg-navy-dark">
                  <span className="text-sm font-medium text-offWhite-light">
                    {item.therapistId.firstName.charAt(0).toUpperCase() +
                      item.therapistId.lastName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <button onClick={toggleRightSidebar} className="text-left">
              <p className="font-medium">
                {item.therapistId.firstName} {item.therapistId.lastName}
              </p>
              <p className="text-sm text-green-500">Online</p>
            </button>
          </div>
        </div>
      ))}
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">SP</span>
          </div>
          <div>
            <div className="bg-gray-100 rounded-lg p-3">
              <p>Hi! How are you doing?</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">12:03 PM</span>
          </div>
        </div> */}
        {chats.map((chat) => (
          <div
            className="flex gap-3 max-w-[80%] ml-auto justify-end"
            key={chat.createdAt}
          >
            <div className="text-right">
              <div className="bg-blue-500 text-white rounded-lg p-3">
                <p>{chat.content}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {chat.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t flex gap-2 relative">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={toggleEmojiPicker}
        >
          <svg
            className="w-5 h-5 text-gray-600"
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
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white"
          onClick={handleChats}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
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
      </div>
    </div>
  );
}
