import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { PermissionStatus, useCameraPermissions } from "expo-image-picker";
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  hasStartedLocationUpdatesAsync,
  LocationAccuracy,
  LocationObject,
  LocationPermissionResponse,
  LocationSubscription,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
  watchPositionAsync,
} from "expo-location";
import { isTaskDefined } from "expo-task-manager";
import { Dispatch } from "react";
import { Alert, AppState, AppStateStatus } from "react-native";
import { updateLocation } from "../store/redux/location-slice";


// Location no longer used

export function getLocation() {}

export async function verifyFGLocationPermissions(
  locationPermissionsInformation: LocationPermissionResponse
) {
  const { status } = locationPermissionsInformation;
  if (status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestForegroundPermissionsAsync();

    return permissionResponse.granted;
  }
  if (
    status === PermissionStatus.DENIED ||
    !locationPermissionsInformation.canAskAgain
  ) {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant foreground location permissions to allow this app to track how far you have walked."
    );
    return false;
  }
  return true;
}

export async function verifyBGLocationPermissions(
  locationPermissionsInformation: LocationPermissionResponse
) {
  const { status } = locationPermissionsInformation;
  if (status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestBackgroundPermissionsAsync();

    return permissionResponse.granted;
  }
  if (
    status === PermissionStatus.DENIED ||
    !locationPermissionsInformation.canAskAgain
  ) {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant background location permissions to allow this app to track how far you have walked in the background."
    );
    return false;
  }
  return true;
}

export async function startForegroundTracking(
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
    Dispatch<AnyAction>,
  foregroundSubscription: LocationSubscription | null
) {
  if (!foregroundSubscription) return;
  const { granted } = await getForegroundPermissionsAsync();
  if (!granted) {
    Alert.alert("Foreground Location Tracking Denied");
    console.log("location tracking denied");
    return;
  }
  try {
    foregroundSubscription.remove();
    foregroundSubscription = await watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
      },
      (location) => {
        dispatch(updateLocation({ location }));
      }
    );
  } catch (e) {
    console.log("Location Error", (e as Error).message);
  }
}

export function stopForegroundTracking(
  foregroundSubscription: LocationSubscription | null
) {
  if (!foregroundSubscription) return;
  foregroundSubscription.remove();
}

export async function startBackgroundTracking(LOCATION_TASK_NAME: string) {
  const { granted } = await getBackgroundPermissionsAsync();
  if (!granted) {
    console.log("location tracking denied");
    return;
  }
  const taskDefined = await isTaskDefined(LOCATION_TASK_NAME);
  if (!taskDefined) {
    console.log("Task is not defined");
    return;
  }
  const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (hasStarted) {
    console.log("Already started");
    return;
  }
  try {
    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: LocationAccuracy.High,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: false,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  } catch (e) {
    console.log("Location Error", (e as Error).message);
  }
}

export async function stopBackgroundUpdate(LOCATION_TASK_NAME: string) {
  const hasStarted = await hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (hasStarted) {
    await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log("Location tacking stopped");
  }
}
