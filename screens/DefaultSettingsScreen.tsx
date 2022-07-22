import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useEffect, useReducer } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import AppText from "../components/ui/AppText";
import HeavyCard from "../components/ui/HeavyCard";
import Colours from "../constants/Colours";
import { auth } from "../firebase/config";
import { AuthContext } from "../store/auth-context";
import {
  getCurrentUserDisplayNameOrEmailNonNullFromUser,
  ProfilePicture,
} from "../util/auth";
import { SettingsStackParamList } from "./SettingsStack";
import { Button, Switch } from "react-native-paper";
import * as MailComposer from 'expo-mail-composer';
import { SUPPORT_EMAIL } from "../constants/email";
import { MailComposerStatus } from "expo-mail-composer";
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


  async function supportClickedHandler() {
    if (!auth.currentUser) return;
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Mail Composer is unavailable. If you are on IOS, please check if you have signed in to the Mail app");
      return;
    }
    const name = getCurrentUserDisplayNameOrEmailNonNullFromUser(auth.currentUser);
    const result = await MailComposer.composeAsync({
      recipients: [SUPPORT_EMAIL],
      subject: `Support: ${name}`,
    });
    if (result.status == MailComposerStatus.SENT) Alert.alert("Sent!");
    else Alert.alert("Did not send");
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
          <AppText
            allowFontScaling
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.profileDisplayNameText}
          >
            {authCtx.user &&
              getCurrentUserDisplayNameOrEmailNonNullFromUser(
                authCtx.user,
                true
              )}
          </AppText>
          <AppText style={styles.profileEmailAddressText}>
            {authCtx.user ? authCtx.user.email : "Error"}
          </AppText>
        </View>
      </HeavyCard>
      <View style={styles.normalBtnsContainer}>
        <Button mode="contained" icon="bell" onPress={() => {}} style={styles.normalBtns}>
          Notifications
        </Button>
      </View>
      <View style={styles.normalBtnsContainer}>
        <Button mode="contained" icon="headphones" onPress={supportClickedHandler} style={styles.normalBtns}>
          Support
        </Button>
      </View>
      <View style={styles.normalBtnsContainer}>
        <Button mode="contained" icon="information" onPress={() => {}} style={styles.normalBtns}>
          About
        </Button>
      </View>
      {/* <View>
        <Switch onValueChange={(value) => {
          
        }} />
      </View> */}
      <View style={{ alignItems: "center", marginVertical: 16 }}>
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
    flex: 1,
  },
  profileDisplayNameText: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
  },
  profileEmailAddressText: {
    fontSize: 16,
  },
  normalBtns: {
    width: "70%",
    paddingVertical: 8,
  },
  normalBtnsContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
});
