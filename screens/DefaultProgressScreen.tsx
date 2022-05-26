import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import AppText from "../components/ui/AppText";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { requestStepsToday } from "../util/steps";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Card from "../components/ui/Card";
import RegularButton from "../components/ui/RegularButton";
import EventEmitter from "../util/EventEmitter";
import React, { useReducer, useState } from "react";
import { achievements } from "../util/AchievementDatas";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import { achievementIcons } from "../util/AchievementIcons";
import { Achievement } from "../classes/Achievement";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps = useAppSelector((state) => state.stepCount.stepsToday);
  const [refreshing, setRefreshing] = useState(false);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            setRefreshing(true);
            setRefreshing(false);
          }}
          refreshing={refreshing}
        />
      }
    >
      <Card>
        <AppText>Badges Obtained:</AppText>
        {achievementIds.map((item) => {
          return (
            <React.Fragment key={item + Math.random().toFixed(3).toString()}>
              <AppText>
                {achievements[item].display.title}
              </AppText>
              <CircularBadgeDisplay
                badgeIcon={Achievement.getIconFromData(achievements[item])}
                size={60}
              />
            </React.Fragment>
          );
        })}
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
    </ScrollView>
  );
}

export default DefaultProgressScreen;

const styles = StyleSheet.create({
  stepDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
