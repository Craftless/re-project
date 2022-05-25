import { createSlice } from "@reduxjs/toolkit";

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: {
    achievementsCompletedId: [] as string[], // Set is discouraged
  },
  reducers: {
    addAchievement: (state, action) => {
      if (state.achievementsCompletedId.findIndex(el => el === action.payload.achievementId) >= 0)
        return;
      state.achievementsCompletedId.push(action.payload.achievementId);
    },
    removeAchievement: (state, action) => {
      state.achievementsCompletedId = state.achievementsCompletedId.filter(
        (el) => {
          el !== action.payload.achievementId;
        }
      );
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
