import { createSlice } from "@reduxjs/toolkit";
import { LeaderboardItem } from "../../types/leaderboard";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    lb_steps_week: [] as LeaderboardItem[],
    lb_steps_from_midnight: [] as LeaderboardItem[],
    lb_totalNumSteps: [] as LeaderboardItem[],
  },
  reducers: {
    set7dStepsLBData(
      state,
      action: { payload: { lb_steps_week: LeaderboardItem[] } }
    ) {
      state.lb_steps_week = action.payload.lb_steps_week;
    },
    setSFMLBData(state, action) {
      state.lb_steps_from_midnight = action.payload.lb_steps_from_midnight;
    },
    setTotalNumStepsData(state, action) {
      state.lb_totalNumSteps = action.payload.lb_totalNumSteps;
    }
  },
});

export const set7dStepsLBData = leaderboardSlice.actions.set7dStepsLBData;
export const setSFMLBData = leaderboardSlice.actions.setSFMLBData;
export const setTotalNumStepsData = leaderboardSlice.actions.setTotalNumStepsData;
export default leaderboardSlice.reducer;
