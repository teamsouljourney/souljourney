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
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //devTools: process.env.NODE_ENV !== "production",
});

//! redux-persist
export let persistor = persistStore(store);

export default store;
