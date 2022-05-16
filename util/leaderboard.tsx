import { auth, projectDatabase } from "../firebase/config";
import { Alert } from "react-native";
import { getCurrentUserDisplayNameOrEmailNonNullFromUser, getCurrentUserProfilePictureNonNullFromUser, updateUserProfile } from "./auth";

export async function writeStepsData(steps: number) {
  if (!auth.currentUser) return;

  await projectDatabase.ref("leaderboard/" + auth.currentUser.uid).set({
    steps,
  });
  console.log(steps);
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
) {
  const userRef = projectDatabase.ref("userInfo").orderByKey().equalTo(uid);
  const val = await (await userRef.get()).val();
  if (!val || Object.keys(val).length > 1) {
    Alert.alert("Something went wrong! lb fetchDisplayNameAndPhotoURLFromUid");
    if (auth.currentUser)
      updateUserProfile(auth.currentUser, { // Doing this because the user might have recently signed up and their details were not sent to database due to a bug
        displayName: getCurrentUserDisplayNameOrEmailNonNullFromUser(auth.currentUser),
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
