import { achievements } from "../../util/AchievementDatas";
import { Achievement } from "../../classes/Achievement";
import AppText from "../ui/AppText";
import Card from "../ui/Card";
import CircularBadgeDisplay from "../ui/CircularBadgeDisplay";
import { StyleSheet, View } from "react-native";

function BadgeDisplay({ item }: { item: string }) {
  return (
    <Card>
      <View style={styles.outerContainer}>
        <CircularBadgeDisplay
          badgeIcon={Achievement.getIconFromData(achievements[item])}
          size={60}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.titleText}>{achievements[item].display.title}</AppText>
          <AppText>{achievements[item].display.description}</AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
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

export default BadgeDisplay;
