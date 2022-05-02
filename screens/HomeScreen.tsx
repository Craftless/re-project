import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Card from "../components/ui/Card";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";

function HomeScreen() {
  return (
    <View>
      <CardWithTitleAndContent title="My progress this week">
        <Progress.Bar
          progress={0.3}
          width={null}
          height={20}
          style={styles.progressBar}
        />
        <View style={styles.progressDataContainer}>
          <Text style={styles.progressDataText}>x/y km walked</Text>
          <Text style={styles.progressDataBadgeText}>
            y - x km to next badge
          </Text>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Current Badges">
        <View style={styles.badgesDisplayContainer}>
          <CircularBadgeDisplay
            backgroundColor="#7B017F"
            size={50}
            badgeIcon={({ size }) => (
              <Ionicons name="hourglass" color="#008C38" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#4767B8"
            size={50}
            badgeIcon={({ size }) => (
              <Ionicons name="airplane" color="#B58D54" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#BD8C8C"
            size={50}
            badgeIcon={({ size }) => (
              <Ionicons name="alarm-sharp" color="#58009F" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#008609"
            size={50}
            badgeIcon={({ size }) => (
              <Ionicons name="hourglass" color="#0700C5" size={size / 2} />
            )}
          />
        </View>
      </CardWithTitleAndContent>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  progressBar: {
    marginVertical: 8,
  },
  progressDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressDataText: {
    fontSize: 16,
  },
  progressDataBadgeText: {
    fontSize: 16,
  },
  badgesDisplayContainer: {
    flexDirection: "row",
    // padding: 8,
  },
});
