import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Pedometer } from "expo-sensors";
import { Dispatch } from "react";
import { Platform } from "react-native";
import googleFit from "react-native-google-fit";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
  addToTotalSteps,
  sendStepsData,
  sendTotalSteps,
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
  console.log("REQUESTED");
  try {
    // const startDate24h = new Date();
    // const endDate24h = new Date();
    // startDate24h.setDate(endDate24h.getDate() - 1);

    const startDateFM = new Date();
    const endDateFM = new Date();
    startDateFM.setHours(0, 0, 0, 0);


    // const result24h = await Pedometer.getStepCountAsync(
    //   startDate24h,
    //   endDate24h
    // );

    // await dispatch(sendStepsData(result24h.steps, false));
    if (Platform.OS == "ios") {
      const resultFM = await Pedometer.getStepCountAsync(startDateFM, endDateFM);
      await dispatch(sendStepsData(resultFM.steps, true));
    }
    else if (Platform.OS == "android") {
      const res = await googleFit.getDailySteps();
      if (res.length !== 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            const today = res[i].steps;
            await dispatch(sendStepsData(today[0].value, true));
          }
        }
      } else {
        console.log('Not Found');
      }
    }

    const startDate7d = new Date();
    const endDate7d = new Date();
    startDate7d.setDate(endDate7d.getDate() - 7);
    console.log(startDate7d, endDate7d);
    const result7d = await Pedometer.getStepCountAsync(startDate7d, endDate7d);
    await dispatch(sendStepsData(result7d.steps, false));

    const totalSteps = [] as {
      date: string;
      steps: number;
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
      // console.log("Date", dateThatDay, endOfThatDay);
      totalSteps.push({
        date: yyyymmddFromDate(dateThatDay),
        steps: resultRange.steps,
      });
    }
    dispatch(sendTotalSteps(totalSteps));
    // dispatch(
    //   addToTotalSteps({
    //     result: totalSteps,
    //   })
    // );
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
