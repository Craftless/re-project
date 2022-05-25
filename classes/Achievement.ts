import { Asset } from "expo-asset";
import { readDirectoryAsync } from "expo-file-system";
import { addAchievement } from "../store/redux/achievements-slice";
import { store } from "../store/redux/store";
import EventEmitter from "../util/EventEmitter";
import * as FileSystem from "expo-file-system";

type AchievementData = {
  title: string;
  description: string;
  id: string;
  requirementsData: RequirementData[];
  requiredAchievements: Achievement[] | null;
};

type RequirementData = { type: string; args: any };

export class Achievement {
  title;
  description;
  id;
  requirements: Task[];
  requiredAchievements;
  isComplete;
  constructor({
    title,
    description,
    id,
    requirementsData,
    requiredAchievements,
  }: AchievementData) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.requirements = requirementsData.map((el) => {
      return Achievement.reqsFromData(el);
    });
    this.requiredAchievements = requiredAchievements;
    this.isComplete = false;
    this.requirements.forEach((element) => {
      element.isDirty = () => {
        this.taskIsDirty();
      };
    });
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
    const complete = this.checkIfCompleted();
    if (complete) {
      // update state through redux or react context
      store.dispatch(addAchievement({ achievementId: this.id }));
    }
  }

  getAchievementData() {
    const data: AchievementData = {
      title: this.title,
      description: this.description,
      id: this.id,
      requirementsData: Achievement.reqsToData(this.requirements),
      requiredAchievements: this.requiredAchievements,
    };
    return data;
  }

  static AchievementData = class {
    title;
    constructor(title: string) {
      this.title = title;
    }
  };

  public static fromJson(object: { data: AchievementData; type: string }) {
    // const object: { data: AchievementData; type: string } =
    //   JSON.parse(jsonObject);
    const type: string = object.type;
    return new achievementClasses["Achievement"]({ ...object.data });
  }

  public static toJson(achievement: Achievement, type: string) {
    const data = achievement.getAchievementData();
    return JSON.stringify({ data, type });
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
}

class Task {
  args: any;
  isDirty = () => {};
  getIsComplete() {
    return false;
  }
}

class TestTask extends Task {
  eventName;
  isComplete;
  args;
  constructor(args: { eventName: string }) {
    super();
    this.args = args;
    this.eventName = args.eventName;
    this.isComplete = false;
    EventEmitter.once(args.eventName, () => {
      this.isComplete = true;
      this.isDirty();
    });
  }

  getIsComplete() {
    return this.isComplete;
  }
}

const achievementClasses: any = {
  Achievement,
};

const taskClasses: any = {
  Task,
  TestTask,
};

// const testAchievemen: Achievement = new achievementClasses["Achievement"]({
//   title: "New Title",
//   description: "Description text",
//   id: "test",
//   requirementsData: [
//     { type: "TestTask", args: { eventName: "test" } },
//   ] as RequirementData[],
//   // requirements: [new TestTask({ eventName: "test" })],
//   requiredAchievements: null,
// });

const asset = require("../assets/achievements/testAchievement.json");

// console.log(Achievement.toJson(testAchievemen, "Achievement"));

export const testAchievement = Achievement.fromJson(asset);

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
