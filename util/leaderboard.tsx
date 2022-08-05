import { auth, projectDatabase } from "../firebase/config";
import { Alert } from "react-native";
import {
  getCurrentUserDisplayNameOrEmailNonNullFromUser,
  getCurrentUserProfilePictureNonNullFromUser,
  updateUserProfile,
} from "./auth";

export async function writeStepsData(
  steps: number,
  fromMidnight: boolean = false
) {
  if (!auth.currentUser) return;

  if (fromMidnight) {
    await projectDatabase.ref("leaderboard/" + auth.currentUser.uid).update({
      stepsFromMidnight: steps,
    });
  } else {
    await projectDatabase.ref("leaderboard/" + auth.currentUser.uid).update({
      steps,
    });
  }
}

export async function writeTotalSteps(
  totalSteps: { date: string; steps: number }[]
) {
  if (!auth.currentUser) return;
  else {
    for (const totalStep of totalSteps) {
      await projectDatabase
        .ref(`userData/${auth.currentUser.uid}/totalSteps/${totalStep.date}`)
        .update({
          steps: totalStep.steps,
        });
    }
  }
}

export async function getCurrentLeaderboardData() {
  const stepsRef = projectDatabase
    .ref("leaderboard")
    .orderByChild("steps")
    .limitToLast(7);
  const gotten = await stepsRef.get();
  console.log(`.get() of reordered ref: ${gotten}`);
  return gotten;
}

export async function fetchDisplayNameAndPhotoURLFromUid(uid: string) {
  const userRef = projectDatabase.ref("userInfo").orderByKey().equalTo(uid);
  const val = await (await userRef.get()).val();
  if (!val || Object.keys(val).length > 1) {
    Alert.alert("Something went wrong! lb fetchDisplayNameAndPhotoURLFromUid");
    if (auth.currentUser)
      updateUserProfile(auth.currentUser, {
        // Doing this because the user might have recently signed up and their details were not sent to database due to a bug
        displayName: getCurrentUserDisplayNameOrEmailNonNullFromUser(
          auth.currentUser
        ),
        photoURL: getCurrentUserProfilePictureNonNullFromUser(auth.currentUser),
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
