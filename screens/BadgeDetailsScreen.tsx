import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Achievement } from "../classes/Achievement";
import AppText from "../components/ui/AppText";
import Card from "../components/ui/Card";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import { achievements } from "../util/AchievementDatas";
import { RootStackParamList } from "./AuthenticatedTab";
import { ProgressStackParamList } from "./ProgressStack";
import { Dimensions } from "react-native";

function BadgeDetailsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "BadgeDetails">) {
  const item = route.params.badgeId;
  return (
    <Card>
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>
          {achievements[item].display.title}
        </AppText>
        <CircularBadgeDisplay
          badgeIcon={Achievement.getIconFromData(achievements[item])}
          size={Dimensions.get("window").width * (2 / 3)}
        />
        <View style={styles.wordsContainer}>
          <AppText>{achievements[item].display.description}</AppText>
          {achievements[item].level && (
            <AppText>Level {achievements[item].level}</AppText>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 32,
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 8,
  },
  wordsContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
    padding: 8,
  }
});

export default BadgeDetailsScreen;
