export type LeaderboardItem = {
  rank: number,
  displayName: string,
  pfpUrl: string | null,
  steps: number,
  userId: string;
}

export type UserSteps = {
  uid: string,
  steps: number,
}