import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const TypoBox = styled(Box)(({ theme }) => ({
  width: "50vw",
  boxSizing: "border-box",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "50px",
  [theme.breakpoints.down("lg")]: {
    width: "50vw",
  },
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
}));

const Typo = styled(Typography)(({ theme }) => ({
  color: "#1976d2",
  fontFamily: "Audiowide",
  fontSize: "40px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
  zIndex: 10,
  userSelect: "none",
}));

const Banner: React.FC = () => {
  return (
    <TypoBox>
      <Typo variant="h4" children="Easily Find GitHub Users" />
      <Typo variant="h4" children="And Discover Interesting Repositories" />
    </TypoBox>
  );
};

export default Banner;
