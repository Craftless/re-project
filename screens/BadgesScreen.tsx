import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import BadgeDisplay from "../components/badges/BadgeDisplay";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";
import { RootStackParamList } from "./AuthenticatedTab";

function BadgesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Badges">>();

  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  const theme = useTheme();

  const width = Dimensions.get("window").width;

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/badges/images/badges_collected.png")}
          style={{ width: width, height: width, resizeMode: "contain", opacity: 0.5 }}
        />
        <AppText style={{ position: "absolute", fontSize: 100, color: theme.colors.primary, fontWeight: "bold" }}>{achievementIds.length}</AppText>
      </View>
      {achievementIds.map((item) => {
        return (
          <React.Fragment key={item + Math.random().toFixed(4).toString()}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BadgeDetails", {
                  badgeId: item,
                });
              }}
            >
              <BadgeDisplay item={item} />
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
}

export default BadgesScreen;
