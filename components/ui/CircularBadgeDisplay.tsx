import { View, Image, StyleSheet } from "react-native";

function CircularBadgeDisplay({
  backgroundColor,
  size,
  badgeIcon,
}: {
  backgroundColor: string;
  size: number;
  badgeIcon: ({ size }: { size: number }) => React.ReactNode;
}) {
  return (
    <View style={styles(backgroundColor, size).outerContainer}>
      {badgeIcon({ size })}
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
