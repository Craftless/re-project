import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import AppText from "../components/ui/AppText";
import Card from "../components/ui/Card";
import { achievements } from "../util/AchievementDatas";
import { RootStackParamList } from "./AuthenticatedTab";
import { ProgressStackParamList } from "./ProgressStack";

function BadgeDetailsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "BadgeDetails">) {
  const item = route.params.badgeId;
  return <Card>
    <AppText style={styles.titleText}>{achievements[item].display.title}</AppText>
  </Card>
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

export default BadgeDetailsScreen;
