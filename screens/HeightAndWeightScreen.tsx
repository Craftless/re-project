import { View } from "react-native";
import { TextInput } from "react-native-paper";
import AppText from "../components/ui/AppText";
import Input from "../components/ui/Input";

function HeightAndWeightScreen() {
  return (
    <View>
      <AppText>Height And Weight Screen</AppText>
      <TextInput mode="flat" autoComplete="off" />
    </View>
  );
}

export default HeightAndWeightScreen;
