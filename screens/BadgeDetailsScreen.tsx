import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppText from "../components/ui/AppText";
import { RootStackParamList } from "./AuthenticatedTab";
import { ProgressStackParamList } from "./ProgressStack";

function BadgeDetailsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "BadgeDetails">) {
  return <AppText>BadgeDetails</AppText>;
}

export default BadgeDetailsScreen;
