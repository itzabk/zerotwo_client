import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
