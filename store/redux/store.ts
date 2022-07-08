import { configureStore } from "@reduxjs/toolkit";
import achievementsReducer from "./achievements-slice";
import leaderboardReducer from "./leaderboard-slice";
import locationReducer from "./location-slice";
import stepsReducer from "./steps-slice";

export const store = configureStore({
  reducer: {
    stepCount: stepsReducer,
    location: locationReducer,
    leaderboard: leaderboardReducer,
    achievements: achievementsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;