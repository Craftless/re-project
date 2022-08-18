import { Achievement, RequirementData } from "./Achievement";

export type AchievementData = {
  display: {
    title: string;
    description: string;
    icon: {
      type: "component" | "imageUri" | "svgIcon";
    };
  };
  id: string;
  levelable?: boolean;
  level?: number;
  maxLevel?: number;
  requirementsData: RequirementData[];
  requiredAchievements: Achievement[] | null;
  extraData?: any;
  days?: number
};

export type AchievementDataWithType = AchievementData & {
  type: string;
};
