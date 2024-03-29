import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";
import { RootStackParamList } from "./AuthenticatedTab";

function TotalStepsScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "TotalSteps">) {
  let totalStepsArr = route.params.totalStepsArr;
  if (!totalStepsArr) {
    const totalStepsFromSelector = useAppSelector(
      (state) => state.stepCount.totalSteps
    );
    totalStepsArr = [...totalStepsFromSelector].reverse();
  }
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const theme = useTheme();

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.date}
        data={totalStepsArr}
        renderItem={(itemData) => {
          const dateString = itemData.item.date;
          const stepsNumber = itemData.item.steps;
          const dateObject = new Date(
            Number(dateString.slice(0, 4)),
            Number(dateString.slice(4, 6)) - 1,
            Number(dateString.slice(6))
          );
          const stepsColour =
            stepsNumber > 10000
              ? theme.colors.primary
              : stepsNumber < 5000
              ? theme.colors.placeholder
              : theme.colors.text;

          return (
            <>
              <View style={styles.itemContainer}>
                <View>
                  <AppText style={styles.dateText}>
                    {dateObject.toDateString().slice(4)}
                  </AppText>
                  <AppText style={styles.dateText}>
                    {days[dateObject.getDay()]}
                  </AppText>
                </View>
                <AppText style={[styles.stepsText, { color: stepsColour }]}>
                  {stepsNumber}
                </AppText>
              </View>
              {itemData.index < totalStepsArr!.length - 1 && (
                <View
                  style={{
                    height: 2,
                    backgroundColor: theme.colors.disabled,
                    borderRadius: 1,
                  }}
                />
              )}
            </>
          );
        }}
      />
    </>
  );
}

export default TotalStepsScreen;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 18,
  },
  stepsText: {
    fontSize: 20,
  },
});
