import { View, Alert, Image, Text, StyleSheet } from "react-native";
import RegularButton from "../ui/RegularButton";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import Colours from "../../constants/Colours";

function ImagePicker({
  onImageChosen,
}: {
  onImageChosen: (uri: string) => Promise<void>;
}) {
  const [cameraPermissionsInformation, requestCameraPermissions] =
    useCameraPermissions();
  const [mediaLibPermissionsInformation, requestMediaLibPermissions] =
    useMediaLibraryPermissions();

  const [pickedImageURI, setPickedImageURI] = useState(""); // Somehow the ImagePickerResult type doesn't work here

  useEffect(() => {
    onImageChosen(pickedImageURI);
  }, [pickedImageURI]);

  async function verifyCameraPermissions() {
    if (
      cameraPermissionsInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestCameraPermissions();

      return permissionResponse.granted;
    }
    if (
      cameraPermissionsInformation?.status === PermissionStatus.DENIED ||
      !cameraPermissionsInformation?.canAskAgain
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to take an image used for your profile picture."
      );
      return false;
    }
    return true;
  }
  async function verifyMediaLibPermissions() {
    if (
      mediaLibPermissionsInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestMediaLibPermissions();

      return permissionResponse.granted;
    }
    if (
      mediaLibPermissionsInformation?.status === PermissionStatus.DENIED &&
      !mediaLibPermissionsInformation.canAskAgain
    ) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant media library permissions to select an image used for your profile picture."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasCameraPermissions = await verifyCameraPermissions();
    if (!hasCameraPermissions) return;

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      mediaTypes: MediaTypeOptions.Images,
    });
    if (!result.cancelled) setPickedImageURI(result.uri);
  }

  async function selectImageHandler() {
    const hasMediaLibPermissions = await verifyMediaLibPermissions();
    if (!hasMediaLibPermissions) return;

    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      mediaTypes: MediaTypeOptions.Images,
    });

    if (!result.cancelled) setPickedImageURI(result.uri);
  }

  let imagePreview = <Text>No image selected.</Text>;
  if (pickedImageURI)
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: pickedImageURI }}
        resizeMode="contain"
      />
    );

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <RegularButton onPress={takeImageHandler}>Take image</RegularButton>
      <RegularButton onPress={selectImageHandler}>Select image</RegularButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: 200,
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: Colours.primary200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
