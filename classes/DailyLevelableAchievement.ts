import { AchievementData } from "./AchievementData";
import { LevelableAchievement } from "./LevelableAchievement";


type DailyLevelableExtraData = {
  newDate: string;
}
export class DailyLevelableAchievement extends LevelableAchievement {
  newDate;
  constructor(achievementData: AchievementData) {
    super(achievementData);
    if ((achievementData?.extraData as DailyLevelableExtraData)?.newDate) {
      this.newDate = new Date(achievementData.extraData.newDate);
      console.log("BLue blue blue new Date", this.newDate)
    }
    else this.newDate = new Date();
    this.newDate.setHours(0, 0, 0, 0);
    setTimeout(() => {
      console.log(this.id, this.level);
    }, 1000);
  }

  afterLevelUp() {
    super.afterLevelUp();
    this.canLevelUp = false;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    this.newDate = date;
    if (this.newDate) {
      console.log("STRINGed date", this.newDate.toString());
      this.setExtraData({ newDate: this.newDate.toString() })
    }
    this.taskIsDirty();
  }

  checkIfCanLevelUp(): boolean {
    console.log("New Date", this.newDate);
    this.canLevelUp = new Date() > this.newDate;
    return this.canLevelUp;
  }
}
