import { StatusBar } from "expo-status-bar";

import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import AuthenticatedTab from "./screens/AuthenticatedTab";
import AuthStack from "./screens/AuthStack";
import AppLoading from "expo-app-loading";
import { auth } from "./firebase/config";
import merge from "deepmerge";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  Alert,
  AppState,
  AppStateStatus,
  ColorSchemeName,
  useColorScheme,
} from "react-native";
import * as TaskManager from "expo-task-manager";
import { LocationObject } from "expo-location";
import {
  startBackgroundTracking,
  startForegroundTracking,
  stopBackgroundUpdate,
  stopForegroundTracking,
} from "./util/location";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";

export function getTheme(colorScheme: ColorSchemeName) {
  const CombinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
  const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme);
  let theme = CombinedDefaultTheme;
  if (colorScheme === "dark") theme = CombinedDarkTheme;
  return theme;
}

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";
let foregroundSubscription = null;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data as { locations: LocationObject[] };
    const location = locations[0];
    if (location) {
      console.log("Location in background", location.coords);
    }
  }
});

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <AuthContextProvider>
          <PaperProvider theme={theme}>
            <Root />
          </PaperProvider>
        </AuthContextProvider>
      </Provider>
    </>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [waitingForEvent, setWaitingForEvent] = useState(true);
  const foregroundSub = useAppSelector((state) => state.location.foregroundSub);
  const dispatch = useAppDispatch();
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  const levelMaps = useAppSelector(
    (state) => state.achievements.achievementIdToLevel
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        authCtx
          .authenticate(user)
          .then((token) => {
            setWaitingForEvent(false);
          })
          .catch((error) => Alert.alert(error));
      } else {
        authCtx.logout();
        setWaitingForEvent(false);
      }
    });
    AppState.addEventListener("change", onAppStateChanged);
    return () => {
      unsubscribe();
      AppState.removeEventListener("change", onAppStateChanged);
    };
  }, []);

  function onAppStateChanged(newState: AppStateStatus) {
    try {
      if (newState.match(/inactive|background/)) {
        stopForegroundTracking(foregroundSub);
        startBackgroundTracking(LOCATION_TASK_NAME);
      } else {
        stopBackgroundUpdate(LOCATION_TASK_NAME);
        startForegroundTracking(dispatch, foregroundSub);
      }
    } catch (e) {
      console.log("Location Error", (e as Error).message);
    }
  }

  return waitingForEvent ? <AppLoading /> : <Navigation />;
}

export function Navigation() {
  const authCtx = useContext(AuthContext);

  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);

  return (
    <NavigationContainer theme={theme}>
      {!authCtx.isLoggedIn && <AuthStack />}
      {authCtx.isLoggedIn && <AuthenticatedTab />}
    </NavigationContainer>
  );
}
