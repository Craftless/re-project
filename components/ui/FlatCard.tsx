import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";

function FlatCard({
  style,
  children,
  backgroundColour = "#C5C5C5",
}: {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  backgroundColour?: string;
}) {
  return (
    <View style={[styles(backgroundColour).cardContainer, style]}>
      {children}
    </View>
  );
}

export default FlatCard;

const styles = (backgroundColour: string) =>
  StyleSheet.create({
    cardContainer: {
      alignItems: "center",
      margin: 16,
      padding: 16,
      backgroundColor: backgroundColour,
      borderRadius: 8,
      // elevation: 4,
      // shadowOpacity: 0.5,
      // shadowColor: "black",
      // shadowRadius: 4,
      // shadowOffset: { width: 4, height: 4 },
    },
  });
