import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const addSteps = stepsSlice.actions.addSteps;
export const removeSteps = stepsSlice.actions.removeSteps;
export const addStepsToday = stepsSlice.actions.addStepsToday;
export default stepsSlice.reducer;