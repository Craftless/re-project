import { StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { requestStepsToday } from "../util/steps";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps = useAppSelector((state) => state.stepCount.stepsToday);

  return (
    <View>
      <CardWithTitleAndContent title="Steps (Last 24 Hours)">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {steps}
          </AppText>
          <Button onPress={() => {
            requestStepsToday(dispatch);
          }} mode="text" >
            <Ionicons name="refresh" size={24} color="gray" />
          </Button>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="My Badges">
        <View style={styles.stepDataContainer}>
          <AppText>Work in progress</AppText>
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
  },
});
