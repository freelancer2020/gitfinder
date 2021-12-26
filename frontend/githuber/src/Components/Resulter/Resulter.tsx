import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { githubReposAction } from "../../store/githubUserRepos";
import { reposStateAction } from "../../store/ReposState";
import { networkAction } from "../../store/network";
import { RootState, AppDispatch } from "../../store/store";
import { ArrowRightAlt } from "@mui/icons-material";

import { Paper, Avatar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface ResulterProps {
  bio: string | null;
  login: string | null;
  email: string | null;
  location: string | null;
  avatar: string;
}

const ResulterContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const BoxRow = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  boxSizing: "border-box",
  paddingTop: "5px",
  paddingBottom: "5px",
  display: "flex",
  marginTop: "5px",
  marginBottom: "5px",
}));

const RowContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Btn = styled(Button)(({ theme }) => ({
  width: "150px",
  fontWeight: "bold",
  textTransform: "capitalize",
}));

const ResulterTypo = styled(Typography)(({ theme }) => ({
  color: "#2b2b2b",
}));

const Arrow = styled(ArrowRightAlt)(({ theme }) => ({
  color: "inherit",
}));

const ResulterRows: React.FC<ResulterProps> = (props) => {
  const [erro, setError] = useState<boolean>(false);
  const userProfile = useSelector<RootState>(
    (state) => state.githubProfile.html_url
  );

  const dispatch = useDispatch<AppDispatch>();

  const userRepos = useSelector<RootState, RequestInfo>(
    (state) => state.githubProfile.repos_url
  );

  const openGitHubProfile = () => {
    window.open(`${userProfile}`, "_blank");
  };

  const getRepo = () => {
    dispatch(networkAction.fetchStart());
    window
      .fetch(userRepos)
      .then((response) => {
        if (response.status !== 200) throw new Error("something went wrong");
        dispatch(reposStateAction.activeRepos()); // active repos
        return response.json();
      })
      .then((data: []) => {
        if (data.length <= 0) return dispatch(networkAction.noRepos());
        dispatch(networkAction.yesRepos()); // there is repos to render
        let arr: any[] = [];

        data.map((item) =>
          arr.push({
            ready: true,
            name: item["name"],
            description: item["description"],
            visibility: item["visibility"],
            html_url: item["html_url"],
          })
        );

        dispatch(githubReposAction.getRepos(arr));
        dispatch(networkAction.fetchComplete());
      })
      .catch((err) => setError(true));
  };

  return (
    <RowContainer>
      <BoxRow sx={{ justifyContent: "center" }}>
        <ResulterTypo variant="body1">{props.bio}</ResulterTypo>
      </BoxRow>

      <BoxRow sx={{ justifyContent: "space-between" }}>
        <ResulterTypo variant="body1">{props.login}</ResulterTypo>
        <ResulterTypo variant="body1">{props.email}</ResulterTypo>
      </BoxRow>

      <BoxRow>
        <ResulterTypo variant="body1">{props.location}</ResulterTypo>
      </BoxRow>

      <BoxRow sx={{ justifyContent: "space-between" }}>
        <Btn
          variant="outlined"
          children="Profile"
          onClick={openGitHubProfile}
          endIcon={<Arrow />}
        />
        <Btn variant="outlined" onClick={getRepo}>
          Repos
        </Btn>
      </BoxRow>
    </RowContainer>
  );
};

const Resulter: React.FC<ResulterProps> = (props) => {
  return (
    <ResulterContainer>
      <Avatar
        alt="github user"
        sx={{ width: 56, height: 56 }}
        src={props.avatar}
      />
      <ResulterRows
        bio={props.bio}
        login={props.login}
        email={props.email}
        location={props.location}
        avatar={props.avatar}
      />
    </ResulterContainer>
  );
};

export default Resulter;
