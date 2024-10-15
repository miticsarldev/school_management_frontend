import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/uiSlice";
import authReducer from "../features/authSlice";
import timetableReducer from"../features/timetableSlice"
import eventReducer from "../features/eventSlice";
import attendanceReducer from "../features/attedanceSlice";
import leaveReducer from "../features/leaveSlice";
import classroomReducer from "../features/classroomSlice"
import { api } from "../services/apiConfig";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    ui: uiReducer,
    timetable: timetableReducer,
    event: eventReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
    classroom:classroomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
