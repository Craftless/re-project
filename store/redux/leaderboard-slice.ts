import { createSlice } from "@reduxjs/toolkit";
import { LeaderboardItem } from "../../types/leaderboard";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    leaderboard: [] as LeaderboardItem[],
  },
  reducers: {
    setLeaderboardData(
      state,
      action: { payload: { leaderboard: LeaderboardItem[] } }
    ) {
      state.leaderboard = action.payload.leaderboard;
    },
  },
});

export const setLeaderboardData = leaderboardSlice.actions.setLeaderboardData;
export default leaderboardSlice.reducer;
