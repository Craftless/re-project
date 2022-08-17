import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { projectDatabase } from "../../firebase/config";
import EventEmitter from "../../util/EventEmitter";
import { writeStepsData, writeTotalSteps } from "../../util/leaderboard";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    stepsFromMidnight: 0,
    stepsToday: 0,
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
        const index = state.totalSteps.findIndex(
          (val) => val.date == result[i].date
        );
        if (index != -1) {
          if (result[i] > state.totalSteps[index])
            state.totalSteps[index] = result[i];
        } else {
          state.totalSteps.push(result[i]);
        }
      }
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

export const loadTotalSteps = (
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
export const setTotalNumSteps = stepsSlice.actions.setTotalNumSteps;
export default stepsSlice.reducer;
