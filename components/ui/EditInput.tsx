import { useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput as RNTextInput,
} from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import Colours from "../../constants/Colours";
import { MaterialIcons } from "@expo/vector-icons";
import TransparentBgButton from "./TransparentBgButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../../store/auth-context";
import AppText from "./AppText";

function EditInput({
  label,
  keyboardType = "default",
  secure = false,
  hasError,
  onValueChange,
  onInputBlur,
  valueObj,
  inputProps,
}: {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  hasError: boolean;
  onValueChange: (text: string) => void;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  valueObj: { value: string };
  inputProps?: any; // can't find TextInputProps equivalent for react-native-paper
}) {
  const [editable, setEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const authCtx = useContext(AuthContext);

  const textInput = useRef<RNTextInput | null>(null);

  async function saveDisplayName() {
    setIsUpdating(true);
    console.log(valueObj.value);
    await authCtx.updateUserDisplayName(valueObj.value);
    setIsUpdating(false);
  }

  const displayName = authCtx.getCurrentDisplayName() || "No display name set";
  const theme = useTheme();

  let icon = (
    <MaterialIcons name="mode-edit" size={30} color={theme.colors.text} />
  );
  if (editable)
    icon = (
      <Ionicons name="checkmark" size={30} color={hasError ? "red" : "green"} />
    );
  if (isUpdating) icon = <ActivityIndicator size="small" />;
  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <TextInput
          label={label}
          mode="flat"
          autoComplete={false}
          value={
            isUpdating ? "Updating..." : editable ? valueObj.value : valueObj.value || undefined
          }
          style={[styles.inputField, hasError && styles.inputFieldInvalid]}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          autoCapitalize="none"
          onChangeText={onValueChange}
          onBlur={(e) => {
            saveDisplayName();
            onInputBlur(e);
            setEditable(false);
          }}
          autoCorrect={false}
          editable={editable}
          ref={textInput}
          autoFocus={editable}
          defaultValue={displayName}
          {...inputProps}
        />
        <Button
          mode="text"
          onPress={() => {
            if (textInput.current) {
              if (!editable) {
                setEditable(true);
                onValueChange(displayName); // Workaround, i'll get back to this later
                setTimeout(() => {
                  if (textInput.current) {
                    textInput.current.focus();
                  }
                }, 100);
              } else {
                setEditable(false);
                textInput.current.blur();
                saveDisplayName();
              }
            }
          }}
        >
          {icon}
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

export default EditInput;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 8,
  },
  textLabel: {
    color: Colours.primary500,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  textLabelInvalid: {
    color: Colours.error600,
  },
  inputField: {
    // borderBottomWidth: 2,
    // paddingVertical: 8,
    // paddingHorizontal: 6,
    // borderBottomColor: Colours.primary100,
    fontSize: 18,
    flex: 1,
  },
  inputFieldInvalid: {
    borderBottomColor: Colours.error300,
  },
});
