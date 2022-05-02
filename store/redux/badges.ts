import { createSlice } from "@reduxjs/toolkit";

const badgesSlice = createSlice({
  name: "badges",
  initialState: {
    badgeIds: [] as string[],
  },
  reducers: {
    addBadge: (state, action) => {
      state.badgeIds.push(action.payload.data);
      // database logic
    },
    removeBadge: (state, action) => {
      const index = state.badgeIds.indexOf(action.payload.data);
      state.badgeIds.splice(index, 1);
      // database logic
    }
  },
});
