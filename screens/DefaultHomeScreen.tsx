import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AuthenticatedTab";
import { useTheme } from "react-native-paper";
import { achievementObjects } from "../util/AchievementObjects";
import { LevelableAchievement } from "../classes/LevelableAchievement";
import BadgesPreview from "../components/badges/BadgesPreview";

function DefaultHomeScreen() {
  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  const totalSteps = useAppSelector((state) => state.stepCount.totalSteps);
  const [refreshing, setRefreshing] = useState(false);
  console.log("TOTALSTEPS GOOSE", totalSteps);
  const totalNumSteps = useAppSelector(
    (state) => state.stepCount.totalNumSteps
  );
  const watchedSteps = useAppSelector(
    (state) => state.stepCount.stepsFromWatch
  );
  const baseWatchedSteps = useAppSelector(
    (state) => state.stepCount.baseStepsFromWatch
  );
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

  const theme = useTheme();

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
      <CardWithTitleAndContent title="My progress today">
        <Progress.Bar
          progress={stepCount / 75000}
          width={null}
          height={20}
          style={styles.progressBar}
          color={theme.colors.primary}
        />
        <View style={styles.progressDataContainer}>
          <AppText style={styles.progressDataText}>{stepCount} steps</AppText>
          <AppText style={styles.progressDataBadgeText}>Goal: 75000 </AppText>
        </View>
        <View>
          <AppText>Total steps: {totalNumSteps}</AppText>
          <AppText>Watched: {watchedSteps + baseWatchedSteps}</AppText>
        </View>
      </CardWithTitleAndContent>
      <BadgesPreview
        onPress={() => {
          navigation.navigate("Badges");
        }}
        achievementIds={achievementIds}
      />
      <CardWithTitleAndContent title="TEST">
        <>
          {!!totalSteps &&
            totalSteps.map((val) => {
              return (
                <React.Fragment key={val.date}>
                  <AppText>Date: {val.date}</AppText>
                  <AppText>Steps: {val.steps}</AppText>
                </React.Fragment>
              );
            })}
        </>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Achievements">
        <>
          {achievementIds.map((val) => {
            return (
              <React.Fragment key={val}>
                <AppText>Id: {val}</AppText>
                <AppText>
                  Level:{" "}
                  {(achievementObjects[val] as LevelableAchievement)?.level ??
                    "None"}
                </AppText>
              </React.Fragment>
            );
          })}
        </>
      </CardWithTitleAndContent>
      {/* <SvgComponent width={500} height={500} /> */}
    </ScrollView>
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
