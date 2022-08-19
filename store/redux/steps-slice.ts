import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { State } from "react-native-gesture-handler";
import { projectDatabase } from "../../firebase/config";
import EventEmitter from "../../util/EventEmitter";
import { writeStepsData, writeTotalSteps } from "../../util/leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    stepsFromMidnight: 0,
    stepsToday: 0,
    stepsFromWatch: 0,
    baseStepsFromWatch: 0,
    totalSteps: [] as {
      date: string;
      steps: number;
    }[],
    totalNumSteps: 0,
  },
  reducers: {
    addStepsFromMidnight: (state, action) => {
      state.stepsFromMidnight += action.payload.steps;
    },
    setStepsFromMidnight: (state, action) => {
      state.stepsFromMidnight = action.payload.steps;
    },
    addStepsToday: (state, action) => {
      state.stepsToday += action.payload.steps;
    },
    setStepsToday: (state, action) => {
      state.stepsToday = action.payload.steps;
    },
    setTotalNumSteps: (state, action) => {
      state.totalNumSteps = action.payload.totalNumSteps;
    },
    addToTotalSteps: (
      state,
      action: {
        payload: {
          result: { date: string; steps: number }[];
        };
      }
    ) => {
      const result = action.payload.result;
      for (let i = 0; i < result.length; i++) {
        // const steps = state.totalSteps[result[i].date];
        // if (!steps) {
        //   state.totalSteps[result[i].date] = result[i].steps;
        const index = state.totalSteps.findIndex(
          (val) => val.date == result[i].date
        );
        if (index != -1) {
          if (result[i] > state.totalSteps[index])
            state.totalSteps[index] = result[i];
        } else {
          state.totalSteps.push(result[i]);
        }

        // else if (result[i].steps > state.totalSteps[result[i].date]) {
        //   state.totalSteps[result[i].date] = result[i].steps;
        // }
      }
    },
    setTotalSteps: (state, action) => {
      // only for loading
      state.totalSteps = action.payload.totalSteps;
    },
    setStepsFromWatch: (state, action) => {
      state.stepsFromWatch = action.payload.stepsFromWatch;
    },
    setBaseStepsFromWatch: (state, action) => {
      state.baseStepsFromWatch = action.payload.baseStepsFromWatch;
    },
  },
});

export const sendStepsData = (steps: number, fromMidnight: boolean = false) => {
  return async (dispatch: any) => {
    try {
      if (fromMidnight) {
        await writeStepsData(steps, true);
        dispatch(setStepsFM({ steps }));
        EventEmitter.emit("steps_from_midnight", steps);
      } else {
        await writeStepsData(steps, false);
        dispatch(setStepsToday({ steps }));
        EventEmitter.emit("steps_7d", steps);
      }
    } catch (e) {
      Alert.alert("Unable to send steps data.", (e as Error).message);
    }
  };
};

export const sendStepsFromWatch = (steps: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      await AsyncStorage.setItem(
        "steps_from_watch",
        (steps + getState().stepCount.baseStepsFromWatch).toString()
      );
      dispatch(setStepsFromWatch({ stepsFromWatch: steps }));
    } catch (e) {
      console.log((e as Error).message);
    }
  };
};

export const loadStepsFromWatch = () => {
  return async (dispatch: any) => {
    try {
      const item = await AsyncStorage.getItem("steps_from_watch");
      dispatch(setBaseStepsFromWatch({ baseStepsFromWatch: Number(item) }));
      // dispatch(setStepsFromWatch({ stepsFromWatch: Number(item) }));
    } catch (e) {
      console.log((e as Error).message);
    }
  };
};

export const sendTotalSteps = (
  totalSteps: { date: string; steps: number }[]
) => {
  return async (dispatch: any) => {
    try {
      await writeTotalSteps(totalSteps);
      dispatch(addToTotalSteps({ result: totalSteps }));
      const totalNum = getTotalStepsFromArr(totalSteps);

      EventEmitter.emit("total_steps", totalNum);
      dispatch(setTotalNumSteps({ totalNumSteps: totalNum }));
    } catch (e) {
      console.log(e);
      Alert.alert("Could not send total steps", (e as Error).message);
    }
  };
};

export const resetStepsSlice = () => {
  return async (dispatch: any) => {
    dispatch(setStepsFM({ steps: 0 }));
    dispatch(setStepsToday({ steps: 0 }));
    dispatch(setStepsFromWatch({ stepsFromWatch: 0 }));
    dispatch(setBaseStepsFromWatch({ baseStepsFromWatch: 0 }));
    dispatch(setTotalSteps({ totalSteps: [] }));
    dispatch(setTotalNumSteps({ totalNumSteps: 0 }));
  };
};

// export const loadTotalSteps = (
//   totalSteps: { date: string; steps: number }[]
// ) => {
//   return async (dispatch: any) => {
//     try {
//       await writeTotalSteps(totalSteps);
//       dispatch(addToTotalSteps({ result: totalSteps }));
//       const totalNum = getTotalStepsFromArr(totalSteps);
//       console.log("Totalnum", totalNum);
//       Alert.alert(`Totalnum, ${totalNum}`);
//       EventEmitter.emit("total_steps", totalNum);
//       // dispatch(setTotalNumSteps({ totalNumSteps: totalNum }));
//     } catch (e) {
//       console.log(e);
//       Alert.alert("Could not send total steps", (e as Error).message);
//     }
//   };
// };

export function getTotalStepsFromArr(
  totalSteps: {
    date: string;
    steps: number;
  }[]
) {
  return totalSteps.reduce((prev, cur) => prev + cur.steps, 0);
}

export const addStepsFM = stepsSlice.actions.addStepsFromMidnight;
export const setStepsFM = stepsSlice.actions.setStepsFromMidnight;
export const addStepsToday = stepsSlice.actions.addStepsToday;
export const setStepsToday = stepsSlice.actions.setStepsToday;
export const addToTotalSteps = stepsSlice.actions.addToTotalSteps;
export const setTotalSteps = stepsSlice.actions.setTotalSteps;
export const setTotalNumSteps = stepsSlice.actions.setTotalNumSteps;
export const setStepsFromWatch = stepsSlice.actions.setStepsFromWatch;
export const setBaseStepsFromWatch = stepsSlice.actions.setBaseStepsFromWatch;
export default stepsSlice.reducer;
