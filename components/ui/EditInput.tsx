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
import { Button, IconButton, TextInput, useTheme } from "react-native-paper";
import Colours from "../../constants/Colours";
import { MaterialIcons } from "@expo/vector-icons";
import TransparentBgButton from "./TransparentBgButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from "../../store/auth-context";
import AppText from "./AppText";
import { Theme } from "react-native-paper/lib/typescript/types";

let text, accent, surface, error;

// TODO: Fix: Currently not modular at all and only made for one purpose

function EditInput({
  label,
  keyboardType = "default",
  secure = false,
  hasError,
  onValueChange,
  onInputBlur,
  valueObj,
  inputProps,
  selectTextOnFocus
}: {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  hasError: boolean;
  onValueChange: (text: string) => void;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  valueObj: { value: string };
  selectTextOnFocus?: boolean;
  inputProps?: any; // can't find TextInputProps equivalent for react-native-paper
}) {
  const [editable, setEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const authCtx = useContext(AuthContext);

  const textInput = useRef<RNTextInput | null>(null);

  async function saveDisplayName() {
    setIsUpdating(true);
    const displayName = valueObj.value;
    displayName.trim().substring(0, 12);
    await authCtx.updateUserDisplayName(valueObj.value);
    setIsUpdating(false);
  }

  const displayName = authCtx.getCurrentDisplayName() || "No display name set";
  const theme = useTheme();

  text = theme.colors.text;
  accent = theme.colors.primary;
  surface = theme.colors.surface;
  error = theme.colors.error;
  const stylesObject = styles({ text, accent, surface, error, theme });

  let icon = (
    <MaterialIcons name="mode-edit" size={30} color={theme.colors.text} />
  );
  if (editable)
    icon = (
      <Ionicons name="checkmark" size={30} color={hasError ? "red" : "green"} />
    );
  if (isUpdating) icon = <ActivityIndicator size="small" />;
  return (
    <View style={stylesObject.outerContainer}>
      <KeyboardAvoidingView
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ flex: 1 }}>
          <AppText style={{ color: theme.colors.placeholder }}>{label}</AppText>
          <RNTextInput
            label={label}
            mode="flat"
            autoComplete={false}
            value={
              isUpdating
                ? "Updating..."
                : editable
                ? valueObj.value
                : valueObj.value || undefined
            }
            style={[
              stylesObject.inputField,
              hasError && stylesObject.inputFieldInvalid,
              editable && stylesObject.inputFieldEditable,
            ]}
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
            selectTextOnFocus
            {...inputProps}
          />
        </View>
        <View></View>
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

const styles = ({
  text,
  accent,
  surface,
  error,
  theme
}: {
  text: string;
  accent: string;
  surface: string;
  error: string;
  theme: Theme;
}) =>
  StyleSheet.create({
    outerContainer: {
      marginBottom: 8,
    },
    textLabel: {
      color: text,
      fontSize: 18,
      marginBottom: 8,
      fontWeight: "bold",
    },
    textLabelInvalid: {
      color: error,
    },
    inputField: {
      borderBottomWidth: 2,
      paddingVertical: 8,
      paddingHorizontal: 6,
      borderBottomColor: theme.colors.placeholder,
      color: text,
      fontSize: 18,
      flex: 1,
    },
    inputFieldInvalid: {
      borderBottomColor: error,
      color: error,
    },
    inputFieldEditable: {
      borderBottomColor: accent,
      color: text,
    },
  });
