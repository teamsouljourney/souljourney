import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
//*redux-persist
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


//*redux-persist
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig,authReducer)

//! reduxtoolkit store
const store = configureStore({
  reducer: {
   
    auth: persistedReducer,
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
export let persistor = persistStore(store)

export default store;
