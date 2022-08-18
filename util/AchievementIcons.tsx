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
  lifetime_10000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_10000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
  lifetime_15000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_15000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
  lifetime_20000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_20000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
  lifetime_30000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_30000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
  lifetime_40000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_40000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
  lifetime_50000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/lifetime_50000_steps.png")}
          style={{
            width: (params.size / 2) * 2.1,
            height: (params.size / 2) * 2.1,
          }}
        />
      ),
      colour: "#A2B800",
    };
  },
};

export const levelableAchievementIcons: {
  [key: string]: (level?: number) => IconFunc;
} = {
  levelable_5000_steps_daily: (level?: number) => {
    const arr = [
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel1.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel2.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel3.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel4.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel5.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel6.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel7.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel8.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel9.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel10.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel11.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel12.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel13.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel14.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel15.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
    ];
    return level ? arr[level] ?? arr[0] : arr[0];
  },
  levelable_10000_steps_daily: (level?: number) => {
    const arr = [
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel1.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel2.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel3.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel4.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel5.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel6.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel7.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel8.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel9.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel10.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel11.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel12.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel13.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel14.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel15.png")}
              style={{
                width: (params.size / 2) * 3.5,
                height: (params.size / 2) * 3.5,
              }}
            />
          ),
          colour: "#193797",
        };
      },
    ];
    return level ? arr[level] ?? arr[0] : arr[0];
  },
  levelable_15000_steps_daily: (level?: number) => {
    return (params: IconFuncParams) => {
      return {
        comp: (
          <Image
            source={require("../assets/badges/images/15000stepssingle.png")}
            style={{
              width: (params.size / 2) * 3.5,
              height: (params.size / 2) * 3.5,
            }}
          />
        ),
        colour: "#193797",
      };
    };
  },
  levelable_20000_steps_daily: (level?: number) => {
    return (params: IconFuncParams) => {
      return {
        comp: (
          <Image
            source={require("../assets/badges/images/20000stepssingle.png")}
            style={{
              width: (params.size / 2) * 3.5,
              height: (params.size / 2) * 3.5,
            }}
          />
        ),
        colour: "#193797",
      };
    };
  },
};
