import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Pedometer } from "expo-sensors";
import { Dispatch } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
  addToTotalSteps,
  sendStepsData,
  setStepsToday,
} from "../store/redux/steps-slice";
import { yyyymmddFromDate } from "./math";

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

    const result24h = await Pedometer.getStepCountAsync(
      startDate24h,
      endDate24h
    );
    dispatch(sendStepsData(result24h.steps, false));

    const resultFM = await Pedometer.getStepCountAsync(startDateFM, endDateFM);
    dispatch(sendStepsData(resultFM.steps, true));

    const totalSteps = [] as {
      date: string,
      steps: number,
    }[];

    const dateToday = new Date();
    for (let i = 0; i < 7; i++) {
      const dateThatDay = new Date();
      dateThatDay.setDate(dateToday.getDate() - i);
      dateThatDay.setHours(0, 0, 0, 0);
      const endOfThatDay = new Date();
      endOfThatDay.setDate(dateToday.getDate() - i);
      endOfThatDay.setHours(23, 59, 59, 999);
      const resultRange = await Pedometer.getStepCountAsync(
        dateThatDay,
        endOfThatDay
      );
      console.log(dateThatDay, endOfThatDay);
      totalSteps.push({ date: yyyymmddFromDate(dateThatDay), steps: resultRange.steps });
    }

    dispatch(
      addToTotalSteps({
        result: totalSteps,
      })
    );
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
