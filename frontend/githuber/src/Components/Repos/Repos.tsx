import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ArrowRightAlt } from "@mui/icons-material";

//Skeletons
import SkeletonRepo from "../Skeletons/SkeletonRepo";

import { ReposData } from "../../store/githubUserRepos";

const ReposContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
}));

const RepoRow = styled(Box)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
}));

const RepoTypo = styled(Typography)(({ theme }) => ({
  color: "#2b2b2b",
  userSelect: "none",
}));

const Repos: React.FC<ReposData> = (props) => {
  const fetchDone = useSelector<RootState, boolean>(
    (state) => state.networkState.loaded
  );

  return fetchDone ? (
    <ReposContainer>
      <RepoRow sx={{ justifyContent: "space-between" }}>
        <RepoTypo variant="body1" sx={{ fontWeight: "bold" }}>
          {props.name}
        </RepoTypo>
        <RepoTypo
          sx={{ color: props.visibility === "public" ? "seagreen" : "brown" }}
        >
          {props.visibility}
        </RepoTypo>
      </RepoRow>
      <RepoRow>
        <RepoTypo variant="body1">{props.description}</RepoTypo>
      </RepoRow>
      <RepoRow sx={{ flexDirection: "row-reverse" }}>
        <ArrowRightAlt
          onClick={props.click}
          sx={{
            cursor: "pointer",
            color: props.visibility === "public" ? "seagreen" : "brown",
          }}
        />
      </RepoRow>
    </ReposContainer>
  ) : (
    <SkeletonRepo />
  );
};

export default Repos;
