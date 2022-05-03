import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  GestureResponderEvent,
  Platform,
  StyleProp,
  ViewStyle,
  ButtonProps,
  ViewProps,
} from "react-native";
import { Button } from "react-native-paper";
import Colours from "../../constants/Colours";
import AppText from "./AppText";

const platform = Platform.OS;

function RegularButton(props: any) {

  return (
    <Button mode="contained" {...props} />

    // <View style={[styles.rootContainer, rootContainerStyle]}>
    //   <Pressable
    //     style={({ pressed }) => {
    //       let btnStyles: StyleProp<ViewStyle>[] = [styles.button];
    //       if (pressed && platform !== "android" && !disabled)
    //         btnStyles.push(styles.buttonPressed);
    //       if (disabled) btnStyles.push(styles.buttonDisabled);
    //       return [btnStyles, containerStyle];
    //     }}
    //     onPress={onPress}
    //     android_ripple={{ color: "#330080" }}
    //   >
    //     <View>
    //       <AppText style={styles.buttonText}>{children}</AppText>
    //     </View>
    //   </Pressable>
    // </View>
  );
}

export default RegularButton;

// const styles = StyleSheet.create({
//   rootContainer: {
//     margin: 4,
//   },
//   button: {
//     backgroundColor: Colours.error800,
//     elevation: 4,
//     shadowColor: "#000000",
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   buttonPressed: {
//     opacity: 0.7,
//   },
//   buttonDisabled: {
//     backgroundColor: "#989898",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
