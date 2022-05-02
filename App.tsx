import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProgressScreen from "./screens/ProgressScreen";
import SettingsScreen from "./screens/SettingsStack";

import { Pedometer } from "expo-sensors";

import { auth } from "./firebase/config";

import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AppLoading from "expo-app-loading";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/redux/store";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import { addSteps } from "./store/redux/steps";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootTabParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Log in",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: "Sign up",
          }}
        />
      </Stack.Navigator>
    </>
  );
}

function AuthenticatedTab() {
  const stepCount = useAppSelector((state) => state.stepCount.steps);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe2 = Pedometer.watchStepCount((result) => {
      dispatch(addSteps(result.steps));
    });

    return () => {
      unsubscribe2;
    };
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return <Ionicons name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return <Ionicons name="person" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return <Ionicons name="settings" color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

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

    return () => {
      unsubscribe;
    };
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
