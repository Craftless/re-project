import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangeProfilePictureScreen from "./ChangeProfilePictureScreen";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "./AuthenticatedTab";
import DefaultSettingsScreen from "./DefaultSettingsScreen";
import EditProfileScreen from "./EditProfileScreen";
import DefaultMoreScreen from "./DefaultMoreScreen";

export type MoreStackParamList = {
  Default: undefined;
  HeightAndWeight: undefined;
};

const Stack = createNativeStackNavigator<MoreStackParamList>();

function MoreScreen({
  navigation,
}: {
  navigation: BottomTabNavigationProp<RootTabParamList, "More">;
}) {
  return (
    <Stack.Navigator initialRouteName="Default">
      <Stack.Screen
        name="Default"
        component={DefaultMoreScreen}
        options={{
          title: "More",
        }}
      />
      <Stack.Screen
        name="HeightAndWeight"
        component={EditProfileScreen}
        options={{
          title: "Edit Height and Weight",
        }}
      />
    </Stack.Navigator>
  );
}

export default MoreScreen;
