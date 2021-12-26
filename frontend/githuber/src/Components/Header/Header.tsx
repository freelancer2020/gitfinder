import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

import Logo from "./Logo";
const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  boxSizing: "border-box",
  height: "fit-content",
  padding: "20px",
  display: "flex",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    padding: "10px",
  },
  overflow: "hidden",
}));

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
};

export default Header;
