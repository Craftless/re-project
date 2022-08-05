import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";
import React from "react";
import { achievements } from "../util/AchievementDatas";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./AuthenticatedTab";
import { Achievement } from "../classes/Achievement";

function DefaultHomeScreen() {
  const stepCount = useAppSelector((state) => state.stepCount.stepsToday);
  const totalSteps = useAppSelector((state) => state.stepCount.totalSteps);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

  return (
    <ScrollView>
      <CardWithTitleAndContent title="My progress today">
        <Progress.Bar
          progress={stepCount / 75000}
          width={null}
          height={20}
          style={styles.progressBar}
        />
        <View style={styles.progressDataContainer}>
          <AppText style={styles.progressDataText}>{stepCount} steps</AppText>
          <AppText style={styles.progressDataBadgeText}>Goal: 75000 </AppText>
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent
        title="My Badges"
        onPress={() => {
          navigation.navigate("Badges");
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {achievementIds.map((item) => {
            return (
              <React.Fragment key={item + Math.random().toFixed(4).toString()}>
                <CircularBadgeDisplay
                  badgeIcon={Achievement.getIconFromData(achievements[item])}
                  size={60}
                />
              </React.Fragment>
            );
          })}
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="TEST">
        <>
          {totalSteps.map((val) => {
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
                <AppText>Level: {achievements[val].level ?? "None"}</AppText>
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
