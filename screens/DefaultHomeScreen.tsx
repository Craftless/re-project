import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AuthenticatedTab";
import { useTheme } from "react-native-paper";
import { achievementObjects } from "../util/AchievementObjects";
import { LevelableAchievement } from "../classes/LevelableAchievement";
import BadgesPreview from "../components/badges/BadgesPreview";
import { totalNumStepsGoals } from "../constants/values";
// import GoogleFit from "react-native-google-fit";

function DefaultHomeScreen() {
  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  const totalSteps = useAppSelector((state) => state.stepCount.totalSteps);
  const extraDataMap: { [id: string]: any } = useAppSelector(
    (state) => state.achievements.idExtraDataMap
  );
  const [refreshing, setRefreshing] = useState(false);
  const totalNumSteps = useAppSelector(
    (state) => state.stepCount.totalNumSteps
  );
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

  const theme = useTheme();

  const currentGoalIndex = totalNumStepsGoals.reduce((prev, cur, curIndex, arr) => {
    if (totalNumSteps < arr[curIndex]) return prev;
    else return curIndex;
  }, 0);
  let currentGoal;
  if (totalNumStepsGoals.length <= currentGoalIndex + 1) currentGoal = totalNumStepsGoals[totalNumStepsGoals.length - 1];
  else currentGoal = totalNumStepsGoals[currentGoalIndex + 1];

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
      <CardWithTitleAndContent title="My Steps">
        <AppText style={{ fontSize: 18, fontWeight: "500" }}>
          Last 7 Days:
        </AppText>
        <Progress.Bar
          progress={stepCount / 75000}
          width={null}
          height={20}
          style={styles.progressBar}
          color={theme.colors.primary}
          borderColor={theme.colors.backdrop}
        />
        <View style={styles.progressDataContainer}>
          <AppText style={styles.progressDataText}>{stepCount} steps</AppText>
          <AppText style={styles.progressDataBadgeText}>Goal: 70000 </AppText>
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: theme.colors.disabled,
            borderRadius: 1,
          }}
        />
        <View>
          <AppText style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
            Total steps:
          </AppText>
          <Progress.Bar
            progress={totalNumSteps / currentGoal}
            width={null}
            height={20}
            style={styles.progressBar}
            color={theme.colors.primary}
            borderColor={theme.colors.backdrop}
          />
          <View style={styles.progressDataContainer}>
            <AppText style={styles.progressDataText}>{totalNumSteps} total steps</AppText>
            <AppText style={styles.progressDataBadgeText}>Goal: {currentGoal} </AppText>
          </View>
          {/* <AppText>{totalNumSteps}</AppText> */}
          {/* <AppText>Google Fit Authorised Status: {String(GoogleFit.isAuthorized)}</AppText> */}
        </View>
      </CardWithTitleAndContent>
      <BadgesPreview
        onPress={() => {
          navigation.navigate("Badges");
        }}
        achievementIds={achievementIds}
      />
      {/* <CardWithTitleAndContent title="TEST">
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
      </CardWithTitleAndContent> */}
      {/* <CardWithTitleAndContent title="EXTRA DATA">
        <>
          {!!extraDataMap &&
            extraDataMap.map((val) => {
              return (
                <React.Fragment key={val.}>
                  <AppText>Date: {val.date}</AppText>
                  <AppText>Steps: {val.steps}</AppText>
                </React.Fragment>
              );
            })}
        </>
      </CardWithTitleAndContent> */}
      {/* <CardWithTitleAndContent title="Achievements">
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
      </CardWithTitleAndContent> */}
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
    marginBottom: 10,
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
