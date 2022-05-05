import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import Card from "./Card";

function CardWithTitleAndContent({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card style={styles.progressContainer}>
      <AppText style={styles.cardTitle}>{title}</AppText>
      <View style={{ padding: 8 }}>{children}</View>
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
