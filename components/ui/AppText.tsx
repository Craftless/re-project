import { Text, TextProps } from "react-native";

function AppText(props: TextProps) {
  return <Text {...props}>{props.children}</Text>;
}

export default AppText;
