import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ReposData } from "./store/githubUserRepos";
import { GitHubUserData } from "./store/giUserProfile";
import { Box, Typography } from "@mui/material";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RootLeaves from "./Components/Header/Leaves";
import Banner from "./Components/Banner/Banner";
import GridSystem from "./Components/Layouts/Grid";

import Finder from "./Components/Finder/Finder";
import Resulter from "./Components/Resulter/Resulter";
import Repos from "./Components/Repos/Repos";

const App: React.FC = () => {
  const githubUserData = useSelector<RootState, GitHubUserData>(
    (state) => state.githubProfile
  );

  const userRepos = useSelector<RootState, ReposData[]>(
    (state) => state.githubUserRepo.data
  );

  const repoState = useSelector<RootState, boolean>(
    (state) => state.repoState.reposActive
  );

  const isRepos = useSelector<RootState, boolean>(
    (state) => state.networkState.repos
  );

  const openRepo = (link: string | undefined) => {
    if (link) window.open(`${link}`, "_blank");
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <RootLeaves />
      <Header />
      <Banner />
      <GridSystem
        finder={<Finder />}
        moreInfo={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              height: "300px",
            }}
          >
            {repoState ? (
              isRepos ? (
                userRepos.map((repo, index) => (
                  <Repos
                    key={index.toString()}
                    name={repo.name}
                    visibility={repo.visibility}
                    description={repo.description}
                    html_url={repo.html_url}
                    click={() => openRepo(repo.html_url)}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    children="The user has no repositories!"
                  />
                </Box>
              )
            ) : null}
          </Box>
        }
      >
        {githubUserData.avilable && (
          <Resulter
            bio={githubUserData.bio ? githubUserData.bio : ""}
            login={githubUserData.login ? githubUserData.login : ""}
            location={githubUserData.location ? githubUserData.location : ""}
            email={githubUserData.email ? githubUserData.email : ""}
            avatar={githubUserData.avatar_url}
          />
        )}
      </GridSystem>
      <Footer />
    </Box>
  );
};

export default App;
