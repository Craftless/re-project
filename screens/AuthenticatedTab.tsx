import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import HomeScreen from "./DefaultHomeScreen";
import ProgressScreen from "./DefaultProgressScreen";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import SettingsScreen from "./SettingsStack";
import { LeaderboardTab } from "./LeaderboardScreen";
import { requestStepsToday } from "../util/steps";
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync
} from "expo-location";
import {
  verifyBGLocationPermissions,
  verifyFGLocationPermissions,
} from "../util/location";
import BadgesScreen from "./BadgesScreen";
import BadgeDetailsScreen from "./BadgeDetailsScreen";
import MoreScreen from "./MoreStack";
import {
  loadAchievementsUnlocked,
  loadExtraData,
} from "../store/redux/achievements-slice";
import { initialiseAchievements } from "../util/AchievementDatas";
import { Pedometer } from "expo-sensors";
import {
  loadStepsFromWatch,
  sendStepsFromWatch,
} from "../store/redux/steps-slice";
// import GoogleFit, { Scopes } from "react-native-google-fit";

export type RootTabParamList = {
  Home: undefined;
  Progress: undefined;
  Leaderboard: undefined;
  Settings: undefined;
  Blank: undefined;
  More: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Badges: undefined;
  BadgeDetails: {
    badgeId: string;
  };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthenticatedTab() {

  const dispatch = useAppDispatch();

  const extraDataMap = useAppSelector(
    (state) => state.achievements.idExtraDataMap
  );
  useEffect(() => {

    let unsubscribe2: Pedometer.Subscription;
    const hello = async () => {
      await dispatch(loadStepsFromWatch());
      unsubscribe2 = Pedometer.watchStepCount((result) => {
        dispatch(sendStepsFromWatch(result.steps));
      });
    };
    hello();

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
    // loadTotalSteps(dispatch);

    const initAchievements = async () => {
      await dispatch(loadExtraData());
      console.log("MAP IS", extraDataMap);
      await dispatch(loadAchievementsUnlocked(initialiseAchievements));
    };

    initAchievements();
    const locationStuff = async () => {
      const permissionInfo = await getForegroundPermissionsAsync();
      const foregroundGranted = await verifyFGLocationPermissions(
        permissionInfo
      );
      if (foregroundGranted) {
        await verifyBGLocationPermissions(
          await getBackgroundPermissionsAsync()
        );
        // foregroundSubscription = await watchPositionAsync({
        //   accuracy: LocationAccuracy.High,
        // });
        // startForegroundTracking(dispatch, foregroundSubscription);
      }
    };
    // locationStuff();

    const interval = setInterval(() => {
      requestStepsToday(dispatch);
    }, 5000);

    requestStepsToday(dispatch);

    return () => {
      clearInterval(interval);
      unsubscribe2.remove();
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="BadgeDetails" component={BadgeDetailsScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
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
        component={LeaderboardTab}
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
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return <Feather name="more-horizontal" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthenticatedTab;
