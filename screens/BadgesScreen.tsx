import React from "react";
import BadgeDisplay from "../components/badges/BadgeDisplay";
import AppText from "../components/ui/AppText";
import { useAppSelector } from "../hooks/redux-hooks";

function BadgesScreen() {
  const achievementIds = useAppSelector(
    (state) => state.achievements.achievementsCompletedId
  );
  return (
    <>
      {achievementIds.map((item) => {
        return (
          <React.Fragment key={item + Math.random().toFixed(4).toString()}>
            <BadgeDisplay item={item} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default BadgesScreen;
