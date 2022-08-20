import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from "react-native";

export type IconFuncParams = {
  size: number;
};

export type IconFunc = (params: IconFuncParams) => {
  comp: React.ReactNode;
  colour?: string;
};

export const achievementIcons: {
  [key: string]: IconFunc;
} = {
  test: (params: IconFuncParams) => {
    return {
      comp: <Ionicons name="add" size={params.size / 2} />,
    };
  },
  use_app: (params: IconFuncParams) => {
    return {
      comp: <FontAwesome5 name="app-store-ios" size={params.size * 3 / 4} />,
      colour: "#A2B800",
    };
  },
  lifetime_10000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_10000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_15000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_15000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_20000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_20000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_30000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_30000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_40000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_40000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_50000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_50000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_75000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_75000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_100000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_100000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_125000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_125000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_150000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_150000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_175000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_175000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_200000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_200000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_250000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_250000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_300000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_300000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_350000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_350000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_400000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_400000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_450000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_450000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_500000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_500000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_550000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_550000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_600000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_600000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_700000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_700000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_800000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_800000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_900000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_900000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
    };
  },
  lifetime_1000000_steps: (params: IconFuncParams) => {
    return {
      comp: (
        <Image
          source={require("../assets/badges/images/LifetimeTotalSteps/lifetime_1000000_steps.png")}
          style={{
            width: params.size,
            height: params.size,
            resizeMode: "contain",
          }}
        />
      ),
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
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel2.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel3.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
          //
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel4.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel5.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel6.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel7.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel8.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel9.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel10.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel11.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel12.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel13.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel14.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/5000StepsLevelable/5000stepslevel15.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
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
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel2.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel3.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel4.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel5.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel6.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel7.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel8.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel9.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel10.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel11.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel12.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel13.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel14.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
        };
      },
      (params: IconFuncParams) => {
        return {
          comp: (
            <Image
              source={require("../assets/badges/images/10000StepsLevelable/10000stepslevel15.png")}
              style={{
                width: params.size,
                height: params.size,
                resizeMode: "contain",
              }}
            />
          ),
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
              width: params.size,
              height: params.size,
              resizeMode: "contain",
            }}
          />
        ),
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
              width: params.size,
              height: params.size,
              resizeMode: "contain",
            }}
          />
        ),
      };
    };
  },
};
