import { achievementIcons, levelableAchievementIcons } from "../util/AchievementIcons";
import { achievementObjects } from "../util/AchievementObjects";
import { Achievement, RequirementData } from "./Achievement";
import { achievementClasses, AnyAchievementType, taskClasses } from "./AchievementClasses";
import { AchievementData, AchievementDataWithType } from "./AchievementData";
import type { LevelableAchievement } from "./LevelableAchievement";
import { Task } from "./Task";

export class AchievementHelper {
  public static fromData(object: AchievementDataWithType) {
    // const object: { data: AchievementData; type: string } =
    //   JSON.parse(jsonObject);
    const type: string = object.type;
    console.log("LEvel", object.level);
    return new achievementClasses[type]({ ...object });
  }

  public static toJson(achievement: Achievement, type: string) {
    const data = achievement.getAchievementData();
    const dataWithType: AchievementDataWithType = { ...data, type };
    return JSON.stringify(dataWithType);
  }

  public static reqsFromData(data: { type: string; args: any }): Task {
    return new taskClasses[data.type](data.args);
  }
  public static reqsToData(reqs: Task[]): RequirementData[] {
    return reqs.map((el) => {
      const type = el.constructor.name;
      const args = el.args;
      return { type, args };
    });
  }

  public static getIconFromData(
    data: AchievementData | AchievementDataWithType,
    level?: number,
    withComponent = false
  ) {
    if (data.levelable) {
      switch (data.display.icon.type) {
        case "component":
          console.log("achievementObjects", achievementObjects);
          console.log("levelableAchievementIcons", levelableAchievementIcons);
          return levelableAchievementIcons[data.id][(achievementObjects[data.id] as LevelableAchievement)?.level - 1 || 0];
        default:
          return null;
      }
    } else {
      switch (data.display.icon.type) {
        case "component":
          return achievementIcons[data.id];
          break;
        default:
          return null;
      }
    }
  }
}