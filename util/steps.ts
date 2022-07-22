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
    const startDate24h = new Date();
    const endDate24h = new Date();
    startDate24h.setDate(endDate24h.getDate() - 1);

    const startDateFM = new Date();
    const endDateFM = new Date();
    startDateFM.setHours(0, 0, 0, 0);

    const result24h = await Pedometer.getStepCountAsync(startDate24h, endDate24h);
    dispatch(sendStepsData(result24h.steps, false));

    const resultFM = await Pedometer.getStepCountAsync(startDateFM, endDateFM);
    dispatch(sendStepsData(resultFM.steps, true));
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
