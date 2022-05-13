import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Pedometer } from "expo-sensors";
import { Dispatch } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { sendStepsData, setStepsToday } from "../store/redux/steps-slice";

export async function requestStepsToday(
  dispatch: ThunkDispatch<
    {
      stepCount: {
        steps: number;
        stepsToday: number;
      };
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) {
  try {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(endDate.getDate() - 1);
    const result = await Pedometer.getStepCountAsync(startDate, endDate);
    dispatch(sendStepsData(result.steps));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
