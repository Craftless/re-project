import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pedometer } from "expo-sensors";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AuthContext } from "../store/auth-context";
import HomeScreen from "./HomeScreen";
import ProgressScreen from "./DefaultProgressScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsStack";
import LeaderboardScreen from "./LeaderboardScreen";
import { requestStepsToday } from "../util/steps";

export type RootTabParamList = {
  Home: undefined;
  Progress: undefined;
  Leaderboard: undefined;
  Settings: undefined;
  Blank: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function AuthenticatedTab() {
  const authCtx = useContext(AuthContext);

  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const unsubscribe2 = Pedometer.watchStepCount((result) => {
    //   dispatch(addSteps(result.steps));
    // });

    // setInterval(async () => {
    //   if (!auth.currentUser) return;
    //   const user = auth.currentUser;
    //   const item = {
    //     displayName: user.displayName || user.email || "None",
    //     pfpUrl: user.photoURL,
    //   };
    //   await writeUserData({
    //     displayName: item.displayName,
    //     pfpUrl: item.pfpUrl || "None",
    //   });
    // }, 6000);

    const interval = setInterval(() => {
      requestStepsToday(dispatch);
    }, 60000)

    return () => {
      clearInterval(interval);
      // unsubscribe2;
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
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return (
              <MaterialIcons name="leaderboard" size={size} color={color} />
            );
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
export default AuthenticatedTab;
