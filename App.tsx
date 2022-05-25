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
import { ColorSchemeName, useColorScheme } from "react-native";
import { initialiseAchievements } from "./util/AchievementDatas";

function getTheme(colorScheme: ColorSchemeName) {
  const CombinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
  const CombinedDarkTheme = merge(NavigationDarkTheme, PaperDarkTheme);
  let theme = CombinedDefaultTheme;
  if (colorScheme === "dark") theme = CombinedDarkTheme;
  return theme;
}

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        authCtx.authenticate(user).then((token) => {
          setWaitingForEvent(false);
        });
      } else {
        authCtx.logout();
        setWaitingForEvent(false);
      }
    });
    initialiseAchievements();

    return () => unsubscribe();
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
