import { StyleSheet, Text, View } from "react-native";
import Card from "../components/ui/Card";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppSelector } from "../hooks/redux-hooks";
// import Badge from "../util/Badges";

function ProgressScreen() {
  const steps = useAppSelector((state) => state.stepCount.stepsToday);

  return (
    <View>
      <CardWithTitleAndContent title="Steps Today">
        <View style={styles.stepDataContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}>{steps}</Text>
        </View>
      </CardWithTitleAndContent>
      <Text>Progress Screen</Text>
      {/* <Badge /> */}
    </View>
  );
}

export default ProgressScreen;

const styles = StyleSheet.create({
  stepDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
});