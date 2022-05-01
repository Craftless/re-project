import { Modal, View, StyleSheet, Alert } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ImagePicker from "../components/functionality/ImagePicker";
import { AuthContext } from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
import RegularButton from "../components/ui/RegularButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "./SettingsScreen";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function ChangeProfilePictureScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<SettingsStackParamList, "ChangePfp">;
}) {
  const authCtx = useContext(AuthContext);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

  async function profilePictureChosenHandler(uri: string) {
    if (uri) {
      setIsAwaitingResponse(true);
      await authCtx.updatePfp(uri);
      setIsAwaitingResponse(false);
      navigation.goBack();
    }
  }

  if (isAwaitingResponse)
    return <LoadingOverlay message="Updating Profile Picture..." />;

  return (
    <View style={styles.pfpModal}>
      <ImagePicker onImageChosen={profilePictureChosenHandler} />
      {/* <RegularButton
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
          else navigation.replace("Default");
        }}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        rootContainerStyle={{ position: "absolute", top: 0, right: 0 }}
      >
        <Entypo name="cross" size={24} color="black" />
      </RegularButton> */}
    </View>
  );
}

export default ChangeProfilePictureScreen;

const styles = StyleSheet.create({
  pfpModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
