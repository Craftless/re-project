import { createSlice } from "@reduxjs/toolkit";
import { projectDatabase } from "../../firebase/config";
import { writeStepsData } from "../../util/leaderboard";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    steps: 0,
    stepsToday: 0,
  },
  reducers: {
    addSteps: (state, action) => {
      state.steps += action.payload.steps;
    },
    removeSteps: (state, action) => {
      state.steps -= action.payload.steps;
    },
    addStepsToday: (state, action) => {
      state.stepsToday += action.payload.steps;
    },
    setStepsToday: (state, action) => {
      state.stepsToday = action.payload.steps;
    },
  },
}); 

export const sendStepsData = (steps: number) => {
  return async (dispatch: any) => {
    dispatch(setStepsToday({ steps }));
    await writeStepsData(steps);
  };
};

export const addSteps = stepsSlice.actions.addSteps;
export const removeSteps = stepsSlice.actions.removeSteps;
export const addStepsToday = stepsSlice.actions.addStepsToday;
export const setStepsToday = stepsSlice.actions.setStepsToday;
export default stepsSlice.reducer;
