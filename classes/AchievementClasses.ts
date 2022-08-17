import { Achievement } from "./Achievement";
import { LevelableAchievement } from "./LevelableAchievement";
import { DailyLevelableAchievement } from "./DailyLevelableAchievement";
import { Task } from "./Task";
import { TestTask } from "./TestTask";
import { ObtainNumberTask } from "./ObtainNumberTask";


export const achievementClasses: any = {
  Achievement,
  LevelableAchievement,
  DailyLevelableAchievement,
};

export type AnyAchievementType = Achievement | LevelableAchievement | DailyLevelableAchievement;

export const taskClasses: any = {
  Task,
  TestTask,
  ObtainNumberTask,
};