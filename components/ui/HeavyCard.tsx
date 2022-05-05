import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

function HeavyCard({
  style,
  children,
  onPress,
  backgroundColour = "#C5C5C5",
}: {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColour?: string;
}) {
  const cardStyles = styles(backgroundColour);

  return (
    <View style={[cardStyles.cardContainer]}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[cardStyles.innerContainer, style]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}

export default HeavyCard;

const styles = (backgroundColour: string) =>
  StyleSheet.create({
    cardContainer: {
      margin: 16,
      padding: 4,
      borderRadius: 8,
      elevation: 4,
      shadowOpacity: 0.5,
      shadowColor: "black",
      shadowRadius: 4,
      shadowOffset: { width: 4, height: 4 },
      overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    innerContainer: {
      borderRadius: 8,
      overflow: "hidden",
      alignItems: "center",
      backgroundColor: backgroundColour,
    },
  });
