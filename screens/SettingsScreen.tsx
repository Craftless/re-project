import { useContext, useState } from "react";
import { Text, ScrollView, StyleSheet, Modal, Image, View } from "react-native";
import ImagePicker from "../components/functionality/ImagePicker";
import RegularButton from "../components/ui/RegularButton";
import Colours from "../constants/Colours";
import { auth, projectStorage } from "../firebase/config";
import { AuthContext } from "../store/auth-context";

function SettingsScreen() {
  const authCtx = useContext(AuthContext);
  const [showPfpImagePickerModal, setShowPfpImagePickerModal] = useState(false);

  async function profilePictureChosenHandler(uri: string) {
    if (uri) await authCtx.updatePfp(uri);
  }

  let pfpImage = <Text>No Profile Picture Set</Text>;
  const pfpUrl = authCtx.getCurrentPfp();
  if (pfpUrl) {
    pfpImage = <Image style={styles.pfp} source={{ uri: pfpUrl }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <View style={styles.pfpContainer}>{pfpImage}</View>
      <RegularButton onPress={() => setShowPfpImagePickerModal(true)}>
        Replace current profile picture
      </RegularButton>
      {showPfpImagePickerModal && (
        <Modal>
          <ImagePicker onImageChosen={profilePictureChosenHandler} />
        </Modal>
      )}
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

export default SettingsScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pfpContainer: {
    width: 200,
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: Colours.primary200,
  },
  pfp: {
    width: "100%",
    height: "100%",
  },
});
