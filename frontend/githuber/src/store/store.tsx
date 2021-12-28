import { configureStore } from "@reduxjs/toolkit";
import { githubUser } from "./giUserProfile";
import { githubRepos } from "./githubUserRepos";
import { reposState } from "./ReposState";
import { network } from "./network";
import { contact } from "./contactState";

const store = configureStore({
  reducer: {
    githubProfile: githubUser.reducer,
    githubUserRepo: githubRepos.reducer,
    repoState: reposState.reducer,
    networkState: network.reducer,
    contactState: contact.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
