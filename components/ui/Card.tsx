import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Platform } from "react-native";
import Colours from "../../constants/Colours";
import { withTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";
import { Card as RNPCard } from "react-native-paper";

// Probably useless now, with react-native-paper

function Card({
  children,
  style,
  theme,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
}) {
  return <RNPCard style={[styles(theme).cardContainer, style]}>{children}</RNPCard>;
}

export default withTheme(Card);

const styles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      margin: 16,
      padding: 16,
      borderRadius: 8,
      elevation: 4,
      // backgroundColor: theme.colors.surface,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
      shadowColor: "black",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
  });
