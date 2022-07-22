import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import Badge from "../util/Badges";
import AppText from "../components/ui/AppText";
import BadgeContainer from "../components/ui/BadgeContainer";
import { useAppSelector } from "../hooks/redux-hooks";

function DefaultHomeScreen() {
  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  return (
    <View>
      <CardWithTitleAndContent title="My progress today">
        <Progress.Bar
          progress={stepCount / 10000}
          width={null}
          height={20}
          style={styles.progressBar}
        />
        <View style={styles.progressDataContainer}>
          <AppText style={styles.progressDataText}>{stepCount} steps</AppText>
          <AppText style={styles.progressDataBadgeText}>Goal: 10000 </AppText>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Current Badges">
        <BadgeContainer>
          <CircularBadgeDisplay
            size={60}
            badgeIcon={({ size }) => {
              return {
                comp: (
                  <Ionicons name="hourglass" color="#008C38" size={size / 2} />
                ),
                colour: "#7B017F",
              };
            }}
          />
          <CircularBadgeDisplay
            size={60}
            badgeIcon={({ size }) => {
              return {
                comp: (
                  <Ionicons name="airplane" color="#B58D54" size={size / 2} />
                ),
                colour: "#4767B8",
              };
            }}
          />
          <CircularBadgeDisplay
            size={60}
            badgeIcon={({ size }) => {
              return {
                comp: (
                  <Ionicons
                    name="alarm-sharp"
                    color="#58009F"
                    size={size / 2}
                  />
                ),
                colour: "#BD8C8C",
              };
            }}
          />
          <CircularBadgeDisplay
            size={60}
            badgeIcon={({ size }) => {
              return {
                comp: <Badge badgeId="fire" width={50} height={50} />,
                colour: "#008609",
              };
            }}
          />
        </BadgeContainer>
      </CardWithTitleAndContent>
      {/* <SvgComponent width={500} height={500} /> */}
    </View>
  );
}

export default DefaultHomeScreen;

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
