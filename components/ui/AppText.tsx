import { TextProps } from "react-native";
import { Text } from "react-native-paper";

function AppText(props: TextProps) {
  return <Text {...props}>{props.children}</Text>;
}

export default AppText;
