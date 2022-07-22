import { addAchievement } from "../store/redux/achievements-slice";
import { store } from "../store/redux/store";
import EventEmitter from "../util/EventEmitter";
import { achievementIcons } from "../util/AchievementIcons";

export type AchievementData = {
  display: {
    title: string;
    description: string;
    icon: {
      type: "component" | "imageUri" | "svgIcon";
    };
  };
  id: string;
  requirementsData: RequirementData[];
  requiredAchievements: Achievement[] | null;
};

export type AchievementDataWithType = AchievementData & {
  type: string;
};

type RequirementData = { type: string; args: any };

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
    requirementsData,
    requiredAchievements,
  }: AchievementData) {
    this.title = title;
    this.description = description;
    this.iconSettings = icon;
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
    const complete = this.checkIfCompleted();
    if (complete) {
      store.dispatch(addAchievement({ achievementId: this.id }));
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
      requirementsData: Achievement.reqsToData(this.requirements),
      requiredAchievements: this.requiredAchievements,
    };
    return data;
  }

  getIcon() {
    switch (this.iconSettings.type) {
      case "component":
        return achievementIcons[this.id];
        break;
      case "imageUri":
        return 
    }
  }

  static AchievementData = class {
    title;
    constructor(title: string) {
      this.title = title;
    }
  };

  public static fromData(object: AchievementDataWithType) {
    // const object: { data: AchievementData; type: string } =
    //   JSON.parse(jsonObject);
    const type: string = object.type;
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
    withComponent = false
  ) {
    switch (data.display.icon.type) {
      case "component":
        return achievementIcons[data.id];
        break;
      default:
        return null;
    }
  }
}

class Task {
  args: any;
  isComplete;
  constructor(args: { condition: boolean } = { condition: false }) {
    this.isComplete = args.condition;
    this.isDirty();
  }
  isDirty = () => {};
  getIsComplete() {
    return this.isComplete;
  }
}

class TestTask extends Task {
  eventName;
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

class ObtainNumberTask extends Task {
  eventName;
  isComplete;
  args;
  constructor(args: { eventName: string; numberToObtain: number }) {
    super();
    this.args = args;
    this.eventName = args.eventName;
    this.isComplete = false;
    const unsub = EventEmitter.addListener(args.eventName, (value: number) => {
      console.log("VALUE: ", args.numberToObtain);
      if (value >= args.numberToObtain) {
        this.isComplete = true;
        this.isDirty();
        unsub.remove();
      }
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
  ObtainNumberTask,
};

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

// console.log(Achievement.toJson(testAchievemen, "Achievement"));

// const testAchievemen: Achievement = new achievementClasses["Achievement"]({
// title: "New Title",
// description: "Description text",
// id: "test",
// requirementsData: [
//   { type: "TestTask", args: { eventName: "test" } },
// ] as RequirementData[],
// // requirements: [new TestTask({ eventName: "test" })],
// requiredAchievements: null,
// });

// const asset = require("../constants/achievements/test.json");

// console.log(Achievement.toJson(testAchievemen, "Achievement"));

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
