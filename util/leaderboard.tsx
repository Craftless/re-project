import { auth, projectDatabase } from "../firebase/config";
import { Alert } from "react-native";

export async function writeStepsData(steps: number) {
  if (!auth.currentUser) return;

  await projectDatabase.ref("leaderboard/" + auth.currentUser.uid).set({
    steps,
  });
  console.log(steps);
}

export function writeUserData(data: { displayName: string; pfpUrl: string }) {
  if (!auth.currentUser) return;
  projectDatabase.ref("userInfo/" + auth.currentUser.uid).set(data);
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
