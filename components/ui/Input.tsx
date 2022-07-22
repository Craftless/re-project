import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { TextInput } from "react-native-paper";
import Colours from "../../constants/Colours";
import AppText from "./AppText";

// Used to have a ton of styling that got deleted due to react-native-paper
// Useless component

function Input({
  label,
  keyboardType = "default",
  secure = false,
  hasError,
  onValueChange,
  onInputBlur,
  valueObj,
  props,
}: {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  hasError: boolean;
  onValueChange: (text: string) => void;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  valueObj: { value: string };
  props?: any;
}) {
  return (
    <View style={styles.outerContainer}>
      <TextInput
        mode="flat"
        label={label}
        value={valueObj.value}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoCapitalize="none"
        onChangeText={onValueChange}
        onBlur={onInputBlur}
        autoCorrect={false}
        autoComplete={false}
        error={hasError}
        {...props}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 8,
  },
});
