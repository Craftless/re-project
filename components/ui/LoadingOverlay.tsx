import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

function LoadingOverlay({message}: {message: string}) {
  return <View style={styles.outerContainer}>
    <Text style={styles.messageText}></Text>
    <ActivityIndicator size="large" />
  </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 24,
    fontWeight: "bold",
  }
})