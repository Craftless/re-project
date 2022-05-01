import { Text, View } from "react-native";
import RegularButton from "../components/ui/RegularButton";
import { auth } from "../firebase/config";

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
      <RegularButton onPress={() => {
        auth.signOut();
      }}>Logout</RegularButton>
    </View>
  );
}

export default SettingsScreen;
