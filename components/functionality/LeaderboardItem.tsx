import AppText from "../ui/AppText";
import { StyleProp, TextStyle, View } from "react-native";
import { LeaderboardItem as LeaderboardItemType } from "../../types/leaderboard";
import { auth } from "../../firebase/config";
import { StyleSheet } from "react-native";
import { ProfilePicture } from "../../util/auth";
import { Card, useTheme } from "react-native-paper";

function LeaderboardItem({ item }: { item: LeaderboardItemType | null }) {
  const theme = useTheme();

  if (!item) {
    return (
      <Card style={{ marginBottom: 2 }}>
        <View style={styles.innerContainer}>
          <View style={styles.rankingContainer}>
            <AppText>Rank</AppText>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.nameContainer}>
              {/* <ProfilePicture style={styles.images} uri={item.pfpUrl} />
          <AppText
            allowFontScaling
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.nameText}
          >
            {item.displayName}
          </AppText> */}
              <AppText>Profile</AppText>
            </View>
            <View style={styles.itemContainer}>
              <AppText>Steps</AppText>
            </View>
          </View>
        </View>
      </Card>
    );
  }

  let rankStyle: StyleProp<TextStyle> = {
    fontSize: 24,
    color: theme.colors.text,
  };
  if (item.rank <= 3) {
    rankStyle = {
      ...rankStyle,
      fontSize: 32,
      color: theme.colors.primary,
    };
  }

  return (
    <Card style={styles.card}>
      <View style={styles.innerContainer}>
        <View style={styles.rankingContainer}>
          <AppText style={rankStyle}>
            {/* <AppText adjustsFontSizeToFit={true} numberOfLines={1} > */}
            {item.rank}
          </AppText>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.nameContainer}>
            <ProfilePicture style={styles.images} uri={item.pfpUrl} />
            <AppText
              allowFontScaling
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.nameText}
            >
              {item.displayName}
              {/*adjustsFontSizeToFit={true}*/}
            </AppText>
          </View>
          <View style={styles.itemContainer}>
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
    height: 70,
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
    paddingLeft: 20,
    paddingRight: 40,
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    // backgroundColor: "#00DF6C",
    flex: 1,
    // flex: 5,
  },
  nameText: {
    fontSize: 20,
    textAlign: "auto",
    flex: 1,
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 20,
  },
  itemContainer: {
    flexDirection: "row",
    // backgroundColor: "#C30000",
    height: "100%",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
