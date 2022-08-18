import {
  RefreshControl,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import AppText from "../components/ui/AppText";
import CardWithTitleAndContent from "../components/ui/CardWithTitleAndContent";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { requestStepsToday } from "../util/steps";
import { Ionicons } from "@expo/vector-icons";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import React, { useReducer, useState } from "react";
import { achievements } from "../util/AchievementDatas";
import CircularBadgeDisplay from "../components/ui/CircularBadgeDisplay";
import { Achievement } from "../classes/Achievement";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AuthenticatedTab";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BarChart } from "react-native-chart-kit";
import { hexToRGB, yyyymmddToString } from "../util/math";
import { AchievementHelper } from "../classes/AchievementHelper";
import BadgesPreview from "../components/badges/BadgesPreview";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps24h = useAppSelector((state) => state.stepCount.stepsToday);
  const stepsFM = useAppSelector((state) => state.stepCount.stepsFromMidnight);
  const totalStepsSel = useAppSelector((state) => state.stepCount.totalSteps);
  const totalSteps = totalStepsSel ? [...totalStepsSel]
    .sort((a, b) => Number(a.date) - Number(b.date))
    .slice(0, 5) : undefined;
  const [refreshing, setRefreshing] = useState(false);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );

  const theme = useTheme();
  const distWalked = useAppSelector((state) => state.location.distanceWalked);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

  // const chartConfig = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity:2 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  //   decimalPlaces: 0,
  // };

  let colours;

  colours = {
    backgroundGradientFrom: "#E5E5E5",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#CECECE",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) =>
      theme.dark
        ? hexToRGB(theme.colors.primary, opacity)
        : `rgba(50, 50, 82, ${opacity})`,
  };
  if (theme.dark) {
    colours = {
      backgroundGradientFrom: theme.colors.onSurface,
      backgroundGradientFromOpacity: 0.1,
      backgroundGradientTo: theme.colors.onSurface,
      backgroundGradientToOpacity: 0.1,
      color: (opacity = 1) => hexToRGB(theme.colors.primary, opacity),
    };
  }

  const chartConfig = {
    // backgroundGradientFrom: "#E5E5E5",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#CECECE",
    // backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => theme.dark ? hexToRGB(theme.colors.primary, opacity) : `rgba(50, 50, 82, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
    ...colours,
  };

  const graphStyle = {
    borderRadius: 8,
  };

  const data = {
    // labels: totalSteps.map((val) => val.date),
    labels: [1, 2, 3, 4],
    datasets: [
      {
        // data: totalSteps.map((val) => val.steps),
        data: [5, 3, 7, 9],
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

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
      {!!totalSteps && (
        <BarChart
          data={{
            labels: totalSteps.map((val) => yyyymmddToString(val.date)),
            // labels: [1, 2, 3, 4],
            datasets: [
              {
                data: totalSteps.map((val) => val.steps),
                // data: [5, 3, 7, 9]
              },
            ],
          }}
          width={Dimensions.get("window").width}
          // width={400}
          yAxisLabel=""
          yAxisSuffix=""
          height={220}
          chartConfig={chartConfig}
          fromZero
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      {/* <BarChart
        style={graphStyle}
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
    /> */}
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
      <BadgesPreview onPress={() => {
        navigation.navigate("Badges");
      }} achievementIds={achievementIds} />
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
    flexDirection: "row",
  },
});
