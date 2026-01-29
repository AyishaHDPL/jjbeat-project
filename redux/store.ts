import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import forgetUserReducer from "./slices/forgetuserslice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    forgetUser: forgetUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
