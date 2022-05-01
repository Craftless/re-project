import { View, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function CircularBadgeDisplay({
  backgroundColor,
  size,
}: {
  backgroundColor: string;
  size: number;
}) {
  return (
    <View style={styles(backgroundColor, size).outerContainer}>
      <Ionicons name="hourglass" color="#008C38" />
    </View>
  );
}

export default CircularBadgeDisplay;

const styles = (backgroundColor: string, badgeSize: number) => StyleSheet.create({
  outerContainer: {
    backgroundColor: backgroundColor,
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    overflow: "hidden",
  },
});
