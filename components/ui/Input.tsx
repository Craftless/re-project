import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import Colours from "../../constants/Colours";

function Input({
  label,
  keyboardType,
  secure = false,
  hasError,
  onValueChange,
  onInputBlur,
  valueObj
}: {
  label: string;
  keyboardType: KeyboardTypeOptions;
  secure?: boolean;
  hasError: boolean;
  onValueChange: (text: string) => void;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  valueObj: {value: string};
}) {
  return (
    <View style={styles.outerContainer}>
      <Text style={[styles.textLabel, hasError && styles.textLabelInvalid]}>{label}</Text>
      <TextInput
        value={valueObj.value}
        style={[styles.inputField, hasError && styles.inputFieldInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoCapitalize="none"
        onChangeText={onValueChange}
        onBlur={onInputBlur}
        autoCorrect={false}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 8,
  },
  textLabel: {
    color: Colours.primary500,
    fontSize: 18,
  },
  textLabelInvalid: {
    color: Colours.error600,
  },
  inputField: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colours.primary100,
    borderRadius: 6,
    fontSize: 18,
  },
  inputFieldInvalid: {
    backgroundColor: Colours.error300,
  },
});
