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
  daily_steps_5000: (params: IconFuncParams) => {
    return {
      // comp: <Ionicons name="battery-charging-outline" size={params.size / 2} />,
      comp: <Image source={require("../assets/badges/images/5000Steps.png")} style={{width: params.size / 2 * 3.5, height: params.size / 2 * 3.5}} />,
      colour: "#193797",
    };
  },
  use_app: (params: IconFuncParams) => {
    return {
      comp: <Ionicons name="cart-outline" size={params.size / 2} />,
      colour: "#A2B800",
    };
  },
};
