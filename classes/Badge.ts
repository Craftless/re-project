import React from "react";

export interface Badge {
  name: string;
  description: string;
  icon: {
    type: BadgeIconType;
  };
  getBadgeIcon: React.FC;
}

type BadgeIconType = "svg" | "image";