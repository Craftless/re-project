import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./leaderboard-slice";
import stepsReducer from "./steps-slice";

export const store = configureStore({
  reducer: {
    stepCount: stepsReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;