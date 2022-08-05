import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: {
    achievementsCompletedId: [] as string[], // Set is discouraged
    achievementIdToLevel: {} as { id: string; level: number }[],
    idExtraDataMap: {} as { [id: string]: any },
  },
  reducers: {
    addAchievement: (state, action) => {
      if (
        state.achievementsCompletedId.findIndex(
          (el) => el === action.payload.achievementId
        ) >= 0
      )
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
    setIdExtraDataMap: (state, action) => {
      state.idExtraDataMap[action.payload.id] = action.payload.extraData;
    },
    setAchievementIdLevel: (state, action) => {
      state.achievementIdToLevel[action.payload.id] = action.payload.level;
    }
  },
});

// export const sendStepsData = (steps: number) => {
//   return async (dispatch: any) => {
//     dispatch(setStepsToday({ steps }));
//     await writeStepsData(steps);
//   };
// };

export const saveExtraData = (payload: {id: string, extraData: any}) => {
  return async (dispatch: any) => {
    await AsyncStorage.setItem("idExtraDataMap", JSON.stringify(payload.extraData));
    dispatch(setIdExtraDataMap(payload));
  };
};

export const addAchievement = achievementsSlice.actions.addAchievement;
export const removeAchievement = achievementsSlice.actions.removeAchievement;
export const setIdExtraDataMap = achievementsSlice.actions.setIdExtraDataMap;
export const setAchievementIdLevel = achievementsSlice.actions.setAchievementIdLevel;
export default achievementsSlice.reducer;
