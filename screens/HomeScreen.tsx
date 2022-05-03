import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Card from "../components/ui/Card";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import Badge from "../util/Badges";
import SvgTest from "../svgs/SvgTest";
import SvgComponent from "../svgs/SvgTest";
import AppText from "../components/ui/AppText";
import BadgeContainer from "../components/ui/BadgeContainer";

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
          <AppText style={styles.progressDataText}>x/y km walked</AppText>
          <AppText style={styles.progressDataBadgeText}>
            y - x km to next badge
          </AppText>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Current Badges">
        <BadgeContainer>
          <CircularBadgeDisplay
            backgroundColor="#7B017F"
            size={60}
            badgeIcon={({ size }) => (
              <Ionicons name="hourglass" color="#008C38" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#4767B8"
            size={60}
            badgeIcon={({ size }) => (
              <Ionicons name="airplane" color="#B58D54" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#BD8C8C"
            size={60}
            badgeIcon={({ size }) => (
              <Ionicons name="alarm-sharp" color="#58009F" size={size / 2} />
            )}
          />
          <CircularBadgeDisplay
            backgroundColor="#008609"
            size={60}
            badgeIcon={({ size }) => (
              // <Ionicons name="alarm-sharp" color="#58009F" size={size / 2} />
              <Badge badgeId="fire" width={50} height={50} />
            )}
          />
        </BadgeContainer>
      </CardWithTitleAndContent>
      {/* <SvgComponent width={500} height={500} /> */}
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
  },
});
