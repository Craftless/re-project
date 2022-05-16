import {
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Platform,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { withTheme } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

function HeavyCard({
  style,
  children,
  onPress,
  backgroundColour,
  theme,
}: {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColour?: string;
  theme: Theme;
}) {

  const color = theme.colors.surface;
  const cardStyles = styles(backgroundColour || adjust(color, 20));

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

function adjust(color: string, amount: number) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}


export default withTheme(HeavyCard);

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
