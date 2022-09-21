import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, projectDatabase } from "../../firebase/config";
import { Alert } from "react-native";
import { achievementObjects } from "../../util/AchievementObjects";
import type { LevelableAchievement } from "../../classes/LevelableAchievement";
import EventEmitter from "../../util/EventEmitter";

const achievementsSlice = createSlice({
  name: "achievements",
  initialState: {
    achievementsCompletedId: [] as string[],
    achievementIdToLevel: [] as { id: string; level: number }[],
    idExtraDataMap: {} as { [id: string]: any },
    idDateMap: {} as { [id: string]: string },
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
    replaceIdDateMap: (
      state,
      action: { payload: { idDateMap: { [id: string]: string } } }
    ) => {
      state.idDateMap = action.payload.idDateMap;
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
    // Alert.alert(
    //   `saving extra data, ${payload.extraData}, date: ${payload.extraData.newDate}`
    // );
    const idExtraDataMap: { [id: string]: any } = {
      ...getState().achievements.idExtraDataMap,
    };
    idExtraDataMap[payload.id] = payload.extraData;
    try {
      await AsyncStorage.setItem(
        "idExtraDataMap",
        JSON.stringify(idExtraDataMap)
      );
      dispatch(replaceIdExtraDataMap({ idExtraDataMap }));
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
  return async (dispatch: any, getState: any) => {
    if (!auth.currentUser) return;
    if (!achievementId) return;
    // if (getState().achievements.achievementsCompletedId.includes(achievementId)) {
    //   if (level == null || level == undefined) return;
    //   const find = (getState().achievements.achievementIdToLevel as { id: string; level: number }[]).find(val => val.id == achievementId);
    //   if (find && find.level >= level) return;
    // }
    try {
      const obj = achievementObjects[achievementId] as LevelableAchievement;
      const level = obj?.level ?? null;
      const idDateMap: { [id: string]: string } = {
        ...getState().achievements.idDateMap,
      };
      let date = idDateMap[achievementId];
      if (!date) date = new Date().toString();

      
      const find = (getState().achievements.achievementIdToLevel as { id: string; level: number }[]).find(val => val.id == achievementId);
      if (find && find.level < level){
        date = new Date().toString();
      }
      console.log("IDDATEMAP:", idDateMap);
      idDateMap[achievementId] = date;
      await projectDatabase
        .ref(
          `userData/${auth.currentUser.uid}/achievementsCompletedId/${achievementId}`
        )
        .set({
          level: level ?? -1,
          date: date,
        });
      dispatch(addAchievement({ achievementId }));
      dispatch(replaceIdDateMap({ idDateMap }));
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
        const idDateMap: { [id: string]: string } = {};
        for (const key in value) {
          ids.push(key);
          levels.push({
            id: key,
            level: value[key].level,
          });
          idDateMap[key] = value[key].date || "None";
        }
        console.log("NewArr:", ids);
        await dispatch(setAchievements({ achievementsCompletedId: ids }));
        await dispatch(setIdLevelMap({ map: levels }));
        await dispatch(replaceIdDateMap({ idDateMap }));
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
export const replaceIdDateMap = achievementsSlice.actions.replaceIdDateMap;
export const setAchievementIdLevel =
  achievementsSlice.actions.setAchievementIdLevel;
export const setIdLevelMap = achievementsSlice.actions.setIdLevelMap;
export default achievementsSlice.reducer;
