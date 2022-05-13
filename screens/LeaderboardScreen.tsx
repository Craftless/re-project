import { ActivityIndicator, Card } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import { useEffect, useState } from "react";
import { getCurrentLeaderboardData } from "../util/leaderboard";
import { projectDatabase } from "../firebase/config";

function LeaderboardScreen() {
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  useEffect(() => {
    async function hello() {
      console.log("It's in here");
      const val = await (await stepsRef.get()).val();
      console.log(val);
      setIsLeaderboardLoading(false);
    }

    setIsLeaderboardLoading(true);
    const stepsRef = projectDatabase
      .ref("leaderboard")
      .orderByChild("steps")
      .limitToFirst(5);
    stepsRef.on("value", (snapshot) => {
      console.log(`Snapshot value: ${snapshot.val()}`);
    });
    hello();

    return stepsRef.off();
  }, []);

  return isLeaderboardLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <Card style={styles.cardContainer}>
        <AppText>f</AppText>
      </Card>
      <Card style={styles.cardContainer}>
        <AppText>fsadf</AppText>
      </Card>
      <Card style={styles.cardContainer}>
        <AppText>f2</AppText>
      </Card>
    </View>
  );
}

export default LeaderboardScreen;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    margin: 16,
  },
});
