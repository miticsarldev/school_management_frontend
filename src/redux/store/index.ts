import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/uiSlice";
import authReducer from "../features/authSlice";
import { api } from "../services/apiConfig";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
