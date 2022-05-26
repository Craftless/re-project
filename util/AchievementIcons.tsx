import { Ionicons } from "@expo/vector-icons";

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
      comp: <Ionicons name="battery-charging-outline" size={params.size / 2} />,
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
