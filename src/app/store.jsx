import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import appointmentReducer from "../features/appointmentSlice";
import categoryReducer from "../features/categorySlice";
import therapistReducer from "../features/therapistSlice";
import noteReducer from "../features/noteSlice";
import blogReducer from "../features/blogSlice";
import calendarReducer from "../features/calendarSlice";
import chatReducer from "../features/chatSlice";


import feedbackReducer from "../features/feedbackSlice";

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
    chats: chatReducer,
    

    feedbacks: feedbackReducer
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
