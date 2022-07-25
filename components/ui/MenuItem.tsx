import AppText from "./AppText";
import { Feather } from "@expo/vector-icons";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Surface } from "react-native-paper";

function MenuItem({ label, onPress }: { label: string, onPress?: ((event: GestureResponderEvent) => void) }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface style={styles.outerContainer}>
        <AppText style={{ fontSize: 18 }}>{label}</AppText>
        <Feather name="chevron-right" size={24} color="black" />
      </Surface>
    </TouchableOpacity>
  );
}

export default MenuItem;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 0,
  },
});
