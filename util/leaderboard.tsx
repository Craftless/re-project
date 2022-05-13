import { auth, projectDatabase } from "../firebase/config";
import { LeaderboardItem } from "../types/leaderboard";

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
