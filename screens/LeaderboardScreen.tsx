import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from "@react-navigation/material-top-tabs";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { fetchDisplayNameAndPhotoURLFromUid } from "../util/leaderboard";
import { projectDatabase } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { LeaderboardItem, UserSteps } from "../types/leaderboard";
import LeaderboardItemComponent from "../components/functionality/LeaderboardItem";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
import { RouteProp } from "@react-navigation/native";
import {
  set7dStepsLBData,
  setSFMLBData,
  setTotalNumStepsData,
} from "../store/redux/leaderboard-slice";

export type LeaderboardTabParamList = {
  Today: {
    type: string;
  };
  Week: {
    type: string;
  };
  Total: {
    type: string;
  };
};

const Tab = createMaterialTopTabNavigator<LeaderboardTabParamList>();

export function LeaderboardTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Today"
        component={LeaderboardScreen}
        initialParams={{ type: "steps_from_midnight" }}
      />
      <Tab.Screen
        name="Week"
        component={LeaderboardScreen}
        initialParams={{ type: "steps_7d" }}
      />
      <Tab.Screen
        name="Total"
        component={LeaderboardScreen}
        initialParams={{ type: "total_steps" }}
      />
    </Tab.Navigator>
  );
}

function LeaderboardScreen({
  navigation,
  route,
}: {
  navigation: MaterialTopTabNavigationProp<LeaderboardTabParamList>;
  route: RouteProp<LeaderboardTabParamList>;
}) {
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState(
    route.params.type as "steps_from_midnight" | "steps_7d" | "total_steps"
  );
  const [refreshing, setRefreshing] = useState(false);
  const authCtxx = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const lb_steps_week = useAppSelector(
    (state) => state.leaderboard.lb_steps_week
  );
  const lb_steps_from_midnight = useAppSelector(
    (state) => state.leaderboard.lb_steps_from_midnight
  );
  const lb_steps_total = useAppSelector(
    (state) => state.leaderboard.lb_totalNumSteps
  );
  // switch (selectedItemType) {
  //   case "steps_7d":
  //     leaderboardData = useAppSelector(
  //       (state) => state.leaderboard.lb_steps_week
  //     );
  //     Alert.alert("oncee");
  //     break;
  //   case "steps_from_midnight":
  //     leaderboardData = useAppSelector(
  //       (state) => state.leaderboard.lb_steps_from_midnight
  //     );
  //     Alert.alert("oncee");
  //     break;
  //   default:
  //     leaderboardData = useAppSelector(
  //       (state) => state.leaderboard.lb_steps_week
  //     );
  //     Alert.alert("oncee");
  //     break;
  // }

  function getDbName(
    selectedItemType: "steps_from_midnight" | "steps_7d" | "total_steps"
  ) {
    switch (selectedItemType) {
      case "steps_from_midnight":
        return "stepsFromMidnight";
      case "steps_7d":
        return "steps";
      case "total_steps":
        return "totalNumSteps";
    }
    return "steps";
  }

  function getData(
    selectedItemType: "steps_from_midnight" | "steps_7d" | "total_steps"
  ) {
    switch (selectedItemType) {
      case "steps_from_midnight":
        return lb_steps_from_midnight;
      case "steps_7d":
        return lb_steps_week;
      case "total_steps":
        return lb_steps_total;
    }
    return null;
  }

  async function reloadLeaderboard() {
    setIsLeaderboardLoading(true);

    const dbName = getDbName(selectedItemType);
    try {
      const now = Date.now();
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);
      const cutoffNum = cutoff.getTime();
      const old = projectDatabase
        .ref("leaderboard")
        .orderByChild("sfm_timestamp")
        .endAt(cutoffNum)

      const got = await old.get();
      got.forEach((val) => {
        val.child("stepsFromMidnight").ref.remove();
      });

      const stepsRef = projectDatabase
        .ref("leaderboard")
        .orderByChild(dbName)
        .limitToLast(5);

      const get = await stepsRef.get();

      let userStepsArr: UserSteps[] = [];

      console.log("get", get);

      get.forEach((item) => {
        const val = item.val();
        const uid = item.key;
        if (uid) {
          if (!!val[dbName]) {
            userStepsArr.push({
              uid,
              steps: val[dbName],
            });
          }
        }
      });

      userStepsArr.reverse();
      let items: LeaderboardItem[] = [];

      await Promise.all(
        userStepsArr.map(async (item, index) => {
          const userDetails = await fetchDisplayNameAndPhotoURLFromUid(
            item.uid
          );
          if (userDetails)
            items.push({ rank: index + 1, ...userDetails, steps: item.steps });
        })
      );

      switch (selectedItemType) {
        case "steps_from_midnight":
          dispatch(setSFMLBData({ lb_steps_from_midnight: items }));
          break;
        case "steps_7d":
          dispatch(set7dStepsLBData({ lb_steps_week: items }));
          break;
        case "total_steps":
          dispatch(setTotalNumStepsData({ lb_totalNumSteps: items }));
          break;
      }
    } catch (e) {
      Alert.alert((e as Error).message);
    } finally {
      setIsLeaderboardLoading(false);
    }
  }

  useEffect(() => {
    reloadLeaderboard();
    // }

    // stepsRef.on("value", (snapshot) => {
    //   console.log(`Snapshot value: ${snapshot.val()}`);
    //   dispatch(setLeaderboardData({ leaderboard: snapshot.val() }));
    // });

    // return stepsRef.off();
  }, [selectedItemType]);

  function LBButton({
    displayText,
    id,
  }: {
    displayText: string;
    id: "steps_from_midnight" | "steps_7d" | "total_steps";
  }) {
    return (
      <Button
        mode="text"
        onPress={() => setSelectedItemType(id)}
        style={selectedItemType == id ? styles.activeBtn : null}
      >
        {displayText}
      </Button>
    );
  }

  return isLeaderboardLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <LeaderboardItemComponent item={null} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              reloadLeaderboard();
            }}
          />
        }
        renderItem={(itemData) => {
          return <LeaderboardItemComponent item={itemData.item} />;
        }}
        data={getData(selectedItemType)}
        keyExtractor={(item) => {
          return item.rank.toString();
        }}
      />
      <Button
        onPress={() => {
          reloadLeaderboard();
        }}
        mode="text"
      >
        <Ionicons name="refresh" size={24} color="gray" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    margin: 16,
  },
  images: {
    width: 75,
    height: 75,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  activeBtn: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRadius: 0,
  },
});
