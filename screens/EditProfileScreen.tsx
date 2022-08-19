import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../components/ui/AppText";
import EditInput from "../components/ui/EditInput";
import RegularButton from "../components/ui/RegularButton";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";
import { ProfilePicture } from "../util/auth";
import { SettingsStackParamList } from "./SettingsStack";

function EditProfileScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<SettingsStackParamList, "Default">;
}) {
  const authCtx = useContext(AuthContext);
  const [, refreshScreen] = useReducer((x) => x, 0);
  const isFocused = useIsFocused();
  const theme = useTheme();

  useEffect(() => {
    refreshScreen();
  }, [isFocused]);

  const { value, valueChangeHandler, inputTouchedHandler, hasError, isValid } =
    useInput(
      (curVal) => curVal.trim().length <= 12,
      "Please provide a valid name not more than 12 characters long."
    );

  return (
    <ScrollView style={styles.outerContainer} keyboardShouldPersistTaps="never">
      <View style={styles.profilePictureSectionContainer}>
        <TouchableOpacity>
          <ProfilePicture style={styles.pfp} self />
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: theme.colors.placeholder,
            borderBottomWidth: 2,
            padding: 8
          }}
        >
          <AppText style={{ fontSize: 24, fontWeight: "600" }}>
            Replace Profile Picture
          </AppText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <RegularButton onPress={() => navigation.navigate("ChangePfp")}>
              Use Image
            </RegularButton>
          </View>
        </View>
      </View>
      <View style={{padding: 8, flex: 1}}>
        <EditInput
          label="Display Name"
          valueObj={{ value: value }}
          onValueChange={valueChangeHandler}
          onInputBlur={inputTouchedHandler}
          hasError={hasError}
          selectTextOnFocus
        />
      </View>
    </ScrollView>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  profilePictureSectionContainer: {
    alignItems: "center",
    padding: 8,
  },
  pfp: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 16,
  },
});
