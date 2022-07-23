import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AuthContext } from "../store/auth-context";
import HomeScreen from "./DefaultHomeScreen";
import ProgressScreen from "./DefaultProgressScreen";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import SettingsScreen from "./SettingsStack";
import LeaderboardScreen from "./LeaderboardScreen";
import { requestStepsToday } from "../util/steps";
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  LocationAccuracy,
  requestBackgroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import {
  startForegroundTracking,
  verifyBGLocationPermissions,
  verifyFGLocationPermissions,
} from "../util/location";
import { updateLocation } from "../store/redux/location-slice";
import BadgesScreen from "./BadgesScreen";
import BadgeDetailsScreen from "./BadgeDetailsScreen";
import MoreScreen from "./MoreScreen";

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
    badgeId: string,
  };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthenticatedTab() {
  const authCtx = useContext(AuthContext);

  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  const foregroundSubscription = useAppSelector(
    (state) => state.location.foregroundSub
  );
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
    locationStuff();

    const interval = setInterval(() => {
      requestStepsToday(dispatch);
    }, 5000);

    requestStepsToday(dispatch);

    return () => {
      clearInterval(interval);
      // unsubscribe2;
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{
        headerShown: false,
      }} />
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
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return <Feather name="more-horizontal" size={size} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AuthenticatedTab;
