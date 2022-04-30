import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProgressScreen from "./screens/ProgressScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextProvider } from "./store/auth-context";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootTabParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {};

function AuthStack() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Log in",
          }}
        />
        <Tab.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: "Sign up",
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function AuthenticatedTab() {
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

export default function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        authCtx.authenticate(token);
      } else {
        authCtx.logout();
      }
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
