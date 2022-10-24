import { Achievement } from "./Achievement";
import { AchievementData } from "./AchievementData";

export class LevelableAchievement extends Achievement {
  level; // If level == -1, there isn't any
  maxLevel;
  canLevelUp;
  achieved;
  isMaxLevel;
  constructor(achievementData: AchievementData) {
    // this.title = title;
    // this.description = description;
    // this.iconSettings = icon;
    // this.id = id;
    // this.requirements = requirementsData.map((el) => {
    //   return Achievement.reqsFromData(el);
    // });
    // this.requiredAchievements = requiredAchievements;
    // this.isComplete = false;
    // this.requirements.forEach((element) => {
    //   element.isDirty = () => {
    //     this.taskIsDirty();
    //   };
    // });
    // this.taskIsDirty();
    super(achievementData);
    this.level = achievementData.level ?? -1;
    this.maxLevel = achievementData.maxLevel ?? 1;
    console.log(this.id, "ACL", achievementData.level, "MY OWN", this.level);
    this.canLevelUp = true;
    this.isMaxLevel = false;
    this.achieved = false;
    this.checkAndSetisMaxLevel();
    this.taskIsDirty();
  }

  taskIsDirty(): void {
    if (this.isMaxLevel) return;
    console.log(this.id, "TDMY OWN", this.level);
    const complete = this.checkIfCompleted();
    const canLevelUp = this.checkIfCanLevelUp();
    console.log(this.id, "Complete: ", complete, "canLevelUp: ", canLevelUp);
    if (this.level == -1 || 0) {
      super.taskIsDirty(); // update completed status
    } else {
      if (complete && canLevelUp) {
        this.level++;
        if (!this.achieved) {
          super.checkCompletedAndUpdate();
        }
        super.taskIsDirty();
        this.afterLevelUp();
      }
    }
  }

  afterLevelUp() {
    this.checkAndSetisMaxLevel();
  }

  checkAndSetisMaxLevel() {
    this.isMaxLevel = this.level >= this.maxLevel;
  }

  checkIfCanLevelUp() {
    return false;
  }

  getAchievementData() {
    const data = super.getAchievementData();
    console.log("ACHIEVEMENT WARN CONSOLE RED FLAG DUCK");
    data.level = this.level;
    return data;
  }
}