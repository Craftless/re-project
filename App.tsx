import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { auth } from "./firebase/config";

import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import AuthenticatedTab from "./screens/AuthenticatedTab";
import AuthStack from "./screens/AuthStack";

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isLoggedIn && <AuthStack />}
      {authCtx.isLoggedIn && <AuthenticatedTab />}
    </NavigationContainer>
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

    return () => unsubscribe();
  }, []);

  return waitingForEvent ? <AppLoading /> : <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </Provider>
    </>
  );
}
