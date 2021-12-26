import { createSlice } from "@reduxjs/toolkit";

export type Obj = {
  bio: string;
  login: string;
  name?: string;
  email: string;
  avatar_url: string;
  html_url: string;
  location: string;
  repos_url: string;
};

export type GitHubUserData = {
  avilable: boolean;
  bio: string | null;
  login: string;
  name?: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string | null;
  location: string | null;
  repos_url: RequestInfo;
};

const githubUserData: GitHubUserData = {
  avilable: false,
  bio: "",
  login: "",
  email: "",
  name: "",
  avatar_url: "",
  html_url: "",
  location: "",
  repos_url: "",
};

export const githubUser = createSlice({
  name: "github profile",
  initialState: githubUserData,
  reducers: {
    storeUserProfile(state, action) {
      state.avilable = action.payload.avilable;
      state.login = action.payload.login;
      state.avilable = action.payload.avilable;
      state.bio = action.payload.bio;
      state.avatar_url = action.payload.avatar_url;
      state.location = action.payload.location;
      state.html_url = action.payload.html_url;
      state.repos_url = action.payload.repos_url;
    },
    confirmUserData(state) {
      state.avilable = true;
    },
    deconfirmUserData(state) {
      state.avilable = false;
    },
  },
});

export const githubAction = githubUser.actions;
