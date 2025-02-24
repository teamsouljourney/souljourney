import EmojiPicker from "emoji-picker-react";

export default function MainChatArea({
  chats,
  isEmojiPickerOpen,
  toggleEmojiPicker,
  onEmojiClick,
  emojiPickerRef,
  toggleLeftSidebar,
  toggleRightSidebar,
}) {
  const handleChats = (e) => {};
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
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">SP</span>
          </div>
          <button onClick={toggleRightSidebar} className="text-left">
            <p className="font-medium">Sarah Parker</p>
            <p className="text-sm text-green-500">Online</p>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">SP</span>
          </div>
          <div>
            <div className="bg-gray-100 rounded-lg p-3">
              <p>Hi! How are you doing?</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">12:03 PM</span>
          </div>
        </div>
        <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
          <div className="text-right">
            <div className="bg-blue-500 text-white rounded-lg p-3">
              <p>Hey! I'm good, thanks for asking. How about you?</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">12:05 PM</span>
          </div>
        </div>
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
          value={chats}
          onChange={(e) => handleChats(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
        />
        <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white">
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
