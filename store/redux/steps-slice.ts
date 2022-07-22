import { createSlice } from "@reduxjs/toolkit";
import { projectDatabase } from "../../firebase/config";
import EventEmitter from "../../util/EventEmitter";
import { writeStepsData } from "../../util/leaderboard";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    stepsFromMidnight: 0,
    stepsToday: 0,
    totalSteps: [] as {
      date: string;
      steps: number;
    }[],
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
          state.totalSteps[index] = result[i];
        } else {
          state.totalSteps.push(result[i]);
          console.log("Pushed");
        }
      }
      for (const obj of state.totalSteps) console.log(obj);
    },
  },
});

export const sendStepsData = (steps: number, fromMidnight: boolean = false) => {
  return async (dispatch: any) => {
    if (fromMidnight) {
      dispatch(setStepsFM({ steps }));
      EventEmitter.emit("steps_from_midnight", steps);
      await writeStepsData(steps, true);
    } else {
      dispatch(setStepsToday({ steps }));
      EventEmitter.emit("steps_24hr", steps);
      await writeStepsData(steps, false);
    }
  };
};

export const addStepsFM = stepsSlice.actions.addStepsFromMidnight;
export const setStepsFM = stepsSlice.actions.setStepsFromMidnight;
export const addStepsToday = stepsSlice.actions.addStepsToday;
export const setStepsToday = stepsSlice.actions.setStepsToday;
export const addToTotalSteps = stepsSlice.actions.addToTotalSteps;
export default stepsSlice.reducer;
