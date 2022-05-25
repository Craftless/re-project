// import testAchievement from "../assets/achievements/testAchievement.json";
import { Achievement, AchievementDataWithType } from "../classes/Achievement";
const test = require("../constants/achievements/test.json");
const daily_steps_5000 = require("../constants/achievements/daily_steps_5000.json");

// const achievements = new Map<string, AchievementDataWithType>();
export const achievements: { [key: string]: AchievementDataWithType } = {
  test,
  daily_steps_5000
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
