import { auth, projectDatabase } from "../firebase/config";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext, IAuthContext } from "../store/auth-context";

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
  const gotten = await stepsRef.get();
  console.log(`.get() of reordered ref: ${gotten}`);
  return gotten;
}

export async function fetchDisplayNameAndPhotoURLFromUid(
  uid: string,
  authCtx?: IAuthContext
) {
  const userRef = projectDatabase.ref("userInfo").orderByKey().equalTo(uid);
  const val = await (await userRef.get()).val();
  if (!val || Object.keys(val).length > 1) {
    Alert.alert("Something went wrong! lb fetchDisplayNameAndPhotoURLFromUid");
    if (auth.currentUser && authCtx)
      writeUserData({
        displayName: authCtx.getCurrentDisplayNameNN(auth.currentUser),
        pfpUrl: authCtx.getCurrentPfpNN(auth.currentUser),
      });
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
