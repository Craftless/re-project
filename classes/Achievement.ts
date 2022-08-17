import {
  saveExtraData,
  sendAchievementsUnlocked,
} from "../store/redux/achievements-slice";
import { store } from "../store/redux/store";
import {
  achievementIcons,
} from "../util/AchievementIcons";
import { AchievementData } from "./AchievementData";
import { AchievementHelper } from "./AchievementHelper";
import { Task } from "./Task";

export type RequirementData = { type: string; args: any };

export class Achievement {
  title;
  description;
  iconSettings;
  id;
  requirements: Task[];
  requiredAchievements;
  isComplete;
  constructor({
    display: { title, description, icon },
    id,
    extraData,
    requirementsData,
    requiredAchievements,
  }: AchievementData) {
    this.title = title;
    this.description = description;
    this.iconSettings = icon;
    this.id = id;
    this.requirements = requirementsData.map((el) => {
      return AchievementHelper.reqsFromData(el);
    });
    this.requiredAchievements = requiredAchievements;
    this.isComplete = false;
    this.requirements.forEach((element) => {
      element.isDirty = () => {
        this.taskIsDirty();
      };
    });
    this.taskIsDirty();
  }
  checkIfCompleted() {
    this.isComplete = this.getIsCompleted();
    return this.isComplete;
  }
  private getIsCompleted() {
    if (
      this.requiredAchievements &&
      !this.requiredAchievements.every((el) => {
        return el.isComplete;
      })
    ) {
      return false;
    }
    return this.requirements.every((el) => {
      return el.getIsComplete();
    });
  }

  taskIsDirty() {
    this.checkCompletedAndUpdate();
  }

  checkCompletedAndUpdate() {
    const complete = this.checkIfCompleted();
    if (complete) {
      store.dispatch(sendAchievementsUnlocked(this.id));
    }
  }

  getAchievementData() {
    const data: AchievementData = {
      display: {
        title: this.title,
        description: this.description,
        icon: this.iconSettings,
      },
      id: this.id,
      requirementsData: AchievementHelper.reqsToData(this.requirements),
      requiredAchievements: this.requiredAchievements,
    };
    console.log("ACHIEVEMENT  DUCK");
    return data;
  }

  setExtraData(extraData: any) {
    store.dispatch(saveExtraData({id: this.id, extraData: extraData} as { id: string; extraData: any }));
  }

  getIcon() {
    switch (this.iconSettings.type) {
      case "component":
        return achievementIcons[this.id];
      case "imageUri":
        return;
    }
  }
}




// const testAchievemen: Achievement = new achievementClasses["Achievement"]({
//   display: {
//     title: "5000 Steps - Past 24 hours",
//     description: "Walk 5000 steps or more in the past 24 hours.",
//   },
//   id: "daily_steps_5000",
//   requirementsData: [
//     { type: "ObtainNumberTask", args: { eventName: "test", number: 5000 } },
//   ] as RequirementData[],
//   requiredAchievements: null,
// });

// const testAchievemen: DailyLevelableAchievement = new achievementClasses["DailyLevelableAchievement"]({
//   display: {
//     title: "10000 Steps - Daily",
//     description: "Walk 10000 steps or more today.",
//   },
//   id: "levelable_1000_steps_daily",
//   requirementsData: [
//     { type: "ObtainNumberTask", args: { eventName: "steps_from_midnight", number: 1000 } },
//   ] as RequirementData[],
//   requiredAchievements: null,
// }, 1,);

// console.log(Achievement.toJson(testAchievemen, "Achievement"));

// const testAchievemen: Achievement = new achievementClasses["DailyLevelableAchievement"]({
// title: "10000 Daily Steps",
// description: "Description text",
// id: "levelable_1000_daily",
// level: 1,
// requirementsData: [
//   { type: "ObtainNumberTask", args: { eventName: "steps_from_midnight", number: 1000 } },
// ] as RequirementData[],
// // requirements: [new TestTask({ eventName: "test" })],
// requiredAchievements: null,
// });

// const asset = require("../constants/achievements/test.json");

// console.log(Achievement.fromData());

// export const testAchievement = Achievement.fromData(asset);

// class StepsAchievement extends Achievement {
//   constructor(title: string, description: string, requirements: Task[]) {
//     super(title, description, requirements);
//   }
// }

// // Steps ?/? km walked ?/?, time spent walking, achieve #1 on daily/weekly leaderboard, lose x kg of weight, step streak

// const StepsAchievement = new Achievement(
//   "Steps Achievement",
//   "You walked 1000 steps in the last 24 hours",
//   new NumberTask(0, 1000, {
//     update();,
//   })
// );

// export default Achievement;

// class NumberTask extends Task {
//   initialNumber;
//   currentNumber;
//   goalNumber;
//   observer;
//   constructor(initialNumber: number, goalNumber: number, observer: Observer) {
//     super();
//     this.initialNumber = initialNumber;
//     this.currentNumber = initialNumber; // to get rid of errors
//     this.updateCurrentNumber(initialNumber);
//     this.goalNumber = goalNumber;
//     this.observer = observer;
//   }
//   updateCurrentNumber(newNumber: number) {
//     this.currentNumber = newNumber;
//     this.observer.update(newNumber);
//     return this.currentNumber;
//   }
// }

// class EventTask extends Task {
// }

// class StatsTask extends Task {

//   constructor(stat) {
//     super();
//   }

//   isComplete(userStats: UserStats): boolean {
//     return userStats.stat;
//   }
// }

// declare type UserStats;

// type Observer = {
//   update: (payload: any) => void;
// };

// /*
// Achievement manager

// achievement array;

// AchievementManager.fire({type: "steps", value: stepCount});

// fire(state, action) {
//   switch(action.payload.type) {
//     case "steps":
//       handleSteps();
//       break;
//   }
// }

// function handleSteps() {

// }

// */
