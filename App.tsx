import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";

import { useCallback, useContext, useEffect, useState } from "react";
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
  Button,
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
  View,
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
import AppText from "./components/ui/AppText";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export function getTheme(colorScheme: ColorSchemeName) {
  const CombinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
  const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme);
  let theme = CombinedDefaultTheme;
  if (colorScheme === "dark") theme = CombinedDarkTheme;
  return theme;
}

export default function App() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  const [isConnected, setIsConnected] = useState(null as boolean | null);

  function checkIsConnected() {
    NetInfo.fetch().then((state) => {
      const ic = state.isConnected;
      setIsConnected(ic ?? false);
    });
  }

  useEffect(() => {
    checkIsConnected();
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  return (
    <>
      <StatusBar style="auto" />
      {!isConnected && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AppText>You are not connected to the internet.</AppText>
          <Button mode="outlined" onPress={checkIsConnected}>
            Try Again
          </Button>
        </View>
      )}
      {isConnected && (
        <Provider store={store}>
          <AuthContextProvider>
            <PaperProvider theme={theme}>
              <Root />
            </PaperProvider>
          </AuthContextProvider>
        </Provider>
      )}
    </>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [waitingForEvent, setWaitingForEvent] = useState(true);
  const foregroundSub = useAppSelector((state) => state.location.foregroundSub);
  const dispatch = useAppDispatch();

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
        authCtx.logout(dispatch);
        setWaitingForEvent(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
