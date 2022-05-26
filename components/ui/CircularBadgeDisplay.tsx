import { View, StyleSheet } from "react-native";
import { IconFunc, IconFuncParams } from "../../util/AchievementIcons";
import AppText from "./AppText";

function CircularBadgeDisplay({
  backgroundColor,
  size,
  badgeIcon,
}: {
  backgroundColor?: string;
  size: number;
  badgeIcon: IconFunc | null
}) {
  if (!badgeIcon) return <AppText>No Icon</AppText>;
  const icon = badgeIcon({ size } as IconFuncParams);
  return (
    <View style={styles(backgroundColor || icon.colour, size).outerContainer}>
      {icon.comp}
    </View>
  );
}

export default CircularBadgeDisplay;

const styles = (backgroundColor: string, badgeSize: number) =>
  StyleSheet.create({
    outerContainer: {
      backgroundColor: backgroundColor,
      width: badgeSize,
      height: badgeSize,
      borderRadius: badgeSize / 2,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      margin: 4,
    },
  });
