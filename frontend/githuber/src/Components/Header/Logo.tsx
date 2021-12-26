import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import LogoIcon from "../../assets/logo.png";

const LogoContainer = styled(Box)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  zIndex: 2,
  background: "transparent",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
  },
  [theme.breakpoints.up("md")]: {
    width: "fit-content",
    height: "fit-content",
  },
}));

const Logo: React.FC = () => {
  const preventSave = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const preventDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <LogoContainer onContextMenu={preventSave}>
      <img
        onDragStart={preventDrag}
        alt="githuber logo"
        src={LogoIcon}
        style={{ width: "250px", height: "200px", borderRadius: "10px" }}
      />
    </LogoContainer>
  );
};

export default Logo;
