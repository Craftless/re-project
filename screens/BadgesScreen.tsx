import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import BadgeDisplay from "../components/badges/BadgeDisplay";
import { useAppSelector } from "../hooks/redux-hooks";
import { RootStackParamList } from "./AuthenticatedTab";

function BadgesScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Badges">>();

  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  return (
    <>
      {achievementIds.map((item) => {
        return (
          <React.Fragment key={item + Math.random().toFixed(4).toString()}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("BadgeDetails", {
                badgeId: item,
              });
            }}>
              <BadgeDisplay item={item} />
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default BadgesScreen;
