export type LeaderboardItem = {
  rank: number,
  displayName: string,
  pfpUrl: string | null,
  steps: number,
}

export type UserSteps = {
  uid: string,
  steps: number,
}