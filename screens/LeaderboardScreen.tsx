import { ActivityIndicator, Button, Card } from "react-native-paper";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import { useContext, useEffect, useState } from "react";
import {
  fetchDisplayNameAndPhotoURLFromUid,
  getCurrentLeaderboardData,
} from "../util/leaderboard";
import { projectDatabase } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setLeaderboardData } from "../store/redux/leaderboard-slice";
import { LeaderboardItem, UserSteps } from "../types/leaderboard";
import { ProfilePicture } from "../util/auth";
import LeaderboardItemComponent from "../components/functionality/LeaderboardItem";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";

function LeaderboardScreen() {
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const authCtxx = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const leaderboardData = useAppSelector(
    (state) => state.leaderboard.leaderboard
  );

  async function reloadLeaderboard() {
    setIsLeaderboardLoading(true);
    const stepsRef = projectDatabase
      .ref("leaderboard")
      .orderByChild("steps")
      .limitToFirst(5);

    const get = await stepsRef.get();

    let userStepsArr: UserSteps[] = [];

    get.forEach((item) => {
      const val = item.val();
      for (const key in val) {
        const uid = item.key;
        console.log(val[key]);
        if (uid) {
          userStepsArr.push({
            uid,
            steps: val[key],
          });
        }
      }
    });

    userStepsArr.reverse();
    let items: LeaderboardItem[] = [];

    await Promise.all(
      userStepsArr.map(async (item, index) => {
        const userDetails = await fetchDisplayNameAndPhotoURLFromUid(
          item.uid,
          authCtxx
        );
        if (userDetails)
          items.push({ rank: index + 1, ...userDetails, steps: item.steps });
      })
    );
    dispatch(setLeaderboardData({ leaderboard: items }));
    setIsLeaderboardLoading(false);
  }

  useEffect(() => {
    reloadLeaderboard();
    // }

    // stepsRef.on("value", (snapshot) => {
    //   console.log(`Snapshot value: ${snapshot.val()}`);
    //   dispatch(setLeaderboardData({ leaderboard: snapshot.val() }));
    // });

    // return stepsRef.off();
  }, []);

  return isLeaderboardLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <Button
        onPress={() => {
          reloadLeaderboard();
        }}
        mode="text"
      >
        <Ionicons name="refresh" size={24} color="gray" />
      </Button>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              reloadLeaderboard();
            }}
          />
        }
        renderItem={(itemData) => {
          return <LeaderboardItemComponent item={itemData.item} />;
        }}
        data={leaderboardData}
        keyExtractor={(item) => {
          return item.rank.toString();
        }}
      />
    </View>
  );
}

export default LeaderboardScreen;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    margin: 16,
  },
  images: {
    width: 75,
    height: 75,
  },
});
