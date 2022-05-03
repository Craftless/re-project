import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pedometer } from "expo-sensors";
import { useContext, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { AuthContext } from "../store/auth-context";
import { addSteps } from "../store/redux/steps";
import HomeScreen from "./HomeScreen";
import ProgressScreen from "./DefaultProgressScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "./SettingsStack";

export type RootTabParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
  Blank: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function AuthenticatedTab() {
  const authCtx = useContext(AuthContext);

  const stepCount = useAppSelector((state) => state.stepCount.steps);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe2 = Pedometer.watchStepCount((result) => {
      dispatch(addSteps(result.steps));
    });
    let unsub: any = () => {};
    if (authCtx.user)
      unsub = projectFirestore
        .collection("users")
        .doc(authCtx.user.uid)
        .onSnapshot((snapshot) => {});

    return () => {
      unsubscribe2;
      unsub();
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
      {/* <Tab.Screen name="Blank" component={BlankScreen} /> */}
    </Tab.Navigator>
  );
}
export default AuthenticatedTab;
