import { createSlice } from "@reduxjs/toolkit";

export interface ReposData {
  ready?: boolean;
  name: string;
  description: string;
  visibility: string;
  html_url?: string;
  click?: () => void;
}

interface ReposArray {
  data: ReposData[];
}

const reposArray: ReposArray = {
  data: [],
};

export const githubRepos = createSlice({
  name: "Github User Repos",
  initialState: reposArray,
  reducers: {
    getRepos(state, action) {
      state.data = action.payload;
    },
  },
});

export const githubReposAction = githubRepos.actions;
