import { Platform } from "react-native";
import { Button } from "react-native-paper";

const platform = Platform.OS;

// Originally had custom styling, but now just a shell for react-native-paper's button

function RegularButton(props: any) {
  return <Button mode="contained" {...props} />;
}

export default RegularButton;
