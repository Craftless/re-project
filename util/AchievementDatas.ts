// import testAchievement from "../assets/achievements/testAchievement.json";

import { Alert } from "react-native";
import {
  Achievement,
} from "../classes/Achievement";
import { AnyAchievementType } from "../classes/AchievementClasses";
import { AchievementDataWithType } from "../classes/AchievementData";
import { AchievementHelper } from "../classes/AchievementHelper";
import { store } from "../store/redux/store";
import { achievementObjects } from "./AchievementObjects";
const test = require("../constants/achievements/test.json");
const daily_steps_5000 = require("../constants/achievements/daily_steps_5000.json");
const use_app = require("../constants/achievements/use_app.json");
const lifetime_10000_steps = require("../constants/achievements/lifetime_10000_steps.json");
const lifetime_15000_steps = require("../constants/achievements/lifetime_15000_steps.json");
const lifetime_20000_steps = require("../constants/achievements/lifetime_20000_steps.json");
const lifetime_30000_steps = require("../constants/achievements/lifetime_30000_steps.json");
const lifetime_40000_steps = require("../constants/achievements/lifetime_40000_steps.json");
const lifetime_50000_steps = require("../constants/achievements/lifetime_50000_steps.json");
const lifetime_75000_steps = require("../constants/achievements/lifetime_75000_steps.json");
const lifetime_100000_steps = require("../constants/achievements/lifetime_100000_steps.json");
const lifetime_125000_steps = require("../constants/achievements/lifetime_125000_steps.json");
const lifetime_150000_steps = require("../constants/achievements/lifetime_150000_steps.json");
const lifetime_175000_steps = require("../constants/achievements/lifetime_175000_steps.json");
const lifetime_200000_steps = require("../constants/achievements/lifetime_200000_steps.json");
const lifetime_250000_steps = require("../constants/achievements/lifetime_250000_steps.json");
const lifetime_300000_steps = require("../constants/achievements/lifetime_300000_steps.json");
const lifetime_350000_steps = require("../constants/achievements/lifetime_350000_steps.json");
const lifetime_400000_steps = require("../constants/achievements/lifetime_400000_steps.json");
const lifetime_450000_steps = require("../constants/achievements/lifetime_450000_steps.json");
const lifetime_500000_steps = require("../constants/achievements/lifetime_500000_steps.json");
const lifetime_550000_steps = require("../constants/achievements/lifetime_550000_steps.json");
const lifetime_600000_steps = require("../constants/achievements/lifetime_600000_steps.json");
const lifetime_700000_steps = require("../constants/achievements/lifetime_700000_steps.json");
const lifetime_800000_steps = require("../constants/achievements/lifetime_800000_steps.json");
const lifetime_900000_steps = require("../constants/achievements/lifetime_900000_steps.json");
const lifetime_1000000_steps = require("../constants/achievements/lifetime_1000000_steps.json");
const levelable_5000_steps_daily = require("../constants/achievements/levelable_5000_steps_daily.json");
const levelable_10000_steps_daily = require("../constants/achievements/levelable_10000_steps_daily.json");
const levelable_15000_steps_daily = require("../constants/achievements/levelable_15000_steps_daily.json");
const levelable_20000_steps_daily = require("../constants/achievements/levelable_20000_steps_daily.json");


// const achievements = new Map<string, AchievementDataWithType>();
export const achievements: { [key: string]: AchievementDataWithType } = {
  // test,
  // daily_steps_5000,
  use_app,
  lifetime_10000_steps,
  lifetime_15000_steps,
  lifetime_20000_steps,
  lifetime_30000_steps,
  lifetime_40000_steps,
  lifetime_50000_steps,
  lifetime_75000_steps,
  lifetime_100000_steps,
  lifetime_125000_steps,
  lifetime_150000_steps,
  lifetime_175000_steps,
  lifetime_200000_steps,
  lifetime_250000_steps,
  lifetime_300000_steps,
  lifetime_350000_steps,
  lifetime_400000_steps,
  lifetime_450000_steps,
  lifetime_500000_steps,
  lifetime_550000_steps,
  lifetime_600000_steps,
  lifetime_700000_steps,
  lifetime_800000_steps,
  lifetime_900000_steps,
  lifetime_1000000_steps,
  levelable_5000_steps_daily,
  levelable_10000_steps_daily,
  levelable_15000_steps_daily,
  levelable_20000_steps_daily
};

export function initialiseAchievements(
  ids: string[],
  levelMap: {
    id: string;
    level: number;
  }[],
  idExtraDataMap: { [id: string]: any }
) {
  let message = ""
  for (const thing of levelMap) {
    message += `id: ${thing.id}, level: ${thing.level}`;
  }
  Alert.alert(message);
  console.log("Initialised");
  for (const id in achievements) {
    let extraData;
    if (idExtraDataMap && idExtraDataMap[id]) extraData = idExtraDataMap[id];
    const baseAchievementData = {
      ...achievements[id],
      extraData,
    };
    if (!ids.includes(id)) {
      const achievement: AnyAchievementType = AchievementHelper.fromData(baseAchievementData);
      achievementObjects[achievement.id] = achievement;
    } else if (achievements[id].levelable) {
      const indexOf = levelMap.findIndex(
        (val) => val.id == achievements[id].id
      );
      if (indexOf == -1) continue;
      const achievement: AnyAchievementType = AchievementHelper.fromData({
        ...baseAchievementData,
        level: levelMap[indexOf].level,
      });
      achievementObjects[achievement.id] = achievement;
      Alert.alert(`Map says ${levelMap[indexOf].level}`);
    }
  }
  for (const achievement in achievementObjects) {
    achievement;
  }
}

// export function add(location: string) {
//   const object: AchievementDataWithType = require(location);
//   achievements.set(object.id, object);
// }

// export function addAll() {
//   const object: AchievementDataWithType = require(paths[0]);
//   achievements.set(object.id, object);
// }

/*
1. Make json file
2. register in AchievementData
3. Make icon and register in AchievementIcons
*/
