import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Platform,
} from "react-native";

const platform = Platform.OS;

// Useless now, due to react-native-paper and its mode="text" button

function TransparentBgButton({
  children,
  onPress,
  disabled = false,
  containerStyle,
  rootContainerStyle,
}: {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rootContainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.rootContainer, rootContainerStyle]}>
      <Pressable
        style={({ pressed }) => {
          let btnStyles: StyleProp<ViewStyle>[] = [styles.button];
          if (pressed && platform !== "android" && !disabled)
            btnStyles.push(styles.buttonPressed);
          return [btnStyles, containerStyle];
        }}
        onPress={onPress}
        android_ripple={{ color: "#330080" }}
      >
        <View>{children}</View>
      </Pressable>
    </View>
  );
}

export default TransparentBgButton;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 4,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
