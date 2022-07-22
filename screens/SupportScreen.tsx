import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

function SupportScreen() {
  const [height, setHeight] = useState<number>();

  function submitSupportHandler() {}

  return (
    <View>
      <TextInput
        autoComplete
        mode="outlined"
        multiline
        placeholder="Write something with multilines  here.."
        onContentSizeChange={(event) => {
          setHeight(event.nativeEvent.contentSize.height);
        }}
        style={{
          height, // <- set the max height here
        }}
      />
      <Button mode="contained">Submit</Button>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default SupportScreen;
