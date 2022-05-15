import { useRef } from "react";
import { auth, projectDatabase } from "../firebase/config";
import { LeaderboardItem } from "../types/leaderboard";
import { Alert } from "react-native";

export function writeStepsData(steps: number) {
  if (!auth.currentUser) return;

  projectDatabase.ref("leaderboard/" + auth.currentUser.uid).set({
    steps,
  });
}

export function writeUserData({
  displayName,
  pfpUrl,
}: {
  displayName: string;
  pfpUrl: string;
}) {
  if (!auth.currentUser) return;
  projectDatabase.ref("userInfo/" + auth.currentUser.uid).set({
    displayName,
    pfpUrl,
  });
}

export async function getCurrentLeaderboardData() {
  const stepsRef = projectDatabase
    .ref("leaderboard")
    .orderByChild("steps")
    .limitToFirst(5);
  const gotten = await stepsRef.ref.get();
  console.log(`.get() of reordered ref: ${gotten}`);
  return gotten;
}

export async function fetchDisplayNameAndPhotoURLFromUid(uid: string) {
  const userRef = projectDatabase.ref("userInfo").orderByKey().equalTo(uid);
  const val = await (await userRef.get()).val();
  console.log(`The value is`, val);
  if (Object.keys(val).length > 1) {
    Alert.alert("Something went wrong! lb fetchDisplayNameAndPhotoURLFromUid");
    return null;
  }
  let displayName, pfpUrl;
  for (const key in val) {
    displayName = val[key].displayName;
    pfpUrl = val[key].pfpUrl;
  }
  return {
    displayName,
    pfpUrl,
  };
}
