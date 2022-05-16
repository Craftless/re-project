import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
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

  useEffect(() => {
    refreshScreen();
  }, [isFocused]);

  const { value, valueChangeHandler, inputTouchedHandler, hasError, isValid } =
    useInput(() => true, "Please provide a valid name.");

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.profilePictureSectionContainer}>
        <TouchableOpacity>
          <ProfilePicture style={styles.pfp} self />
        </TouchableOpacity>
        <RegularButton onPress={() => navigation.navigate("ChangePfp")}>
          Replace profile picture
        </RegularButton>
      </View>
      <View>
        <EditInput
          label="Display Name"
          valueObj={{ value: value }}
          onValueChange={valueChangeHandler}
          onInputBlur={inputTouchedHandler}
          hasError={hasError}
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
