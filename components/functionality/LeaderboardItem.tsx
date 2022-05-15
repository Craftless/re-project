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
          <AppText style={{ fontSize: item.rank <= 3 ? 32 : 28 }}>
          {/* <AppText adjustsFontSizeToFit={true} numberOfLines={1} > */}
            {item.rank}
          </AppText>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.nameContainer}>
            <ProfilePicture style={styles.images} uri={item.pfpUrl} />
            <AppText style={styles.nameText}>{item.displayName}</AppText>
          </View>
          <View
            style={styles.itemContainer}
          >
            <AppText>{item.steps}</AppText>
          </View>
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
    // backgroundColor: "#9800BE"
  },
  rankingContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#1B00EA"
  },
  detailsContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 5,
  },
  nameContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#00DF6C",
    flex: 5,
  },
  nameText: {
    fontSize: 20,
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    // backgroundColor: "#C30000",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }
});
