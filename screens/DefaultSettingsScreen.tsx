import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import HeavyCard from "../components/ui/HeavyCard";
import RegularButton from "../components/ui/RegularButton";
import Colours from "../constants/Colours";
import { auth } from "../firebase/config";
import { AuthContext } from "../store/auth-context";
import { ProfilePicture } from "../util/auth";
import { SettingsStackParamList } from "./SettingsStack";
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
  const noPfp = <Text style={styles.noPfpText}>No Pfp Set</Text>;
  let pfpImage = noPfp;
  const pfpUrl = authCtx.getCurrentPfp();
  if (pfpUrl) {
    pfpImage = <ProfilePicture style={styles.pfp} />;
  }

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
          <Text style={styles.profileDisplayNameText}>
            {authCtx.user ? authCtx.user.displayName : "Error"}
          </Text>
          <Text style={styles.profileEmailAddressText}>
            {authCtx.user ? authCtx.user.email : "Error"}
          </Text>
        </View>
      </HeavyCard>

      <RegularButton
        onPress={() => {
          auth.signOut();
        }}
      >
        Logout
      </RegularButton>
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
    backgroundColor: "#C9C9C9ff",
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
