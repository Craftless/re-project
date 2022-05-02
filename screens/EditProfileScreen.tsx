import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import EditInput from "../components/ui/EditInput";
import BorderBottomInput from "../components/ui/EditInput";
import Input from "../components/ui/Input";
import RegularButton from "../components/ui/RegularButton";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";
import { ProfilePicture } from "../util/auth";
import { SettingsStackParamList } from "./SettingsStack";
// import CachedImage from "expo-cached-image";
// import { CachedProfilePicture } from "../util/auth";

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

  const profilePicture = authCtx.getCurrentPfp();

  const { value, valueChangeHandler, inputTouchedHandler, hasError, isValid } =
    useInput(() => true);

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.profilePictureSectionContainer}>
        <ProfilePicture style={styles.pfp} />
        <RegularButton onPress={() => navigation.navigate("ChangePfp")}>
          Replace current profile picture
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
