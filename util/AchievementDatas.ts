// import testAchievement from "../assets/achievements/testAchievement.json";

import { Achievement, AchievementDataWithType } from "../classes/Achievement";
const test = require("../constants/achievements/test.json");
const daily_steps_5000 = require("../constants/achievements/daily_steps_5000.json");
const use_app = require("../constants/achievements/use_app.json");

// const achievements = new Map<string, AchievementDataWithType>();
export const achievements: { [key: string]: AchievementDataWithType } = {
  test,
  daily_steps_5000,
  use_app,
};

export function initialiseAchievements() {
  for (const key in achievements) {
    Achievement.fromData(achievements[key]);
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