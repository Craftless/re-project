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
import { Button, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./AuthenticatedTab";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BarChart } from "react-native-chart-kit";
import { hexToRGB, yyyymmddToString } from "../util/math";
import BadgesPreview from "../components/badges/BadgesPreview";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import RegularButton from "../components/ui/RegularButton";

function DefaultProgressScreen() {
  const dispatch = useAppDispatch();
  requestStepsToday(dispatch);
  const steps24h = useAppSelector((state) => state.stepCount.stepsToday);
  const stepsFM = useAppSelector((state) => state.stepCount.stepsFromMidnight);
  const totalStepsSel = useAppSelector((state) => state.stepCount.totalSteps);
  const totalSteps = totalStepsSel
    ? [...totalStepsSel]
        .sort((a, b) => Number(b.date) - Number(a.date))
        .slice(0, 5)
        .reverse()
    : undefined;
  const [refreshing, setRefreshing] = useState(false);
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );

  const totalStepsArr = [...totalStepsSel].reverse();

  const theme = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Tabs">>();

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

  const chartConfig: AbstractChartConfig = {
    // backgroundGradientFrom: "#E5E5E5",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#CECECE",
    // backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => theme.dark ? hexToRGB(theme.colors.primary, opacity) : `rgba(50, 50, 82, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    // barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
    ...colours,
  };

  const graphStyle = {
    borderRadius: 8,
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
          // yAxisInterval={1000}
          data={{
            labels: totalSteps.map((val) => yyyymmddToString(val.date)),
            // labels: [1, 2, 3, 4],
            datasets: [
              {
                data: totalSteps.map((val) => val.steps),
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
          // segments={5}
        />
      )}
      <CardWithTitleAndContent title="Steps Today">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {stepsFM}
          </AppText>
          {/* <Button
            onPress={() => {
              requestStepsToday(dispatch);
            }}
            mode="text"
          >
            <Ionicons name="refresh" size={24} color="gray" />
          </Button> */}
        </View>
      </CardWithTitleAndContent>
      <CardWithTitleAndContent title="Steps (Last 7 Days)">
        <View style={styles.stepDataContainer}>
          <AppText
            style={{ fontWeight: "bold", fontSize: 52, marginHorizontal: 16 }}
          >
            {steps24h}
          </AppText>
          {/* <Button
            onPress={() => {
              requestStepsToday(dispatch);
            }}
            mode="text"
          >
            <Ionicons name="refresh" size={24} color="gray" />
          </Button> */}
        </View>
      </CardWithTitleAndContent>
      <BadgesPreview
        onPress={() => {
          navigation.navigate("Badges");
        }}
        achievementIds={achievementIds}
      />
      <Button
        onPress={() => {
          navigation.navigate("TotalSteps", {
            totalStepsArr: undefined,
          });
        }}
        mode="text"
        style={{ margin: 8, padding: 4 }}
      >
        View Total Steps
      </Button>
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
