import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.slice";
import TokenReducer from "./slice/token.slice";
import { persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "token"],
};

const reducer = combineReducers({
  user: UserReducer,
  token: TokenReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

//Lấy ra rootstate và appdispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
