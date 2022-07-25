import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import AppText from "../components/ui/AppText";
import MenuItem from "../components/ui/MenuItem";
import MenuItems from "../components/ui/MenuItems";
import { MoreStackParamList } from "./MoreStack";

function MoreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MoreStackParamList, "Default">>();
  return <ScrollView>
    <MenuItems list={[{ label: "Height and Weight", nav: "HeightAndWeight"}]} navigationProp={navigation} />
  </ScrollView>
}
export default MoreScreen;