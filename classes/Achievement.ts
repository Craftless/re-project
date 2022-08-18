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

