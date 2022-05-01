import { useContext, useEffect, useReducer, useState } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  View,
  Button,
} from "react-native";

import RegularButton from "../components/ui/RegularButton";
import Colours from "../constants/Colours";
import { auth, projectStorage } from "../firebase/config";
import { AuthContext } from "../store/auth-context";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import ChangeProfilePictureScreen from "./ChangeProfilePictureScreen";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../App";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Card from "../components/ui/Card";
import FlatCard from "../components/ui/FlatCard";

export type SettingsStackParamList = {
  Default: undefined;
  ChangePfp: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

function DefaultScreen({
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
  const noPfp = <Text>No Profile Picture Set</Text>;
  let pfpImage = noPfp;
  const pfpUrl = authCtx.getCurrentPfp();
  if (pfpUrl) {
    pfpImage = <Image style={styles.pfp} source={{ uri: pfpUrl }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <FlatCard style={styles.profileContainer}>
        <View style={styles.pfpContainer}>{pfpImage}</View>
        <View style={styles.displayInformationContainer}>
          <Text style={styles.profileDisplayNameText}>
            {authCtx.user ? authCtx.user.displayName : "Error"}
          </Text>
          <Text style={styles.profileEmailAddressText}>
            {authCtx.user ? authCtx.user.email : "Error"}
          </Text>
        </View>
      </FlatCard>
      <RegularButton onPress={() => navigation.navigate("ChangePfp")}>
        Replace current profile picture
      </RegularButton>

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

function SettingsScreen({
  navigation,
}: {
  navigation: BottomTabNavigationProp<RootTabParamList, "Settings">;
}) {
  return (
    <Stack.Navigator initialRouteName="Default">
      <Stack.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen name="ChangePfp" component={ChangeProfilePictureScreen} />
    </Stack.Navigator>
  );
}

export default SettingsScreen;

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
