import { View, StyleSheet, ActivityIndicator, Modal } from "react-native";
import AppText from "./AppText";

function LoadingOverlay({ message }: { message: string }) {
  return (
    <Modal>
      <View style={styles.outerContainer}>
        <AppText style={styles.messageText}>{message}</AppText>
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
