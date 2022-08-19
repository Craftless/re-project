import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, projectDatabase } from "../../firebase/config";
import { Alert } from "react-native";
import { achievementObjects } from "../../util/AchievementObjects";
import type { LevelableAchievement } from "../../classes/LevelableAchievement";
import EventEmitter from "../../util/EventEmitter";
import { achievements } from "../../util/AchievementDatas";

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: {
    achievementsCompletedId: [] as string[],
    achievementIdToLevel: [] as { id: string; level: number }[],
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
    setAchievements: (state, action) => {
      state.achievementsCompletedId = action.payload.achievementsCompletedId;
    },
    setIdExtraDataMap: (state, action) => {
      // console.log("DATA PURPLE: ", "extraData", action.payload.extraData, "id", action.payload.id, "idExtraDataMap", state.idExtraDataMap);
      // TODO IMPORTANT PEC fix this
      if (action.payload.extraData && action.payload.id && state.idExtraDataMap)
        state.idExtraDataMap[action.payload.id] = action.payload.extraData;
    },
    replaceIdExtraDataMap: (
      state,
      action: { payload: { idExtraDataMap: { [id: string]: any } } }
    ) => {
      state.idExtraDataMap = action.payload.idExtraDataMap;
    },
    setAchievementIdLevel: (state, action) => {
      state.achievementIdToLevel[action.payload.id] = action.payload.level;
    },
    setIdLevelMap: (
      state,
      action: { payload: { map: { id: string; level: number }[] } }
    ) => {
      state.achievementIdToLevel = action.payload.map;
    },
  },
});

// export const sendStepsData = (steps: number) => {
//   return async (dispatch: any) => {
//     dispatch(setStepsToday({ steps }));
//     await writeStepsData(steps);
//   };
// };

export const saveExtraData = (payload: { id: string; extraData: any }) => {
  return async (dispatch: any, getState: any) => {
    Alert.alert(
      `saving extra data, ${payload.extraData}, date: ${payload.extraData.newDate}`
    );
    const idExtraDataMap: { [id: string]: any } = {
      ...getState().achievements.idExtraDataMap,
    };
    idExtraDataMap[payload.id] = payload.extraData;
    try {
      await AsyncStorage.setItem(
        "idExtraDataMap",
        JSON.stringify(idExtraDataMap)
      );
      dispatch(replaceIdExtraDataMap({idExtraDataMap}));
    } catch (e) {
      console.log(
        "Error saving idExtraDataMap from asyncstorage",
        (e as Error).message
      );
    }
  };
};

export const loadExtraData = () => {
  return async (dispatch: any) => {
    const idExtraDataMapS = await AsyncStorage.getItem("idExtraDataMap");
    if (!idExtraDataMapS) return;
    const idExtraDataMap: { [id: string]: any } = JSON.parse(idExtraDataMapS);
    dispatch(replaceIdExtraDataMap({ idExtraDataMap }));
  };
};

export const sendAchievementsUnlocked = (
  achievementId: string,
  level?: number
) => {
  return async (dispatch: any) => {
    if (!auth.currentUser) return;
    if (!achievementId) return;
    try {
      const obj = achievementObjects[achievementId] as LevelableAchievement;
      const level = obj?.level ?? null;
      // const extraData = obj?.extraData ?? null;
      // if (achievements[achievementId]?.levelable) {
      if (level != null && level != undefined)
        Alert.alert(`Sent level is ${level}, id is ${achievementId}.`);
      //   // setTimeout(() => {
      //   //   Alert.alert(`After level is ${obj?.level}`);
      //   // }, 10);
      // }
      await projectDatabase
        .ref(
          `userData/${auth.currentUser.uid}/achievementsCompletedId/${achievementId}`
        )
        .set({
          level: level ?? -1,
          // extraData:
        });
      dispatch(addAchievement({ achievementId }));
    } catch (e) {
      Alert.alert(
        "Sending achievements failed! Please email us to fix.",
        `Message: ${(e as Error).message}, Cause: ${(e as Error).cause}`
      );
    }
  };
};

export const loadAchievementsUnlocked = (initialiseAchievements: any) => {
  return async (dispatch: any, getState: any) => {
    if (!auth.currentUser) return;
    try {
      console.log("FirstBLUE");
      const snapshot = await projectDatabase
        .ref(`userData/${auth.currentUser.uid}/achievementsCompletedId`)
        .get();
      const value = snapshot.val();
      console.log("SnapshotVal:", value);
      if (value != null) {
        const ids: string[] = [];
        const levels: { id: string; level: number }[] = [];
        for (const key in value) {
          ids.push(key);
          levels.push({
            id: key,
            level: value[key].level,
          });
        }
        console.log("NewArr:", ids);
        await dispatch(setAchievements({ achievementsCompletedId: ids }));
        await dispatch(setIdLevelMap({ map: levels }));
        EventEmitter.emit(
          "number_of_achievements",
          getState().achievements.achievementsCompletedId.length
        );
      }
      console.log("Loaded");
      initialiseAchievements(
        getState().achievements.achievementsCompletedId,
        getState().achievements.achievementIdToLevel,
        getState().achievements.idExtraDataMap
      );
    } catch (e) {
      Alert.alert(
        "Loading achievements failed! Please email us to fix.",
        (e as Error).message
      );
    }
  };
};

export const resetAchievementsSlice = () => {
  return async (dispatch: any) => {
    dispatch(setAchievements({ achievementsCompletedId: [] }));
    dispatch(setIdExtraDataMap({ extraData: {} }));
    dispatch(setIdLevelMap({ map: [] }));
  };
};

export const addAchievement = achievementsSlice.actions.addAchievement;
export const removeAchievement = achievementsSlice.actions.removeAchievement;
export const setAchievements = achievementsSlice.actions.setAchievements;
export const setIdExtraDataMap = achievementsSlice.actions.setIdExtraDataMap;
export const replaceIdExtraDataMap =
  achievementsSlice.actions.replaceIdExtraDataMap;
export const setAchievementIdLevel =
  achievementsSlice.actions.setAchievementIdLevel;
export const setIdLevelMap = achievementsSlice.actions.setIdLevelMap;
export default achievementsSlice.reducer;
