import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { contactAction } from "./store/contactState";
import { ReposData } from "./store/githubUserRepos";
import { GitHubUserData } from "./store/giUserProfile";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import RootLeaves from "./Components/Header/Leaves";
import Banner from "./Components/Banner/Banner";
import GridSystem from "./Components/Layouts/Grid";

import Finder from "./Components/Finder/Finder";
import Resulter from "./Components/Resulter/Resulter";
import Repos from "./Components/Repos/Repos";
import ContactRoot from "./Components/Contact/Contact";

const AppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
}));
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

  const contactState = useSelector<RootState, boolean>(
    (state) => state.contactState.toggle
  );

  const dispatch = useDispatch<AppDispatch>();

  const closeContact = useCallback(() => {
    dispatch(contactAction.toggleState("0"));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", closeContact);
  }, [closeContact]);

  return (
    <AppContainer sx={{ overflowX: "hidden" }} onClick={closeContact}>
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

      {contactState && <ContactRoot />}
    </AppContainer>
  );
};

export default App;
