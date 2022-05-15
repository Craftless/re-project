import { ActivityIndicator, Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import { useEffect, useState } from "react";
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

function LeaderboardScreen() {
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const dispatch = useAppDispatch();
  const leaderboardData = useAppSelector(
    (state) => state.leaderboard.leaderboard
  );

  useEffect(() => {
    // async function thing() {
    //   const ref = projectDatabase.ref("test").orderByKey().equalTo("abc");
    //   const value = await (await ref.get()).val();
    //   console.log(`It is`, value);
    // }
    // thing();
    async function hello() {
      setIsLeaderboardLoading(true);
      const stepsRef = projectDatabase
        .ref("leaderboard")
        .orderByChild("steps")
        .limitToLast(5);

      const val = await (await stepsRef.get()).val();
      let userStepsArr: UserSteps[] = [];
      for (const key in val) {
        userStepsArr.push({
          uid: key,
          steps: val[key].steps,
        });
      }
      userStepsArr.reverse();
      console.log(`array: `, userStepsArr);
      let items: LeaderboardItem[] = [];

      await Promise.all(
        userStepsArr.map(async (item, index) => {
          const userDetails = await fetchDisplayNameAndPhotoURLFromUid(
            item.uid
          );
          console.log(`user details`, userDetails);
          if (userDetails)
            items.push({ rank: index + 1, ...userDetails, steps: item.steps });
        })
      );
      dispatch(setLeaderboardData({ leaderboard: items }));
      setIsLeaderboardLoading(false);
    }

    hello();
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
      {leaderboardData.map((item) => {
        return (
          // <Card key={item.steps} style={styles.cardContainer}>
          //   <AppText>Name: {item.displayName}</AppText>
          //   <AppText>Steps: {item.steps}</AppText>
          //   <ProfilePicture style={styles.images} />
          // </Card>
          <LeaderboardItemComponent key={item.displayName} item={item} />
        );
      })}
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
