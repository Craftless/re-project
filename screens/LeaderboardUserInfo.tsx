import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import AppText from "../components/ui/AppText";
import { ProfilePicture } from "../util/auth";
import { fetchStepsFromUid } from "../util/leaderboard";
import { RootStackParamList } from "./AuthenticatedTab";
import * as Clipboard from "expo-clipboard";
import Card from "../components/ui/Card";

function LeaderboardUserInfo({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "LeaderboardUserInfo">) {
  const { userId, leaderboardItem } = route.params;
  const [leaderboardValues, setLeaderboardValues] = useState(
    null as {
      steps7d: number;
      stepsFM: number;
      totalNumSteps: number;
    } | null
  );

  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    async function getSteps() {
      const steps = await fetchStepsFromUid(userId);
      for (const key in steps) {
        setLeaderboardValues({
          steps7d: steps[key].steps,
          stepsFM: steps[key].stepsFromMidnight,
          totalNumSteps: steps[key].totalNumSteps,
        });
      }
    }
    getSteps();
  }, []);
  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <AppText
          allowFontScaling
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.nameText}
        >
          {leaderboardItem.displayName}
        </AppText>
        <ProfilePicture style={styles.images} uri={leaderboardItem.pfpUrl} />
        <View style={styles.detailsTextContainer}>
          <AppText>Name: {leaderboardItem.displayName}</AppText>
          <AppText>Profile Picture URL: Click button to show</AppText>
          <AppText>User ID: {userId ?? "None"}</AppText>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: theme.colors.placeholder,
            margin: 16,
            borderRadius: 1,
          }}
        />
        <View style={styles.detailsTextContainer}>
          <AppText>
            Last 7 Days: {leaderboardValues?.steps7d || "Unavailable"}
          </AppText>
          <AppText>
            Steps Today: {leaderboardValues?.stepsFM || "Unavailable"}
          </AppText>
          <AppText>
            Total Steps: {leaderboardValues?.totalNumSteps || "Unavailable"}
          </AppText>
        </View>
        <Button
          mode="text"
          onPress={() => {
            if (leaderboardItem.pfpUrl && leaderboardItem.pfpUrl != "None") {
              Clipboard.setString(leaderboardItem.pfpUrl);
              setCopied(true);
            } else {
              Alert.alert(
                `${leaderboardItem.displayName} did not upload a profile picture`
              );
            }
          }}
        >
          {copied ? "Link Copied" : "Copy Profile Picture URL"}
        </Button>
      </View>
    </ScrollView>
  );
}

export default LeaderboardUserInfo;

const styles = StyleSheet.create({
  images: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginVertical: 40,
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  nameText: {
    fontSize: 30,
    textAlign: "auto",
    flex: 1,
    fontWeight: "bold",
  },
  detailsTextContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
  },
});
