import { View, Text, StyleSheet, ActivityIndicator, Modal } from "react-native";

function LoadingOverlay({ message }: { message: string }) {
  return (
    <Modal>
      <View style={styles.outerContainer}>
        <Text style={styles.messageText}>{message}</Text>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
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
  },
});
