// import testAchievement from "../assets/achievements/testAchievement.json";

import {
  Achievement,
  AchievementDataWithType,
  AnyAchievementType,
} from "../classes/Achievement";
import { store } from "../store/redux/store";
const test = require("../constants/achievements/test.json");
const daily_steps_5000 = require("../constants/achievements/daily_steps_5000.json");
const use_app = require("../constants/achievements/use_app.json");
const levelable_1000_steps_daily = require("../constants/achievements/levelable_1000_steps_daily.json");

// const achievements = new Map<string, AchievementDataWithType>();
export const achievements: { [key: string]: AchievementDataWithType } = {
  test,
  daily_steps_5000,
  use_app,
  levelable_1000_steps_daily,
};

export const achievementObjects: { [key: string]: AnyAchievementType } = {};

export function initialiseAchievements(
  ids: string[],
  levelMap: {
    id: string;
    level: number;
  }[],
) {
  for (const key in achievements) {
    if (!ids.includes(key)) {
      const achievement: AnyAchievementType = Achievement.fromData(
        achievements[key]
      );
      achievementObjects[achievement.id] = achievement;
    }
    else if (achievements[key].levelable) {
      const indexOf = levelMap.findIndex(val => val.id == achievements[key].id);
      if (indexOf == -1) continue;
      const achievement: AnyAchievementType = Achievement.fromData(
        {...achievements[key], level: levelMap[indexOf].level}
      );
      achievementObjects[achievement.id] = achievement;
      levelMap[indexOf].level
    }
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
