import { View } from "react-native";
import RegularButton from "../ui/RegularButton";
import { launchCameraAsync } from "expo-image-picker";

function ImagePicker() {
  function takeImageHandler() {}

  return (
    <View>
      <View></View>
      <RegularButton onPress={takeImageHandler}>Take image</RegularButton>
    </View>
  );
}

export default ImagePicker;
