import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.cardTitle}>{title}</Text>
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
