import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Button,
  GestureResponderEvent,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import Colours from "../../constants/Colours";

const platform = Platform.OS;

function RegularButton({
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
          if (disabled) btnStyles.push(styles.buttonDisabled);
          return [btnStyles, containerStyle];
        }}
        onPress={onPress}
        android_ripple={{ color: "#330080" }}
      >
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default RegularButton;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 4,
  },
  button: {
    backgroundColor: Colours.error800,
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    backgroundColor: "#989898",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
