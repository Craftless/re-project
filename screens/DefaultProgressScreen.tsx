import {
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
import { Button, TouchableRipple } from "react-native-paper";
import React, { useReducer, useState } from "react";
import { achievements } from "../util/AchievementDatas";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import { Achievement } from "../classes/Achievement";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AuthenticatedTab";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps24h = useAppSelector((state) => state.stepCount.stepsToday);
  const stepsFM = useAppSelector((state) => state.stepCount.stepsFromMidnight);
  const [refreshing, setRefreshing] = useState(false);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  const distWalked = useAppSelector((state) => state.location.distanceWalked);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

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
      {/* <Card>
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
      </Card> */}
      <CardWithTitleAndContent title="Steps Today">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {stepsFM}
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
      <CardWithTitleAndContent title="Steps (Last 7 Days)">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {steps24h}
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
      <CardWithTitleAndContent title="My Badges" onPress={() => {
        navigation.navigate("Badges");
      }}>
          <View style={styles.badgeDataContainer}>
            {/* <AppText style={{fontSize: 28}}>Work in progress</AppText> */}
            {achievementIds.map((item) => {
            return (
              <React.Fragment key={item + Math.random().toFixed(4).toString()}>
                {/* <AppText>
                  {achievements[item].display.title}
                </AppText> */}
                <CircularBadgeDisplay
                  badgeIcon={Achievement.getIconFromData(achievements[item])}
                  size={60}
                />
              </React.Fragment>
            );
          })}
          </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Distance Walked">
        <AppText>{distWalked}</AppText>
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
  badgeDataContainer: {
    flexDirection: "column",

  }
});
