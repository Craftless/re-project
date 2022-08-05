import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export type IconFuncParams = {
  size: number;
};

export type IconFunc = (params: IconFuncParams) => {
  comp: React.ReactNode;
  colour: string;
};

export const achievementIcons: {
  [key: string]: IconFunc;
} = {
  test: (params: IconFuncParams) => {
    return {
      comp: <Ionicons name="add" size={params.size / 2} />,
      colour: "#E40000",
    };
  },
  use_app: (params: IconFuncParams) => {
    return {
      comp: <Ionicons name="cart-outline" size={params.size / 2} />,
      colour: "#A2B800",
    };
  },
};

export const levelableAchievementIcons: { [key: string]: IconFunc[] } = {
  daily_steps_5000: [
    (params: IconFuncParams) => {
      return {
        comp: (
          <Image
            source={require("../assets/badges/images/5000StepsDaily.png")}
            style={{
              width: (params.size / 2) * 3.5,
              height: (params.size / 2) * 3.5,
            }}
          />
        ),
        colour: "#193797",
      };
    },
  ],
  levelable_1000_steps_daily: [
    (params: IconFuncParams) => {
      return {
        comp: (
          <Image
            source={require("../assets/badges/images/5000StepsDaily.png")}
            style={{
              width: (params.size / 2) * 3.5,
              height: (params.size / 2) * 3.5,
            }}
          />
        ),
        colour: "#193797",
      };
    },
  ],
};
