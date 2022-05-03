import { StyleSheet, Text, View } from "react-native";
import AppText from "../components/ui/AppText";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppSelector } from "../hooks/redux-hooks";
// import Badge from "../util/Badges";

function DefaultProgressScreen() {
  const steps = useAppSelector((state) => state.stepCount.stepsToday);

  return (
    <View>
      <CardWithTitleAndContent title="Steps Today">
        <View style={styles.stepDataContainer}>
          <AppText style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}>{steps}</AppText>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="My Badges">
        <View style={styles.stepDataContainer}>
        </View>
      </CardWithTitleAndContent>
    </View>
  );
}

export default DefaultProgressScreen;

const styles = StyleSheet.create({
  stepDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});