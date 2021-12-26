import { createSlice } from "@reduxjs/toolkit";

type ReposState = {
  reposActive: boolean;
};

const initState: ReposState = {
  reposActive: false,
};

export const reposState = createSlice({
  name: "repos state",
  initialState: initState,
  reducers: {
    activeRepos(state) {
      state.reposActive = true;
    },
    deactiveRepos(state) {
      state.reposActive = false;
    },
  },
});

export const reposStateAction = reposState.actions;
