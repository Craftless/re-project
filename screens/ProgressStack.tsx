import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgeDetailsScreen from "./BadgeDetails";
import DefaultProgressScreen from "./DefaultProgressScreen";

export type ProgressStackParamList = {
  Default: undefined;
  BadgeDetails: undefined;
};

const Stack = createNativeStackNavigator<ProgressStackParamList>();

function ProgressStack() {
  return (
    <Stack.Navigator initialRouteName="Default">
      <Stack.Screen name="Default" component={DefaultProgressScreen} />
      <Stack.Screen name="BadgeDetails" component={BadgeDetailsScreen} />
    </Stack.Navigator>
  );
}

export default ProgressStack;