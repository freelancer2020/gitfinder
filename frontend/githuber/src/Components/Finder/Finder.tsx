import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { githubAction, GitHubUserData } from "../../store/giUserProfile";
import { reposStateAction } from "../../store/ReposState";
import { githubReposAction } from "../../store/githubUserRepos";
import { AppDispatch } from "../../store/store";

import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

import network from "../../assets/network.gif";

const FinderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  minHeight: "0px",
  [theme.breakpoints.up("sm")]: {
    minHeghit: "350px",
  },
  display: "flex",
  flexDirection: "column",
}));

const FinderFormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "space-between",
  boxSizing: "border-box",
  paddingTop: "5px",
  paddingBottom: "5px",
}));

const FinderNetworkState = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  paddingTop: "5px",
  paddingBottom: "5px",
}));

const FinderAlert = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  boxSizing: "border-box",
  paddingTop: "5px",
  paddingBottom: "5px",
}));

const Finder: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [serverError, setSeverError] = useState<boolean>(false);
  const [request, setRequest] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (alert) setAlert(false);
    if (serverError) setSeverError(false);
    let user = e.target.value;
    setUserName(user);
  };

  const findUser = () => {
    if (!userName) {
      setAlert(true);
      return false;
    }
    dispatch(reposStateAction.deactiveRepos());
    dispatch(githubReposAction.getRepos([]));

    setRequest(true);
    window
      .fetch(`https://api.github.com/users/${userName}`)
      .then((response) => {
        if (response.status !== 200) throw new Error("Network Error");
        setSeverError(false);

        return response.json();
      })
      .then((data) => {
        const userData: GitHubUserData = {
          avilable: true,
          bio: data["bio"],
          email: data["email"],
          login: data["login"],
          name: data["name"],
          avatar_url: data["avatar_url"],
          html_url: data["html_url"],
          location: data["location"],
          repos_url: data["repos_url"],
        };

        dispatch(githubAction.storeUserProfile(userData));
        dispatch(githubAction.confirmUserData());
      })
      .finally(() => {
        setRequest(false);
        setUserName("");
      })
      .catch((err) => {
        setSeverError(true);
        dispatch(githubAction.deconfirmUserData());
      });
  };

  return (
    <FinderContainer>
      <FinderFormContainer>
        <FormControl sx={{ width: "80%" }}>
          <InputLabel htmlFor="my-input">GitHub Login Name</InputLabel>
          <Input
            id="my-input"
            required
            value={userName}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button variant="contained" children="Find" onClick={findUser} />
      </FinderFormContainer>
      <FinderNetworkState>
        {request && <img alt="loader" src={network} />}
        {serverError && (
          <Typography variant="body2" children="Unable to get the result" />
        )}
      </FinderNetworkState>
      <FinderAlert>
        {alert && (
          <Typography
            variant="body2"
            children="*Enter Github Login name"
            sx={{ color: "red" }}
          />
        )}
      </FinderAlert>
    </FinderContainer>
  );
};

export default Finder;
