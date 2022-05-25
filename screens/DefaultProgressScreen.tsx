import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { requestStepsToday } from "../util/steps";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Card from "../components/ui/Card";
import { testAchievement } from "../classes/Achievement";
import RegularButton from "../components/ui/RegularButton";
import EventEmitter from "../util/EventEmitter";
import { useReducer } from "react";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps = useAppSelector((state) => state.stepCount.stepsToday);
  const [, refreshScreen] = useReducer((x) => x, 0);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );

  return (
    <View>
      <RegularButton
        onPress={() => {
          refreshScreen();
        }}
      >
        REfresh
      </RegularButton>
      <Card>
        <AppText>{testAchievement.title}</AppText>
        <AppText>
          {testAchievement.isComplete ? "Complete" : "Incomplete"}
        </AppText>
        <FlatList
          data={achievementIds}
          keyExtractor={(item) => {
            return item + Math.random().toFixed(3).toString();
          }}
          renderItem={(data) => <AppText>{data.item}</AppText>}
        />
        <RegularButton
          onPress={() => {
            EventEmitter.emit("test");
          }}
        >
          Click
        </RegularButton>
      </Card>
      <CardWithTitleAndContent title="Steps (Last 24 Hours)">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {steps}
          </AppText>
          <Button
            onPress={() => {
              requestStepsToday(dispatch);
            }}
            mode="text"
          >
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
