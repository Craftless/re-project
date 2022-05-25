import { createSlice } from "@reduxjs/toolkit";
import { Achievement } from "../../classes/Achievement";
import { projectDatabase } from "../../firebase/config";
import { writeStepsData } from "../../util/leaderboard";

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: {
    achievementsCompletedId: [] as string[],
  },
  reducers: {
    addAchievement: (state, action) => {
      state.achievementsCompletedId.push(action.payload.achievementId);
    },
    removeAchievement: (state, action) => {
      state.achievementsCompletedId = state.achievementsCompletedId.filter((el) => {
        el !== action.payload.achievementId;
      });
    },
  },
});

// export const sendStepsData = (steps: number) => {
//   return async (dispatch: any) => {
//     dispatch(setStepsToday({ steps }));
//     await writeStepsData(steps);
//   };
// };



export const addAchievement = achievementsSlice.actions.addAchievement;
export const removeAchievement = achievementsSlice.actions.removeAchievement;
export default achievementsSlice.reducer;
