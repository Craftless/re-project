import { createSlice } from "@reduxjs/toolkit";
import { LocationObject, LocationSubscription } from "expo-location";
import { getDistanceFromLatLonInKm } from "../../util/math";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    distanceWalked: 0,
    lastLocation: {} as LocationObject,
    foregroundSub: null as LocationSubscription | null,
  },
  reducers: {
    updateLocation(state, action) {
      const newLocation: LocationObject = action.payload.location;
      const speed = newLocation.coords.speed;
      if (speed && speed <= 20) {
        const dist = getDistanceFromLatLonInKm(
          state.lastLocation.coords.latitude,
          state.lastLocation.coords.longitude,
          newLocation.coords.latitude,
          newLocation.coords.longitude
        );
        state.distanceWalked += dist;
      }
      state.lastLocation = newLocation;
    },
    setForegroundSub(state, action) {
      state.foregroundSub = action.payload.foregroundSub;
    }
  },
});

export const updateLocation = locationSlice.actions.updateLocation;
export const setForegroundSub = locationSlice.actions.setForegroundSub;
export default locationSlice.reducer;