import { View, StyleSheet } from "react-native";
import ImagePicker from "../components/functionality/ImagePicker";
import { AuthContext } from "../store/auth-context";
import { useContext, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "./SettingsStack";
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
