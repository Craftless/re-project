import { StyleSheet, View, ViewProps } from "react-native";

function BadgeContainer(props: ViewProps) {
  return <View style={styles.badgeContainer} {...props}>{props.children}</View>;
}

export default BadgeContainer;

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
  },
});
