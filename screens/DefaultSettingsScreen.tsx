import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import HeavyCard from "../components/ui/HeavyCard";
import Colours from "../constants/Colours";
import { auth } from "../firebase/config";
import { AuthContext } from "../store/auth-context";
import { ProfilePicture } from "../util/auth";
import { SettingsStackParamList } from "./SettingsStack";
import { Button } from "react-native-paper";
// import CachedImage from "expo-cached-image";
// import { CachedProfilePicture } from "../util/auth";

function DefaultSettingsScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<SettingsStackParamList, "Default">;
}) {
  const [, refreshScreen] = useReducer((x) => x, 0);

  const isFocused = useIsFocused();

  useEffect(() => {
    refreshScreen();
  }, [isFocused]);

  const authCtx = useContext(AuthContext);
  const pfpImage = <ProfilePicture style={styles.pfp} self />;

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <HeavyCard
        style={styles.profileContainer}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <View style={styles.pfpContainer}>{pfpImage}</View>
        <View style={styles.displayInformationContainer}>
          <AppText style={styles.profileDisplayNameText}>
            {authCtx.user ? authCtx.user.displayName || "No name set" : "Error"}
          </AppText>
          <AppText style={styles.profileEmailAddressText}>
            {authCtx.user ? authCtx.user.email : "Error"}
          </AppText>
        </View>
      </HeavyCard>
      <View style={{ alignItems: "center" }}>
        <Button
          mode="outlined"
          icon="logout"
          onPress={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

export default DefaultSettingsScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    // marginTop: 16,
    // justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "",
    padding: 4,
  },
  pfpContainer: {
    width: 60,
    height: 60,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: Colours.primary200,
  },
  pfp: {
    width: "100%",
    height: "100%",
  },
  noPfpText: {
    textAlign: "center",
    color: Colours.error500,
    fontWeight: "bold",
  },
  displayInformationContainer: {
    flexDirection: "column",
  },
  profileDisplayNameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileEmailAddressText: {
    fontSize: 16,
  },
});
