import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangeProfilePictureScreen from "./ChangeProfilePictureScreen";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../screens/AuthenticatedTab";
import DefaultSettingsScreen from "./DefaultSettingsScreen";
import EditProfileScreen from "./EditProfileScreen";
import NotificationsScreen from "./NotificationsScreen";
import AboutScreen from "./AboutScreen";

export type SettingsStackParamList = {
  Default: undefined;
  EditProfile: undefined;
  ChangePfp: undefined;
  Notifications: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsScreen({
  navigation,
}: {
  navigation: BottomTabNavigationProp<RootTabParamList, "Settings">;
}) {
  return (
    <Stack.Navigator initialRouteName="Default">
      <Stack.Screen
        name="Default"
        component={DefaultSettingsScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen name="ChangePfp" component={ChangeProfilePictureScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default SettingsScreen;
