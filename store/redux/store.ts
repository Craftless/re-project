import { configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./steps-slice";

export const store = configureStore({
  reducer: {
    stepCount: stepsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;