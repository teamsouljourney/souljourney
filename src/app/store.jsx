import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import appointmentReducer from "../features/appointmentSlice";
import categoryReducer from "../features/categorySlice";
import therapistReducer from "../features/therapistSlice";
import noteReducer from "../features/noteSlice";
import blogReducer from "../features/blogSlice";
import calendarReducer from "../features/calendarSlice";
import userReducer from "../features/userSlice";
import paginationReducer from "../features/paginationSlice";
import chatReducer from "../features/chatSlice";
import feedbackReducer from "../features/feedbackSlice";
import notificationReducer from "../features/notificationSlice";
import videoReducer from "../features/videoSlice";

//*redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//*redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

//! reduxtoolkit store
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    appointments: appointmentReducer,
    categories: categoryReducer,
    therapists: therapistReducer,
    notes: noteReducer,
    blogs: blogReducer,
    calendar: calendarReducer,
    users: userReducer,
    pagination: paginationReducer,
    chats: chatReducer,
    feedbacks: feedbackReducer,
    notifications: notificationReducer,
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Redux Persist actions
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // Add your socket-related actions here
          // Chat actions
          "chats/setSocket",
          "chats/setSocketConnected",
          "chats/setUserConnected",
          "chats/receiveMessage",
          "chats/updateOnlineUsers",
          // Notification actions
          "notifications/receiveNewNotification",
          // Video actions
          "video/setDevices",
          "video/setHaveMedia",
          "video/setIsAudioOn",
          "video/setIsVideoOn",
          "video/setMediaStatus",
          "video/setSelectedDevices",
          "video/setCallStatus",
        ],
        // Ignore specific paths in  state that might contain non-serializable values
        ignoredPaths: ["chats.socket"],
      },
    }),
  //devTools: process.env.NODE_ENV !== "production",
});

//! redux-persist
export const persistor = persistStore(store);

export default store;
