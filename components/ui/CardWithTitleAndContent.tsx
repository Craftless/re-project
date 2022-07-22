import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import AppText from "./AppText";
import Card from "./Card";

function CardWithTitleAndContent({
  children,
  title,
  onPress,
}: {
  children: React.ReactNode;
  title: string;
  onPress?: () => void;
}) {
  return (
    <Card style={styles.progressContainer}>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <AppText style={styles.cardTitle}>{title}</AppText>
          <View style={{ padding: 8 }}>{children}</View>
        </TouchableOpacity>
      )}
      {!onPress && (
        <>
          <AppText style={styles.cardTitle}>{title}</AppText>
          <View style={{ padding: 8 }}>{children}</View>
        </>
      )}
    </Card>
  );
}

export default CardWithTitleAndContent;

const styles = StyleSheet.create({
  progressContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
