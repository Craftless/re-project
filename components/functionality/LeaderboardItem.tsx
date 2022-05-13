import AppText from "../ui/AppText";
import { View } from "react-native";
import { LeaderboardItem } from "../../types/leaderboard";
import { auth } from "../../firebase/config";

function LeaderboardItem({ item }: { item: LeaderboardItem }) {
  return (
    <View>
      <AppText>{item.displayName}</AppText>
      <AppText>{item.pfpUrl}</AppText>
      <AppText>{item.steps}</AppText>
    </View>
  );
}

export default LeaderboardItem;
