import { Fragment } from "react";
import { View } from "react-native";
import { AchievementHelper } from "../../classes/AchievementHelper";
import { achievements } from "../../util/AchievementDatas";
import CardWithTitleAndContent from "../ui/CardWithTitleAndContent";
import CircularBadgeDisplay from "../ui/CircularBadgeDisplay";


function BadgesPreview({ onPress, achievementIds}: { onPress: () => void, achievementIds: string[] }) {
  return (
    <CardWithTitleAndContent
      title="My Badges"
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {achievementIds.map((item) => {
            return (
              <Fragment key={item + Math.random().toFixed(4).toString()}>
                <CircularBadgeDisplay
                  badgeIcon={AchievementHelper.getIconFromData(
                    achievements[item]
                  )}
                  size={60}
                />
              </Fragment>
            );
          })}
        </View>
      </View>
    </CardWithTitleAndContent>
  );
}

export default BadgesPreview;
