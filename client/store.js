import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pinsSlice from "./redux/pinsSlice";

const persistConfig = {
  key: "user",
  storage,
};


const persistedUserReducer = persistReducer(persistConfig, userSlice);


const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    pins: pinsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
