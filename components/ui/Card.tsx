import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Platform } from "react-native";
import Colours from "../../constants/Colours";

// Probably useless now, with react-native-paper

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colours.primary50,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
