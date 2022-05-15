import AppText from "../ui/AppText";
import { View } from "react-native";
import { LeaderboardItem as LeaderboardItemType } from "../../types/leaderboard";
import { auth } from "../../firebase/config";
import { StyleSheet } from "react-native";
import { ProfilePicture } from "../../util/auth";
import { Card } from "react-native-paper";

function LeaderboardItem({ item }: { item: LeaderboardItemType }) {
  return (
    <Card style={styles.card}>
      <View style={styles.innerContainer}>
        <View style={styles.rankingContainer}>
          <AppText style={{ fontSize: item.rank <= 3? 32 : 28 }}>{item.rank}</AppText>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.nameContainer}>
            <ProfilePicture style={styles.images} uri={item.pfpUrl} />
            <AppText>{item.displayName}</AppText>
          </View>
          <AppText>{item.steps}</AppText>
        </View>
      </View>
    </Card>
  );
}

export default LeaderboardItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: 2,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
  },
  rankingContainer: {
    paddingHorizontal: 30,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
});
