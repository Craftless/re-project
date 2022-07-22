import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangeProfilePictureScreen from "./ChangeProfilePictureScreen";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../screens/AuthenticatedTab";
import DefaultSettingsScreen from "./DefaultSettingsScreen";
import EditProfileScreen from "./EditProfileScreen";
import SupportScreen from "./SupportScreen";

export type SettingsStackParamList = {
  Default: undefined;
  Support: undefined;
  EditProfile: undefined;
  ChangePfp: undefined;
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
        name="Support"
        component={SupportScreen}
        options={{
          title: "Support",
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
    </Stack.Navigator>
  );
}

export default SettingsScreen;
