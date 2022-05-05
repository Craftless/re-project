import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppText from "../components/ui/AppText";
import { ProgressStackParamList } from "./ProgressStack";

function BadgeDetailsScreen({
  navigation,
  route,
}: NativeStackScreenProps<ProgressStackParamList, "BadgeDetails">) {
  return <AppText>BadgeDetails</AppText>;
}

export default BadgeDetailsScreen;
