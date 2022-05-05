import { useContext, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
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
  inputProps?: TextInputProps;
}) {
  const [editable, setEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const authCtx = useContext(AuthContext);

  const textInput = useRef<TextInput | null>(null);

  async function saveDisplayName() {
    setIsUpdating(true);
    await authCtx.updateUserDisplayName(valueObj.value);
    setIsUpdating(false);
  }

  const displayName = authCtx.getCurrentDisplayName() || "No display name set";

  let icon = <MaterialIcons name="mode-edit" size={30} color="black" />;
  if (editable)
    icon = (
      <Ionicons name="checkmark" size={30} color={hasError ? "red" : "green"} />
    );
  if (isUpdating) icon = <ActivityIndicator size="small" />;
  return (
    <View style={styles.outerContainer}>
      <AppText style={[styles.textLabel, hasError && styles.textLabelInvalid]}>
        {label}
      </AppText>
      <KeyboardAvoidingView
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <TextInput
          value={
            isUpdating ? "Updating..." : editable ? valueObj.value : undefined
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
        <TransparentBgButton
          onPress={() => {
            if (textInput.current) {
              if (!editable) {
                setEditable(true);
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
        </TransparentBgButton>
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
    borderBottomWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomColor: Colours.primary100,
    fontSize: 18,
    flex: 1,
  },
  inputFieldInvalid: {
    borderBottomColor: Colours.error300,
  },
});
