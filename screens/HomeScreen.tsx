import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Card from "../components/ui/Card";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";

function HomeScreen() {
  return (
    <View>
      <Card style={styles.progressContainer}>
        <Text style={styles.progressText}>My progress this week</Text>
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
      </Card>
      <Card style={styles.progressContainer}>
        <Text style={styles.progressText}>Current Badges</Text>
        <View style={styles.badgesContainer}>
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
      </Card>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  progressContainer: {
    // backgroundColor: "orange",
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 16,
  },
  progressBar: {
    marginVertical: 8,
  },
  progressDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontSize: 24,
  },
  progressDataText: {
    fontSize: 16,
  },
  progressDataBadgeText: {
    fontSize: 16,
  },
  badgesContainer: {
    flexDirection: "row",
    padding: 8,
  },
});
