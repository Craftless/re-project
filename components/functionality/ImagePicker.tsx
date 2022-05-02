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
import { getInfoAsync } from "expo-file-system";
import { manipulateAsync } from "expo-image-manipulator";

function isLessThanMB(fileSize: number, smallerThan: number) {
  return fileSize / 1024 / 1024 < smallerThan;
}

function ImagePicker({
  onImageChosen,
}: {
  onImageChosen: (uri: string) => Promise<void>;
}) {
  const [cameraPermissionsInformation, requestCameraPermissions] =
    useCameraPermissions();
  const [mediaLibPermissionsInformation, requestMediaLibPermissions] =
    useMediaLibraryPermissions();

  const [pickedImageURI, setPickedImageURI] = useState(""); 
  const [previewImageURI, setPreviewImageURI] = useState(""); 

  // useEffect(() => {
  //   onImageChosen(pickedImageURI);
  // }, [pickedImageURI]);

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
      quality: 0.7,
      mediaTypes: MediaTypeOptions.Images,
    });
    if (result.cancelled) return;

    const manipResult = await manipulateAsync(
      result.uri,
      [{ resize: { width: 100, height: 100 } }],
      { compress: 0.5 }
    );

    const origFileInfo = await getInfoAsync(result.uri);

    const manipFileInfo = await getInfoAsync(manipResult.uri);
    if (!manipFileInfo?.size) {
      Alert.alert("The size of this image is unkown!.");
      return;
    }

    if (origFileInfo.size) {
      console.log(`Original: ${origFileInfo.size / 1024 / 1024}`);
      console.log(`Manipulated: ${manipFileInfo.size / 1024 / 1024}`);
    }

    if (isLessThanMB(manipFileInfo.size, 3)) {
      setPickedImageURI(manipResult.uri); // The actual uri we will save
      setPreviewImageURI(result.uri); // The much higher quality image used for preview
    }
  }

  async function selectImageHandler() {
    const hasMediaLibPermissions = await verifyMediaLibPermissions();
    if (!hasMediaLibPermissions) return;

    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
      mediaTypes: MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    const manipResult = await manipulateAsync(
      result.uri,
      [{ resize: { width: 100, height: 100 } }],
      { compress: 0.5 }
    );

    const origFileInfo = await getInfoAsync(result.uri);

    const manipFileInfo = await getInfoAsync(manipResult.uri);
    if (!manipFileInfo?.size) {
      Alert.alert("The size of this image is unkown!.");
      return;
    }

    if (origFileInfo.size) {
      console.log(`Original: ${origFileInfo.size / 1024 / 1024}`);
      console.log(`Manipulated: ${manipFileInfo.size / 1024 / 1024}`);
    }

    if (isLessThanMB(manipFileInfo.size, 3)) {
      setPickedImageURI(manipResult.uri); // The actual uri we will save
      setPreviewImageURI(result.uri); // The much higher quality image used for preview
    }
  }

  function confirmImageHandler() {
    onImageChosen(pickedImageURI);
  }

  let imagePreview = <Text>No image selected.</Text>;
  if (pickedImageURI && previewImageURI)
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: previewImageURI }}
      />
    );

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <RegularButton onPress={takeImageHandler}>Take image</RegularButton>
      <RegularButton onPress={selectImageHandler}>Select image</RegularButton>
      <RegularButton onPress={confirmImageHandler}>Confirm</RegularButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: 250,
    height: 250,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 125,
    overflow: "hidden",
    backgroundColor: Colours.primary200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
